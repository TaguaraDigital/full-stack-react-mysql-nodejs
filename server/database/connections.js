const mysql = require('mysql');

// const dbConnection =mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'yelp-clone'
// });

const dbConnection = mysql.createConnection({
    connectionLimit: 5,
    host     : 'bakns7ifg74edsivlnfk-mysql.services.clever-cloud.com',
    user     : 'unetkroczsrrlzge',
    password : 'JQghNoePtINMGiOSKCXu',
    database : 'bakns7ifg74edsivlnfk'
});

module.exports = dbConnection;