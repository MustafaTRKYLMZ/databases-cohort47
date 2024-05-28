const { MongoClient } = require("mongodb");
require("dotenv").config();

const getContinentPopulationByYearAndAge = async (year, age) => {
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db("databaseWeek4");
    const countryCollection = db.collection("country");

    const pipeline = [
      { $match: { Year: year, Age: age } },
      {
        $addFields: {
          // Use $toInt and $ifNull to ensure proper integer conversion and handle missing values
          M: { $toInt: { $ifNull: ["$M", "0"] } },
          F: { $toInt: { $ifNull: ["$F", "0"] } },
          TotalPopulation: {
            $add: [
              { $toInt: { $ifNull: ["$M", "0"] } },
              { $toInt: { $ifNull: ["$F", "0"] } },
            ],
          },
        },
      },
    ];

    const results = await countryCollection.aggregate(pipeline).toArray();

    console.log(`Results for Year: ${year} and Age: ${age}:`, results);
    return results;
  } catch (err) {
    console.error(
      "Error retrieving continent population by year and age:",
      err
    );
  } finally {
    await client.close();
  }
};

// Example usage
getContinentPopulationByYearAndAge(2020, "100+").then((data) =>
  console.log("Final Data:", data)
);
