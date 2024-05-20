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

  connection.beginTransaction((err) => {
    if (err) {
      throw err;
    }

    const updateAccount1Query = `
      UPDATE account SET balance = balance - 1000 WHERE account_number = 101;
    `;
    const updateAccount2Query = `
      UPDATE account SET balance = balance + 1000 WHERE account_number = 102;
    `;

    connection.query(updateAccount1Query, (err, result) => {
      if (err) {
        return connection.rollback(() => {
          throw err;
        });
      }

      connection.query(updateAccount2Query, (err, result) => {
        if (err) {
          return connection.rollback(() => {
            throw err;
          });
        }

        const insertChangesQuery = `
          INSERT INTO account_changes (account_number, amount, remark) VALUES
          (101, -1000, 'Transfer to account 102'),
          (102, 1000, 'Transfer from account 101')
        `;

        connection.query(insertChangesQuery, (err, result) => {
          if (err) {
            return connection.rollback(() => {
              throw err;
            });
          }

          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                throw err;
              });
            }
            console.log("Transaction Complete");
            connection.end((err) => {
              if (err) throw err;
              console.log("Connection closed");
            });
          });
        });
      });
    });
  });
});
