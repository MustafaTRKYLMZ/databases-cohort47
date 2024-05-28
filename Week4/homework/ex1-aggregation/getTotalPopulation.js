const { MongoClient } = require("mongodb");
require("dotenv").config();

const getTotalPopulationByYear = async (country) => {
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db("databaseWeek4");
    const countryCollection = db.collection("country");

    const pipeline = [
      { $match: { Country: country } },
      {
        $group: {
          _id: "$Year",
          countPopulation: {
            $sum: {
              $add: [
                { $toInt: { $ifNull: [{ $toDouble: "$M" }, 0] } },
                { $toInt: { $ifNull: [{ $toDouble: "$F" }, 0] } },
              ],
            },
          },
        },
      },
      { $sort: { _id: 1 } }, // Sort by year
    ];

    const results = await countryCollection.aggregate(pipeline).toArray();
    const totalPopulationByYear = results.map((result) => ({
      id: result._id,
      countPopulation: result.countPopulation,
    }));

    return totalPopulationByYear;
  } catch (err) {
    console.error("Error retrieving total population by year:", err);
  } finally {
    await client.close();
  }
};

// call function
getTotalPopulationByYear("Netherlands").then((data) =>
  console.log("Total population of Netherlands: ", data)
);
