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

  // Function to create the research_papers table
  const createResearchPapersTable = () => {
    const sql = `
      CREATE TABLE research_papers (
        paper_id INT PRIMARY KEY,
        paper_title VARCHAR(255),
        conference VARCHAR(255),
        publish_date DATE
      );
    `;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log("research_papers table created.");

      // Create the author_paper table
      createAuthorPaperTable();
    });
  };

  // Function to create the author_paper table
  const createAuthorPaperTable = () => {
    const sql = `
      CREATE TABLE author_paper (
        author_id INT,
        paper_id INT,
        PRIMARY KEY (author_id, paper_id),
        FOREIGN KEY (author_id) REFERENCES authors(author_id),
        FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
      );
    `;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log("author_paper table created.");

      // Close the connection
      connection.end();
    });
  };

  createResearchPapersTable();
});
