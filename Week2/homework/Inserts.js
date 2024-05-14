const mysql = require("mysql");

// MySQL connection settings
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "University",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");

  // Function to insert data into the authors table
  const insertAuthorsData = () => {
    const authorsData = [
      [1, "John Doe", "University of Washington", "1990-01-01", 10, "Male"],
      [2, "Jane Doe", "University of Washington", "1991-01-01", 11, "Female"],
      [3, "Alice Johnson", "University of California", "199-01-01", 12, "Male"],
      [4, "Bob Johnson", "University of California", "199-01-01", 13, "Female"],
    ];
    const sql = `INSERT INTO authors (author_id, author_name, university, date_of_birth, h_index,gender) values ?`;
    connection.query(sql, [authorsData], (err, result) => {
      if (err) throw err;
      console.log("Data inserted into authors table.");

      // Insert data into the research_papers table
      insertResearchPapersData();
    });
  };

  const insertResearchPapersData = () => {
    const researchPapersData = [
      [1, "Paper 1", "Conference 1", "2021-01-01"],
      [2, "Paper 2", "Conference 2", "2021-01-02"],
      [3, "Paper 3", "Conference 3", "2021-01-03"],
      [4, "Paper 4", "Conference 4", "2021-01-04"],
    ];
    const sql = `INSERT INTO research_papers (paper_id, paper_title, conference, publish_date) values ?`;
    connection.query(sql, [researchPapersData], (err, result) => {
      if (err) throw err;
      console.log("Data inserted into research_papers table.");

      // Insert data into the author_paper table
      insertAuthorPaperData();
    });
  };
  const insertAuthorPaperData = () => {
    const authorPaperData = [
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
    ];
    const sql = `INSERT INTO author_paper (author_id, paper_id) values ?`;
    connection.query(sql, [authorPaperData], (err, result) => {
      if (err) throw err;
      console.log("Data inserted into author_paper table.");

      // Close the connection
      connection.end();
    });
  };
  insertAuthorsData();
});
