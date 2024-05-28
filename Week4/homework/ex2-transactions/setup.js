require("dotenv").config();
const { MongoClient } = require("mongodb");

const counts = [
  {
    account_number: "1001",
    balance: 5000,
    account_changes: [
      {
        change_number: 1,
        amount: 1000,
        changed_date: new Date("2024-05-28"),
        remark: "Initial deposit",
      },
      {
        change_number: 2,
        amount: -200,
        changed_date: new Date("2024-05-29"),
        remark: "Withdrawal",
      },
    ],
  },
  {
    account_number: "1002",
    balance: 3000,
    account_changes: [
      {
        change_number: 1,
        amount: 500,
        changed_date: new Date("2024-05-27"),
        remark: "Initial deposit",
      },
      {
        change_number: 2,
        amount: 100,
        changed_date: new Date("2024-05-28"),
        remark: "Interest",
      },
    ],
  },
  // Add more sample data to reach a minimum length of 10
  {
    account_number: "1003",
    balance: 2000,
    account_changes: [
      {
        change_number: 1,
        amount: 300,
        changed_date: new Date("2024-05-26"),
        remark: "Initial deposit",
      },
      {
        change_number: 2,
        amount: -50,
        changed_date: new Date("2024-05-27"),
        remark: "Withdrawal",
      },
    ],
  },
  {
    account_number: "1004",
    balance: 4000,
    account_changes: [
      {
        change_number: 1,
        amount: 800,
        changed_date: new Date("2024-05-25"),
        remark: "Initial deposit",
      },
      {
        change_number: 2,
        amount: -100,
        changed_date: new Date("2024-05-26"),
        remark: "Withdrawal",
      },
    ],
  },
  {
    account_number: "1005",
    balance: 6000,
    account_changes: [
      {
        change_number: 1,
        amount: 2000,
        changed_date: new Date("2024-05-24"),
        remark: "Initial deposit",
      },
      {
        change_number: 2,
        amount: -500,
        changed_date: new Date("2024-05-25"),
        remark: "Withdrawal",
      },
    ],
  },
  {
    account_number: "1006",
    balance: 3500,
    account_changes: [
      {
        change_number: 1,
        amount: 700,
        changed_date: new Date("2024-05-23"),
        remark: "Initial deposit",
      },
      {
        change_number: 2,
        amount: 150,
        changed_date: new Date("2024-05-24"),
        remark: "Interest",
      },
    ],
  },
  {
    account_number: "1007",
    balance: 4500,
    account_changes: [
      {
        change_number: 1,
        amount: 900,
        changed_date: new Date("2024-05-22"),
        remark: "Initial deposit",
      },
      {
        change_number: 2,
        amount: -200,
        changed_date: new Date("2024-05-23"),
        remark: "Withdrawal",
      },
    ],
  },
  {
    account_number: "1008",
    balance: 2500,
    account_changes: [
      {
        change_number: 1,
        amount: 500,
        changed_date: new Date("2024-05-21"),
        remark: "Initial deposit",
      },
      {
        change_number: 2,
        amount: 100,
        changed_date: new Date("2024-05-22"),
        remark: "Interest",
      },
    ],
  },
  {
    account_number: "1009",
    balance: 5500,
    account_changes: [
      {
        change_number: 1,
        amount: 1100,
        changed_date: new Date("2024-05-20"),
        remark: "Initial deposit",
      },
      {
        change_number: 2,
        amount: -300,
        changed_date: new Date("2024-05-21"),
        remark: "Withdrawal",
      },
    ],
  },
  {
    account_number: "1010",
    balance: 500,
    account_changes: [
      {
        change_number: 1,
        amount: 500,
        changed_date: new Date("2024-05-19"),
        remark: "Initial deposit",
      },
    ],
  },
];

const setupAccounts = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();

    const db = client.db("databaseWeek4");
    const countsCollection = db.collection("counts");
    console.log("countsCollection", countsCollection);
    await countsCollection.deleteMany({});
    await countsCollection.insertMany(counts);
  } catch (error) {}
};

module.exports = {
  setupAccounts,
};
