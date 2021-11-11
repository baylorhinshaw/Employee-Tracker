const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'teams_db'
    },
    console.log(`Connected to the teams_db database.`)
  );

const questions = [{
    type: 'list',
    message: 'What would you like to do?',
    name: 'startQuestion',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Done']
}]

const startQuestion = () => {
    inquirer.prompt(questions)
    .then((response) => {
        const { startQuestion } = response
        if (startQuestion === 'View all departments') {
            viewAllDepartments();
        } else if (startQuestion === 'View all roles') {

        } else if (startQuestion === 'View all employees') {
            
        } else if (startQuestion === 'Add a department'){

        } else if (startQuestion === 'Add a role') {

        } else if (startQuestion === 'Add an employee') {

        } else if (startQuestion === 'Update an employee role') {

        } else {
            console.log('You are all done.')
        }
    });
};

startQuestion();

// view departments
const viewAllDepartments = () => {
    db.query('SELECT * FROM department', (err, results) => {
        return results;
    });
};


// view all roles
db.query('SELECT * FROM roles', (err, results) => {
    console.table(results);
});


// view all employees
db.query('SELECT * FROM employee', (err, results) => {
    console.table(results);
});

// create department
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