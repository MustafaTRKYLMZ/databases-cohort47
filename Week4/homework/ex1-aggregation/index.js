const { MongoClient } = require("mongodb");
require("dotenv").config();

const { seedDatabase } = require("./seedDatabase");

const connectAndProcess = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await seedDatabase(client);
  } catch (error) {
    console.log("Error in seedDatabase", error);
  }
};

connectAndProcess();
