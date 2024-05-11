const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "company",
});
connection.connect((err) => {
  if (err) {
    console.log("Error connecting to Db", err);
    return;
  }
  console.log("Connection established");
});
