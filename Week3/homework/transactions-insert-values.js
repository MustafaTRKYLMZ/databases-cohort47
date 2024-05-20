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

  const insertAccountQuery = `INSERT INTO account(account_number, balance) VALUES(101, 1000.00), (102, 900.00)`;

  connection.query(insertAccountQuery, (err, result) => {
    if (err) throw err;
    console.log("Account inserted");

    const insertChangesQuery = `INSERT INTO account_changes(account_number, amount, remark) VALUES(101, 1000.00, 'Initial Deposit'),(102, 900.00, 'Second Deposit')`;
    connection.query(insertChangesQuery, (err, result) => {
      if (err) throw err;
      console.log("Account Changes inserted");
      connection.end((err) => {
        console.log("Connection closed");
      });
    });
  });
});
