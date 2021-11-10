const { response } = require("express");
const inquirer = require("inquirer");
const db = require("./index");
require("console.table");


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
            viewDepartments();
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

function viewDepartments() {
    db.viewAllDepartments()
    .then(results => {
        console.table(results)
    })
};
// ask inquirer questions
//db.addEmployees(inquirerAnswers)

// object destructuring
// name { key1: "value", key2: "different"}
// before destructuring
// console.log(name.key1)
// destructured:
// const { key1, key2 } = name
// console.log(key1)