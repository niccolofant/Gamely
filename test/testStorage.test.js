const FeesStorage = artifacts.require("FeesStorage");

contract("FeesStorage", (accounts) => {
  let storageInstance;
  let owner;

  beforeEach(async () => {
    storageInstance = await FeesStorage.new();
    owner = await storageInstance.owner();
  });

  describe("FeesStorage", async () => {
    it("Initial balance should be 0 ETHs", async () => {
      let balance = await storageInstance.getContractBalance();
      assert.strictEqual("0", balance.toString());
    });

    it("Should display 0.01 ETH as balance after sending 0.01 ETH", async () => {
      await web3.eth.sendTransaction({
        to: storageInstance.address,
        from: accounts[0],
        value: web3.utils.toWei("0.01", "ether"),
      });
      let balance = await storageInstance.getContractBalance();
      assert.strictEqual(web3.utils.toWei("0.01", "ether"), balance.toString());
    });

    it("Should revert if the amount of ETHs to withdraw is bigger than the contract's balance", async () => {
      try {
        await storageInstance.withdrawMoney(
          accounts[1],
          web3.utils.toWei("1000", "ether"),
          { from: owner }
        );
      } catch (err) {
        assert(err);
      }
    });

    it("Should allow the owner to withdraw some ETHs", async () => {
      await web3.eth.sendTransaction({
        to: storageInstance.address,
        from: accounts[0],
        value: web3.utils.toWei("0.01", "ether"),
      });
      await storageInstance.withdrawMoney(
        accounts[1],
        web3.utils.toWei("0.001", "ether"),
        { from: owner }
      );
      let balance = await storageInstance.getContractBalance();
      assert.strictEqual(
        web3.utils.toWei("0.009", "ether"),
        balance.toString()
      );
    });

    it("Should revert if somebody other than the owner tries to withdraw some ETHs", async () => {
      try {
        await web3.eth.sendTransaction({
          to: storageInstance.address,
          from: accounts[0],
          value: web3.utils.toWei("0.01", "ether"),
        });
        await storageInstance.withdrawMoney(
          accounts[1],
          web3.utils.toWei("0.001", "ether"),
          { from: accounts[1] }
        );
      } catch (err) {
        assert(err);
      }
    });
  });
});
