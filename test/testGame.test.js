const GameFactory = artifacts.require("GameFactory");
const Game = artifacts.require("Game");

contract("Game", (accounts) => {
  let factory;
  let gameInstance;
  let owner;
  let player1;
  let player2;

  before(async () => {
    factory = await GameFactory.deployed();
    await factory.createGame({
      from: accounts[1],
      value: web3.utils.toWei("10", "ether"),
    });
    let games = await factory.getDeployedGames();
    owner = await factory.owner();
    gameInstance = await Game.at(games[0]);
  });

  it("Should display the account who created a new game as `player1`", async () => {
    player1 = await gameInstance.player1();
    assert.strictEqual(accounts[1], player1);
  });

  it("Shows the correct bet amount", async () => {
    let bet = await gameInstance.bet();
    assert.strictEqual(web3.utils.toWei("10", "ether"), bet.toString());
  });

  it("Should allow the creator to delete the game before anyone accepts it, giving the bet amount to him and any exceeding ETHs to the owner", async () => {
    await gameInstance.deleteGame({
      from: player1,
    });
    let balance = await web3.eth.getBalance(gameInstance.address);
    assert.strictEqual("0", balance);
  });
  /*
  it("Allows a new player to join the game, only if he stakes the same amount of ETHs", async () => {
    await gameInstance.joinGame({
      from: accounts[2],
      value: web3.utils.toWei("10", "ether"),
    });
    player2 = await gameInstance.player2();
    assert.strictEqual(accounts[2], player2);
  });
*/
  it("Should revert if a player tries to join an already full game", async () => {
    try {
      await gameInstance.joinGame({
        from: accounts[3],
        value: web3.utils.toWei("10", "ether"),
      });
    } catch (err) {
      assert(err);
    }
  });

  it("Should revert if creator tries to delete the game after another player accepts it", async () => {
    try {
      await gameInstance.deleteGame({
        from: player1,
      });
    } catch (err) {
      assert(err);
    }
  });
});
