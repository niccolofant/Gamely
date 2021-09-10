const FeesStorage = artifacts.require("FeesStorage");
const Ownable = artifacts.require("Ownable");

contract("FeesStorage", () => {
  let storageInstance;
  let ownableInstance;
  let accounts;
  let owner;

  before(async () => {
    storageInstance = await FeesStorage.deployed();
    ownableInstance = await Ownable.deployed();
    accounts = await web3.eth.getAccounts();
    owner = await storageInstance.owner();
  });

  describe("FeesStorage", async () => {
    it("Initial balance should be 0 ETHs", async () => {
      let balance = await storageInstance.getBalance();
      assert.strictEqual(0, balance.toNumber());
    });

    it("Should display 1 ETH as balance after sending 1 ETH", async () => {
      await web3.eth.sendTransaction({
        to: storageInstance.address,
        from: accounts[0],
        value: web3.utils.toWei("1", "ether"),
      });
      let balance = await web3.eth.getBalance(storageInstance.address);
      assert.strictEqual(web3.utils.toWei("1", "ether"), balance);
    });

    it("Should allow the owner to withdraw some ETHs", async () => {});
  });
});
