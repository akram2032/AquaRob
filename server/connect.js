const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "mysql-akram203.alwaysdata.net",
    user: "akram203",
    password: "akram2001",
    database: "akram203_pfe",
});

connection.connect((err) => {
    if (err) console.log(err);
});

module.exports = connection;
