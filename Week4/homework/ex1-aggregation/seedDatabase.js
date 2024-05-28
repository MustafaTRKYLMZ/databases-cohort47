const fs = require("fs");
const csv = require("csv-parser");
require("dotenv").config();

const seedDatabase = async (client) => {
  try {
    await client.connect();

    const db = client.db("databaseWeek4");
    const countryCollection = db.collection("country");

    const hasCollection = await db
      .listCollections({ name: "country" })
      .hasNext();

    if (hasCollection) {
      // Remove all the documents
      await countryCollection.deleteMany({});

      const parser = csv({ delimiter: "," });
      const stream = fs.createReadStream("population_pyramid_1950-2022.csv");

      const documentsToInsert = [];

      stream
        .pipe(parser)
        .on("data", (row) => {
          //new document
          const document = {
            Country: row.Country,
            Year: parseInt(row.Year),
            Age: row.Age,
            M: parseInt(row.M),
            F: parseInt(row.F),
          };
          documentsToInsert.push(document);
        })
        .on("end", async () => {
          console.log("CSV file parsed, inserting data into MongoDB");

          try {
            // Insert all documents at once
            const insertResult = await countryCollection.insertMany(
              documentsToInsert
            );
            console.log(`${insertResult.insertedCount} documents inserted`);

            for (const document of documentsToInsert) {
              const filter = {
                Country: document.Country,
                Year: document.Year,
                Age: document.Age,
                M: document.M,
                F: document.F,
              };
              const update = { $set: document };
              await countryCollection.updateOne(filter, update, {
                upsert: true,
              });
            }

            console.log("Documents inserted and updated if necessary");
          } catch (err) {
            console.error("Error inserting documents:", err);
          } finally {
            client.close();
          }
        })
        .on("error", (err) => {
          console.error("Error reading CSV:", err);
          client.close();
        });
    } else {
      throw new Error("The collection `country` does not exist!");
    }
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = {
  seedDatabase,
};
