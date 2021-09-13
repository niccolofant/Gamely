const GameFactory = artifacts.require("GameFactory");
const Game = artifacts.require("Game");

contract("Game", (accounts) => {
  let factory;
  let gameInstance;
  let player1;

  before(async () => {
    factory = await GameFactory.deployed();
    await factory.createGame({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });
    let games = await factory.getDeployedGames();
    gameInstance = await Game.at(games[0]);
  });

  it("Allows a player to create a game", async () => {
    player1 = await gameInstance.player1();
    assert.strictEqual(accounts[0], player1);
  });

  it("Shows the correct bet amount", async () => {
    let bet = await gameInstance.bet();
    //console.log(bet.toString());
    assert.strictEqual(web3.utils.toWei("10", "ether"), bet.toString());
  });

  it("Shows the correct balances", async () => {
    let balance = await web3.eth.getBalance(gameInstance.address);
  });
});
