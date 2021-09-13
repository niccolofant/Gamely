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
      let balance = await web3.eth.getBalance(storageInstance.address);
      assert.strictEqual("0", balance);
    });

    it("Should display 10 ETH as balance after sending 10 ETH", async () => {
      await web3.eth.sendTransaction({
        to: storageInstance.address,
        from: accounts[0],
        value: web3.utils.toWei("10", "ether"),
      });
      let balance = await web3.eth.getBalance(storageInstance.address);
      assert.strictEqual(web3.utils.toWei("10", "ether"), balance);
    });

    it("Should allow the owner to withdraw some ETHs", async () => {
      let balance = await web3.eth.getBalance(storageInstance.address);
      await storageInstance.withdrawMoney(
        accounts[1],
        web3.utils.toWei("1", "ether"),
        { from: owner }
      );
      balance = await web3.eth.getBalance(storageInstance.address);
      assert.strictEqual(web3.utils.toWei("9", "ether"), balance);
    });

    it("Should revert if somebody other than the owner tries to withdraw some ETHs", async () => {
      try {
        await storageInstance.withdrawMoney(
          accounts[1],
          web3.utils.toWei("1", "ether"),
          { from: accounts[1] }
        );
      } catch (err) {
        assert(err);
      }
    });
  });
});
