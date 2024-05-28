require("dotenv").config();
const { MongoClient } = require("mongodb");

const transfer = async (fromAccountNumber, toAccountNumber, amount, remark) => {
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const db = client.db("databaseWeek4");
    const countsCollection = db.collection("counts");

    const fromAccount = await countsCollection.findOne({
      account_number: fromAccountNumber,
    });
    if (!fromAccount) {
      console.log("Sender account not found!");
      return;
    }

    if (fromAccount.balance < amount) {
      console.log("Insufficient balance!");
      return;
    }

    const toAccount = await countsCollection.findOne({
      account_number: toAccountNumber,
    });
    if (!toAccount) {
      console.log("Receiver account not found!");
      return;
    }

    await countsCollection.updateOne(
      { account_number: fromAccountNumber },
      {
        $inc: { balance: -amount },
        $push: {
          account_changes: {
            change_number: fromAccount.account_changes.length + 1,
            amount: -amount,
            changed_date: new Date(),
            remark,
          },
        },
      }
    );

    await countsCollection.updateOne(
      { account_number: toAccountNumber },
      {
        $inc: { balance: amount },
        $push: {
          account_changes: {
            change_number: toAccount.account_changes.length + 1,
            amount,
            changed_date: new Date(),
            remark,
          },
        },
      }
    );

    console.log(
      `Money transfer successfully completed: ${amount} from account ${fromAccountNumber} to account ${toAccountNumber}.`
    );
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await client.close();
  }
};

module.exports = { transfer };
