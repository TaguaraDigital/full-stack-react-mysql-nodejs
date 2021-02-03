const mysql = require('mysql');

const dbConnection =mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'yelp-clone'
});

// const dbConnection = mysql.createConnection({
//     connectionLimit: 5,
//     host     : 'bt4orajuqoqm4mt31fwg-mysql.services.clever-cloud.com',
//     user     : 'ucqdavhjg5n8lsus',
//     password : 'XdIbCZi74dba3axUizSr',
//     database : 'bt4orajuqoqm4mt31fwg'
// });

module.exports = dbConnection;