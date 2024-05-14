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

  // Function to print author names and their mentors
  const printAuthorMentorNames = () => {
    const sql = `
      SELECT a.author_name, m.author_name AS mentor_name
      FROM authors a
      LEFT JOIN authors m ON a.mentor = m.author_id;
    `;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Author names and their mentors:");
      console.log(result);

      // Print all columns of authors and their published paper_titles
      printAuthorPapers();
    });
  };

  // Function to print all columns of authors and their published paper_titles
  const printAuthorPapers = () => {
    const sql = `
      SELECT a.*, rp.paper_title
      FROM authors a
      LEFT JOIN author_paper ap ON a.author_id = ap.author_id
      LEFT JOIN research_papers rp ON ap.paper_id = rp.paper_id;
    `;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Authors and their published paper titles:");
      console.log(result);

      // Close the connection
      connection.end();
    });
  };

  // Call the initial function to start the process
  printAuthorMentorNames();
});
