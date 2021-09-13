const GameFactory = artifacts.require("GameFactory");

contract("GameFactory", (accounts) => {
  let factory;
  let game;

  before(async () => {
    factory = await GameFactory.deployed();
  });

  it("Should assert true", async () => {
    await GameFactory.deployed();
    return assert.isTrue(true);
  });

  it("Can deploy games", async () => {
    await factory.createGame({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });
    let gameAddress = await factory.getDeployedGames();
    game = gameAddress[0];
    assert.ok(game);
  });
});
