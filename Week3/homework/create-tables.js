const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "dinner",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");

  //create account table
  const createTableQuery = `CREATE TABLE IF NOT EXISTS account(account_number INT PRIMARY KEY, balance DECIMAL(10,2))`;

  connection.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Account table created");
    const createChangesTableQuery = `
CREATE TABLE IF NOT EXISTS account_changes(change_number INT AUTO_INCREMENT PRIMARY KEY,
        account_number INT,
        amount DECIMAL(10, 2),
        changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        remark VARCHAR(255),
        FOREIGN KEY (account_number) REFERENCES account(account_number))`;
    connection.query(createChangesTableQuery, (err, result) => {
      if (err) throw err;
      console.log("Account Changes Table created");

      connection.end((err) => {
        console.log("Connection closed");
      });
    });
  });
});
