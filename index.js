const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const { response } = require("express");

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'baylorhinshaw',
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


const departmentQuestion = [{
    type: 'input',
    message: 'What department would you like to add?',
    name: 'departmentAnswer'
}];

const addDepartmentQuestion = () => {
    inquirer.prompt(departmentQuestion)
    .then((response) => {
        db.query(`INSERT INTO department (department_name) VALUES ('${response.departmentAnswer}')`, (err, results) => {
            console.log(`You have added ${response.departmentAnswer} into Departments`);
            viewAllDepartments();
        });
        startPrompt();
    });
};
// maybe can ask one question then take in the 3 inputs
const rolesQuestions = [{
    type: 'input',
    message: 'What is the title of this role?',
    name: 'rolesAnswers'
}, {
    type: 'input',
    message: 'What is the salary of the role?',
    name: 'rolesAnswers'
}, {
    type: 'input',
    message: 'What is the department id of the role?',
    name: 'rolesAnswers'
}];

// need to write for loop to iterate through each rolesQuestion to prompt each one
// then grab each response
const addRolesQuestion = () => {
    inquirer.prompt(rolesQuestions)
    .then((response) => {
        console.log(response);
    })
}

const choices = {
    'View all departments': viewAllDepartments,
    'View all roles': viewAllRoles, 
    'View all employees': viewAllEmployees, 
    'Add a department': addDepartmentQuestion, 
    'Add a role': addRolesQuestion, 
    'Add an employee': null, 
    'Update an employee role': null, 
    'Done':null,
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


// function addEmployee(queryParams){
// db.query(('INSERT INTO employee ?,?,?,?', queryParams), (err, results) => {
//     console.table(results);
// });
// }

// create a role
// create an employee
// change an employee role

// function viewDepartments() {
//     db.viewAllDepartments()
//     .then(results => {
//         console.table(results)
//     })
// };

// ask inquirer questions
//db.addEmployees(inquirerAnswers)

// object destructuring
// name { key1: "value", key2: "different"}
// before destructuring
// console.log(name.key1)
// destructured:
// const { key1, key2 } = name
// console.log(key1)