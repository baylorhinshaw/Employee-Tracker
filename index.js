const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const fs = require('fs');

// makes connection to the database: teams_db
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'teams_db'
    },
    console.log(`Connected to the teams_db database.`)
  );

// view departments
const viewAllDepartments = () => {
    db.query('SELECT * FROM department', (err, results) => {
        console.table(results);
    });
    startPrompt();
};


// view all roles
const viewAllRoles = () => {
    db.query('SELECT * FROM roles', (err, results) => {
        console.table(results);
    });
    startPrompt();
};


// view all employees
const viewAllEmployees = () => {
    db.query('SELECT * FROM employee', (err, results) => {
        console.table(results);
    }); 
    startPrompt();
};

// question for department 
const departmentQuestion = [{
    type: 'input',
    message: 'What department would you like to add?',
    name: 'departmentAnswer'
}];

// will ask question and then take the answer and add to departments then show you the new table
const addDepartmentQuestion = () => {
    inquirer.prompt(departmentQuestion)
    .then((response) => {
        db.query(`INSERT INTO department (department_name) VALUES ('${response.departmentAnswer}')`, (err, results) => {
            console.log(`You have added ${response.departmentAnswer} into Departments!`);
            viewAllDepartments();
        });
        startPrompt();
    });
};


// adding a new role
// will probably need to use .map to make a new array
const addRolesQuestion = () => {
    db.query('SELECT * FROM department', (err, results) => {
        let allDepartments = results.map(department => {
            return {value: department.id, name: department.department_name}
        });
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of this new role?',
            name: 'roleName'
        }, {
            type: 'input',
            message: 'What is the salary of the new role?',
            name: 'roleSalary'
        }, {
            type: 'list',
            message: 'Which department does this role belong to?',
            name: 'roleID',
            choices: allDepartments
        }])
        .then(({roleName, roleSalary, roleID}) => {
            db.query('INSERT INTO roles (title, salary, department_id) VALUES(?, ?, ?);', [roleName, roleSalary, roleID], (err, results) => {
            viewAllRoles();
            });
        });
    }); 
};

// add employee prob will need to map also
const addEmployeeQuestion = () => {
    db.query('SELECT * FROM roles', (err, results) => {
        let allRoles = results.map(roles => {
            return {value: roles.id, name: roles.title}
        });
    db.query('SELECT * FROM employee', (err, results) => {
        let allEmployees = results.map(employee => {
            return {value: employee.id, name: employee.first_name}
        });
        inquirer.prompt([{
            type: 'input',
            message: 'What is the employees name?',
            name: 'firstName'
        }, {
            type: 'input',
            message: 'What is the employees last name?',
            name: 'lastName'
        }, {
            type: 'list',
            message: 'What role is the employee under?',
            name: 'employeesRole',
            choices: allRoles
        }, {
            type: 'list',
            message: 'What manager is the employee under?',
            name: 'employeesManager',
            choices: allEmployees
        }])
        .then(({firstName, lastName, employeesRole, employeesManager}) => {
            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?);', [firstName, lastName, employeesRole, employeesManager], (err, results) => {
            viewAllEmployees();
            });
        });
    });
});
};

const updateEmployeeRole = () => {
    db.query(`SELECT * FROM roles`, (err, results) => {
        let allRoles = results.map(roles => {
          return  {value: roles.id, name: roles.title}
        });
    db.query('SELECT * FROM employee', (err, results) => {
        let allEmployees = results.map(employee => {
            return {value: employee.id, name: employee.first_name}
        });
      inquirer.prompt([{
        type: 'list',
        message: "What is the first name of the employee you would like to update?",
        name: 'updateEmployee',
        choices: allEmployees
      },
      {
        type: 'list',
        message: "What is the employees new role?",
        name: 'newRole',
        choices: allRoles
      }])
      .then(({updateEmployee, newRole}) => {
          db.query(`UPDATE employee SET role_id = ? WHERE first_name = ?`, [updateEmployee, newRole], (err, results) => {
            viewAllEmployees();
        });
        });
    });
});
};

const doneWithPrompts = () => {
    console.log('You are all done!')
    process.exit();
}

const choices = {
    'View all departments': viewAllDepartments,
    'View all roles': viewAllRoles, 
    'View all employees': viewAllEmployees, 
    'Add a department': addDepartmentQuestion, 
    'Add a role': addRolesQuestion, 
    'Add an employee': addEmployeeQuestion, 
    'Update an employee role': updateEmployeeRole, 
    'Done': doneWithPrompts,
};

// Object.key turns it into an array bc .prompt choices to be an array
const questions = [{
    type: 'list',
    message: 'What would you like to do?',
    name: 'startQuestion',
    choices: Object.keys(choices),
}]

const startPrompt = () => {
    inquirer.prompt(questions)
    .then((response) => {
        const { startQuestion } = response
        let fn = choices[startQuestion];
        fn();
    });
};

startPrompt();