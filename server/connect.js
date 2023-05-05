const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "mysql-akram203.alwaysdata.net",
  user: "",
  password: "",
  database: "akram203_pfe",
});

connection.connect((err) => {
  if (err) throw err;
});

module.exports = connection;
