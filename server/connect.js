const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "aquarob",
    password: "aquarob",
    database: "bathyrob",
});

connection.connect((err) => {
    if (err) console.log(err);
});

module.exports = connection;
