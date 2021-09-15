const GameFactory = artifacts.require("GameFactory");

contract("GameFactory", (accounts) => {
  let factoryInstance;
  let gameInstance;

  beforeEach(async () => {
    factoryInstance = await GameFactory.new();
  });

  describe("GameFactory", async () => {
    it("Can deploy games", async () => {
      await factoryInstance.instanciateGame({
        from: accounts[0],
      });
      let gameAddress = await factoryInstance.getDeployedGames();
      gameInstance = gameAddress[0];
      assert.ok(gameInstance);
    });

    it("Should retrieve deployed games", async () => {
      await factoryInstance.instanciateGame({
        from: accounts[0],
      });
      await factoryInstance.instanciateGame({
        from: accounts[1],
      });
      await factoryInstance.instanciateGame({
        from: accounts[2],
      });
      let games = await factoryInstance.getDeployedGames();
      assert.strictEqual(3, games.length);
    });
  });
});
