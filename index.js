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
function addEmployee(queryParams){
db.query(('INSERT INTO employee ?,?,?,?', queryParams), (err, results) => {
    console.table(results);
});
}
// create a department
// create a role
// create an employee
// change an employee role

module.exports;