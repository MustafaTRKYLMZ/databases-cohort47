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

  // Function to execute aggregate queries
  const executeAggregateQueries = () => {
    // All research papers and the number of authors that wrote that paper
    const query1 = `
      SELECT rp.paper_id, rp.paper_title, COUNT(ap.author_id) AS num_authors
      FROM research_papers rp
      LEFT JOIN author_paper ap ON rp.paper_id = ap.paper_id
      GROUP BY rp.paper_id, rp.paper_title;
    `;

    // Sum of the research papers published by all female authors
    const query2 = `
      SELECT COUNT(DISTINCT ap.paper_id) AS total_papers_published_by_females
      FROM author_paper ap
      JOIN authors a ON ap.author_id = a.author_id
      WHERE a.gender = 'Female';
    `;

    // Average of the h-index of all authors per university
    const query3 = `
      SELECT university, AVG(h_index) AS avg_h_index
      FROM authors
      GROUP BY university;
    `;

    // Sum of the research papers of the authors per university
    const query4 = `
      SELECT a.university, COUNT(ap.paper_id) AS total_papers
      FROM authors a
      LEFT JOIN author_paper ap ON a.author_id = ap.author_id
      GROUP BY a.university;
    `;

    // Minimum and maximum of the h-index of all authors per university
    const query5 = `
      SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
      FROM authors
      GROUP BY university;
    `;

    // Execute each query
    connection.query(query1, (err, results) => {
      if (err) throw err;
      console.log("Query 1 results:");
      console.log(results);
    });

    connection.query(query2, (err, results) => {
      if (err) throw err;
      console.log("Query 2 results:");
      console.log(results);
    });

    connection.query(query3, (err, results) => {
      if (err) throw err;
      console.log("Query 3 results:");
      console.log(results);
    });

    connection.query(query4, (err, results) => {
      if (err) throw err;
      console.log("Query 4 results:");
      console.log(results);
    });

    connection.query(query5, (err, results) => {
      if (err) throw err;
      console.log("Query 5 results:");
      console.log(results);

      // Close the connection
      connection.end();
    });
  };

  // Call the function to execute aggregate queries
  executeAggregateQueries();
});
