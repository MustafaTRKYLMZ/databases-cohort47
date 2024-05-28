const { setupAccounts } = require("./setup");
const { transfer } = require("./transfer");

const app = async () => {
  await setupAccounts();
  await transfer("1008", "1009", 100, "Transfer to account 1009");
};

app();
