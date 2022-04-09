// for reference : const { question, addEmployee, addRole, addDepartment } = require('./utils/questions');


// Question : What would you like to do? *scroll 

// -Add department = What is the name of the department? "Added Service to database"
// -Add role = What is the name of the role? What is the salary of the role? which department does the role belong to? "Added Customer Service to the database"
// -Add employee = What is the employees first name? What is the employees last name? what is the employees role?*scroll Who is the employees manager? "Added Sam Kash to the database"
// -Update employee role = Which employee's role do you want to update?*scroll Which role do you want to assign the selected employee?*scroll "Updated employee's role"
// View all departments 
// View all roles
// View all employees 

const inquirer = require('inquirer');
const mysql = require('mysql2');
// require('console.table');
const db = require('../server')

const question = [
    {
        name: 'question',
        type: 'list',
        message: `What would you like to do?`,
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        default: 'View all departments'
    }
];

const addEmployee = [
    {
        name: 'firstName',
        type: 'input',
        message: `What is the employee's first name?`
    },
    {
        name: 'lastName',
        type: 'input',
        message: `What is the employee's last name?`
    },
    {
        name: 'role',
        type: 'input',
        message: `What is the ID of the employee's role?`,
        //choices: ['Tech', 'Manager', 'CEO', 'Secretary', 'Intern'], // still need to be able to add roles 
    },
    // {
    //     name: 'manager',
    //     type: 'list',
    //     message: `Who is the employee's manager?`,
    //     choices: "what to put here?" // <<<<<<<<<<<<< how do i give it choices?
    // },
];

const addRole = [
    {
        name: 'roleName',
        type: 'input',
        message: `What is the name of the role?`
    },
    {
        name: 'salary',
        type: 'input',
        message: `What is the salary of the role?`
    },
    {
        name: 'department',
        type: 'input',
        message: `Which department does the role belong to?`,
        //choices: "what to put here?" // <<<<<<<<<<<<< how do i give it choices?
    }
];

const addDepartment = [
    {
        name: 'depName',
        type: 'input',
        message: `What is the name of the department?`
    }
];

function viewDepartments() {
    db.query('select * from departments', 
        function(error, results, fields) {
            if (error) throw error;
            console.table(results);
          })
};

function viewRoles() {
    db.query('select * from roles', 
        function(error, results, fields) {
            if (error) throw error;
            console.table(results);
          })
};

function start(){
    inquirer.prompt(question).then(answer => {
    if (answer.question == 'View all departments') {
        db.query('select * from departments', 
        function(error, results, fields) {
            if (error) throw error;
            console.table(results);
            start()
          })
    }
    if (answer.question == 'View all roles') {
        db.query('select * from roles', 
        function(error, results, fields) {
            if (error) throw error;
            console.table(results);
            start()
          })
    }
    if (answer.question == 'View all employees') {
        db.query('select * from employees', 
        function(error, results, fields) {
            if (error) throw error;
            console.table(results);
            start()
          })
    }
    if (answer.question == 'Add a department') {
        inquirer.prompt(addDepartment).then(depData => {
        db.query(`INSERT INTO departments (department_name) VALUES ('${depData.depName}');`,
        function(error, results, fields) {
            if (error) throw error;
            console.table(results);
            start()
          })
        })
    }

    if (answer.question == 'Add a role') {
        //console.table(department)
        viewDepartments();
        inquirer.prompt(addRole).then(roleData => {
        db.query(`INSERT INTO roles (department_id, title, salary) VALUES (${roleData.department}, '${roleData.roleName}', ${roleData.salary});`,
        function(error, results, fields) {
            if (error) throw error;
            console.table(results);
            start()
          })
        })
    }
    if (answer.question == 'Add an employee') {
        viewRoles();
        inquirer.prompt(addEmployee).then(employeeData => {
        db.query(`INSERT INTO employees (first_name, last_name, role_id) VALUES ('${employeeData.firstName}', '${employeeData.lastName}', ${employeeData.role});`,
        function(error, results, fields) {
            if (error) throw error;
            console.table(results);
            start()
          })
        })
    }
});
}
start()


module.exports = {question, addEmployee, addRole, addDepartment};
