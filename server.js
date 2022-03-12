const inquirer = require('inquirer');
const mysql = require('mysql2');
//const table = require('console.table'); // to print mySQL rows to console  

require('dotenv').config();

// calls on the variables set up for the questions 
const { question, addEmployee, addRole, addDepartment } = require('./utils/questions');

//connection to mysql
const connection = mysql.createConnection(
    {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'bubbaroot',
        database: 'company_db'
    }
)

connection.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('You are connected to MySQL');
});

module.exports = connection;