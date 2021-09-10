const FeesStorage = artifacts.require("FeesStorage");
const Ownable = artifacts.require("Ownable");

contract("FeesStorage", (accounts) => {
  let storageInstance;
  let ownableInstance;

  beforeEach(async () => {
    storageInstance = await FeesStorage.deployed();
    ownableInstance = await Ownable.deployed();
    //console.log(await ownableInstance.owner());

    await storageInstance.sendTransaction({
      from: accounts[1],
      value: "1000",
    });
  });

  describe("FeesStorage", async () => {
    it("Allows the Owner to retrieve current balance", async () => {
      let balance = await storageInstance.getBalance();
      console.log(balance.toNumber());
      assert.strictEqual(10, balance);
    });
  });
});
