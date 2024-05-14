const mysql = require("mysql");

// MySQL connection settings
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "University",
});

// Establishing the connection
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");

  // Function to create the authors table
  const createAuthorsTable = () => {
    const sql = `
      CREATE TABLE authors (
        author_id INT PRIMARY KEY,
        author_name VARCHAR(255),
        university VARCHAR(255),
        date_of_birth DATE,
        h_index INT,
        gender VARCHAR(10)
      );
    `;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log("authors table created.");

      // Add the mentor column
      addMentorColumn();
    });
  };

  // Function to add the mentor column
  const addMentorColumn = () => {
    const sql = `
      ALTER TABLE authors
      ADD COLUMN mentor INT,
      ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id);
    `;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log("mentor column added.");

      // Close the connection
      connection.end();
    });
  };

  // Call the initial function to start the process
  createAuthorsTable();
});
