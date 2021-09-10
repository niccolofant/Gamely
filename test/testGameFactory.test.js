const GameFactory = artifacts.require("GameFactory");

contract("GameFactory", (accounts) => {
  let factory;
  let game;

  beforeEach(async () => {
    factory = await GameFactory.deployed();
  });

  it("should assert true", async () => {
    await GameFactory.deployed();
    return assert.isTrue(true);
  });

  it("can deploy games", async () => {
    await factory.createGame({ from: accounts[0], value: 100 });
    let gameAddress = await factory.getDeployedGames();
    assert.ok(gameAddress[0]);
  });
});
