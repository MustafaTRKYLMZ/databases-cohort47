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

  // Use the new database
  connection.changeUser({ database: "meetup" }, (err) => {
    if (err) {
      console.error("Error switching database: ", err);
      connection.end();
      return;
    }
    console.log("Switched to database 'meetup'");

    // Create Room table
    const createRoomTableQuery = `
      CREATE TABLE IF NOT EXISTS Room (
        room_no INT NOT NULL AUTO_INCREMENT,
        room_name VARCHAR(45) NOT NULL,
        floor_number INT NOT NULL,
        PRIMARY KEY (room_no)
      );
    `;
    connection.query(createRoomTableQuery, (err, results) => {
      if (err) {
        console.error("Error creating Room table: ", err);
        connection.end();
        return;
      }
      console.log("Room table created successfully!");

      // Create Invitee table
      const createInviteeTableQuery = `
        CREATE TABLE IF NOT EXISTS Invitee (
          invitee_no INT NOT NULL AUTO_INCREMENT,
          invitee_name VARCHAR(45) NOT NULL,
          invited_by VARCHAR(45) NOT NULL,
          PRIMARY KEY (invitee_no)
        );
      `;
      connection.query(createInviteeTableQuery, (err, results) => {
        if (err) {
          console.error("Error creating Invitee table: ", err);
          connection.end();
          return;
        }
        console.log("Invitee table created successfully!");

        // Create Meeting table
        const createMeetingTableQuery = `
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
        connection.query(createMeetingTableQuery, (err, results) => {
          if (err) {
            console.error("Error creating Meeting table: ", err);
            connection.end();
            return;
          }
          console.log("Meeting table created successfully!");

          // Insert data into Invitee table
          const insertInviteesQuery = `
            INSERT INTO Invitee (invitee_name, invited_by) VALUES
            ('John Doe', 'Jane Doe'),
            ('Alice Smith', 'Bob Smith'),
            ('Michael Johnson', 'David Johnson'),
            ('Emily Brown', 'Chris Brown'),
            ('Daniel Wilson', 'Sarah Wilson');
          `;
          connection.query(insertInviteesQuery, (err, results) => {
            if (err) {
              console.error("Error inserting invitees: ", err);
              connection.end();
              return;
            }
            console.log("Invitees inserted successfully!");

            // Insert data into Room table
            const insertRoomsQuery = `
              INSERT INTO Room (room_name, floor_number) VALUES
              ('Conference Room 1', 2),
              ('Conference Room 2', 3),
              ('Meeting Room A', 1),
              ('Meeting Room B', 2),
              ('Boardroom', 3);
            `;
            connection.query(insertRoomsQuery, (err, results) => {
              if (err) {
                console.error("Error inserting rooms: ", err);
                connection.end();
                return;
              }
              console.log("Rooms inserted successfully!");

              // Insert data into Meeting table
              const insertMeetingsQuery = `
                INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
                ('Project Kickoff Meeting', '2024-05-05 09:00:00', '2024-05-05 11:00:00', 1),
                ('Weekly Team Meeting', '2024-05-06 10:00:00', '2024-05-06 12:00:00', 2),
                ('Budget Review Meeting', '2024-05-07 14:00:00', '2024-05-07 16:00:00', 3),
                ('Product Launch Planning', '2024-05-08 11:00:00', '2024-05-08 13:00:00', 4),
                ('Board Meeting', '2024-05-09 15:00:00', '2024-05-09 17:00:00', 5);
              `;
              connection.query(insertMeetingsQuery, (err, results) => {
                if (err) {
                  console.error("Error inserting meetings: ", err);
                } else {
                  console.log("Meetings inserted successfully!");
                }

                // End MySQL connection
                connection.end();
              });
            });
          });
        });
      });
    });
  });
});
