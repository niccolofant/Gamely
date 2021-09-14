const GameFactory = artifacts.require("GameFactory");

contract("GameFactory", (accounts) => {
  let factoryInstance;
  let gameInstance;

  before(async () => {
    factoryInstance = await GameFactory.deployed();
  });

  it("Should assert true", async () => {
    await GameFactory.deployed();
    return assert.isTrue(true);
  });

  it("Can deploy games", async () => {
    await factoryInstance.instanciateGame({
      from: accounts[0],
    });
    let gameAddress = await factoryInstance.getDeployedGames();
    gameInstance = gameAddress[0];
    assert.ok(gameInstance);
  });
});
