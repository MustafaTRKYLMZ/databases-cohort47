var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "meetup",
});

connection.connect((error) =>
  error
    ? console.error("Error connecting to MySQL database!")
    : console.log("Connected to MySQL database!")
);

// create database if not exists
const createDatabaseQuery = "CREATE DATABASE IF NOT EXISTS meetup";
connection.query(createDatabaseQuery, (err, results) => {
  if (err) {
    console.error("Error creating database: ", err);
    connection.end();
    return;
  }
  console.log("Database created successfully!");
});

const createTablesQuery = `CREATE TABLE IF NOT EXISTS Room (
    room_no INT NOT NULL AUTO_INCREMENT,
    room_name VARCHAR(45) NOT NULL,
    floor_number INT NOT NULL,
    PRIMARY KEY (room_no)
);
CREATE TABLE IF NOT EXISTS Invitee (
  invitee_no INT NOT NULL AUTO_INCREMENT,
  invitee_name VARCHAR(45) NOT NULL,
  invited_by VARCHAR(45) NOT NULL,
  PRIMARY KEY (invitee_no)
);
CREATE TABLE IF NOT EXISTS Meeting (
    meeting_no INT NOT NULL AUTO_INCREMENT,
    meeting_title VARCHAR(45) NOT NULL,
    starting_time DATETIME NOT NULL,
    ending_time DATETIME NOT NULL,
    room_no INT NOT NULL,
    PRIMARY KEY (meeting_no),
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
);
`;
connection.query(createTablesQuery, (err, results) => {
  if (err) {
    console.error("Error creating tables: ", err);
    connection.end();
    return;
  }
  console.log("results: ", results);
});
console.log("Tables created successfully!");

// Insert data into tables
const insertDataQuery = `
  INSERT INTO Invitee (invitee_name, invited_by) VALUES
  ('John Doe', 'Jane Doe'),
  ('Alice Smith', 'Bob Smith'),
  ('Michael Johnson', 'David Johnson'),
  ('Emily Brown', 'Chris Brown'),
  ('Daniel Wilson', 'Sarah Wilson');

INSERT INTO Room (room_name, floor_number) VALUES
  ('Conference Room 1', 2),
  ('Conference Room 2', 3),
  ('Meeting Room A', 1),
  ('Meeting Room B', 2),
  ('Boardroom', 3);

INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
  ('Project Kickoff Meeting', '2024-05-05 09:00:00', '2024-05-05 11:00:00', 1),
  ('Weekly Team Meeting', '2024-05-06 10:00:00', '2024-05-06 12:00:00', 2),
  ('Budget Review Meeting', '2024-05-07 14:00:00', '2024-05-07 16:00:00', 3),
  ('Product Launch Planning', '2024-05-08 11:00:00', '2024-05-08 13:00:00', 4),
  ('Board Meeting', '2024-05-09 15:00:00', '2024-05-09 17:00:00', 5);
    `;

connection.query(insertDataQuery, (err, results) => {
  if (err) {
    console.error("Error inserting data: ", err);
  } else {
    console.log("Data inserted successfully!");
  }

  // End MySQL connection
  connection.end();
});
