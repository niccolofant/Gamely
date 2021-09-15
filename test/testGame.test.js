const GameFactory = artifacts.require("GameFactory");
const Game = artifacts.require("Game");
const FeesStorage = artifacts.require("FeesStorage");

contract("Game", (accounts) => {
  let factoryInstance;
  let gameInstance;
  let storageInstance;
  let owner;
  let player1;

  beforeEach(async () => {
    factoryInstance = await GameFactory.new();
    storageInstance = await FeesStorage.new();
    await factoryInstance.instanciateGame({
      from: accounts[1],
    });
    let games = await factoryInstance.getDeployedGames();
    owner = await factoryInstance.owner();
    gameInstance = await Game.at(games[0]);
  });

  describe("Game", async () => {
    it("Should display the account who instanciated a new game as `player1`", async () => {
      player1 = await gameInstance.player1();
      assert.strictEqual(accounts[1], player1);
    });

    describe("createGame() function", async () => {
      it("Should allow the player who instanciated the game to create the game and stake some ETHs", async () => {
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("0.01", "ether"),
        });
        let bet = await gameInstance.bet();
        assert.strictEqual(web3.utils.toWei("0.01", "ether"), bet.toString());
      });

      it("Should display the correct bet amount after the player who instanciated the game creates the game", async () => {
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("0.01", "ether"),
        });
        let bet = await gameInstance.bet();
        assert.strictEqual(web3.utils.toWei("0.01", "ether"), bet.toString());
      });

      it("Should revert if the player who instanciated the game tries to create a game without staking any ETHs", async () => {
        try {
          await gameInstance.createGame({
            from: player1,
          });
          assert(false);
        } catch (err) {
          assert(err);
        }
      });

      it("Should revert if anyone other than the player who instanciated the game tries to create the game", async () => {
        try {
          await gameInstance.createGame({
            from: accounts[5],
            value: web3.utils.toWei("0.01", "ether"),
          });
          assert(false);
        } catch (err) {
          assert(err);
        }
      });
    });

    describe("joinGame() function", async () => {
      it("Should revert if the game creator tries to join his own game", async () => {
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("0.01", "ether"),
        });
        try {
          await gameInstance.joinGame({
            from: player1,
            value: web3.utils.toWei("0.01", "ether"),
          });
          assert(false);
        } catch (err) {
          assert(err);
        }
      });

      it("Allows a player to join a game, if he stakes the same amount of ETHs as the `bet` amount", async () => {
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("0.01", "ether"),
        });
        let bet = await gameInstance.bet();
        await gameInstance.joinGame({
          from: accounts[2],
          value: bet,
        });
        let player2 = await gameInstance.player2();
        assert.strictEqual(accounts[2], player2);
      });

      it("Should revert if a player tries to join the game with a different amount of ETHs", async () => {
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("0.01", "ether"),
        });
        try {
          await gameInstance.joinGame({
            from: accounts[2],
            value: web3.utils.toWei("10", "ether"),
          });
          assert(false);
        } catch (err) {
          assert(err);
        }
      });

      it("Should display the correct prize pool after somebody joins the game", async () => {
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("0.01", "ether"),
        });
        await gameInstance.joinGame({
          from: accounts[2],
          value: web3.utils.toWei("0.01", "ether"),
        });
        let prizePool = await gameInstance.prizePool();
        assert.strictEqual(
          web3.utils.toWei("0.02", "ether"),
          prizePool.toString()
        );
      });

      it("Should revert if somebody tries to join the game when it is already full", async () => {
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("0.01", "ether"),
        });
        await gameInstance.joinGame({
          from: accounts[2],
          value: web3.utils.toWei("0.01", "ether"),
        });
        try {
          await gameInstance.joinGame({
            from: accounts[2],
            value: web3.utils.toWei("0.01", "ether"),
          });
          assert(false);
        } catch (err) {
          assert(err);
        }
      });
    });

    describe("deleteGame() function", async () => {
      it("When the game creator calls it, it frees up contract's balance", async () => {
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("0.01", "ether"),
        });
        await gameInstance.deleteGame({
          from: player1,
        });
        let balance = await web3.eth.getBalance(gameInstance.address);
        assert.strictEqual("0", balance);
      });

      it("When the game creator calls it, it send back to him the bet's amount", async () => {
        let initialPlayer1Balance = await web3.eth.getBalance(player1);
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("0.01", "ether"),
        });
        await gameInstance.deleteGame({
          from: player1,
        });
        let finalPlayer1Balance = await web3.eth.getBalance(player1);
        assert.ok(
          parseInt(finalPlayer1Balance) >
            parseInt(initialPlayer1Balance) - 2000000000000000
        );
      });

      it("When the game creator calls it, it send to the owner any exceeding amount of ETHs", async () => {
        let initialOwnerBalance = await web3.eth.getBalance(owner);
        await web3.eth.sendTransaction({
          to: gameInstance.address,
          from: accounts[5],
          value: web3.utils.toWei("10", "ether"),
        });
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("0.01", "ether"),
        });
        await gameInstance.deleteGame({
          from: player1,
        });
        let finalOwnerBalance = await web3.eth.getBalance(owner);
        assert.strictEqual(
          parseInt(finalOwnerBalance),
          parseInt(initialOwnerBalance) +
            parseInt(web3.utils.toWei("10", "ether"))
        );
      });

      it("Should revert if creator tries to delete the game after another player accepts it", async () => {
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("0.01", "ether"),
        });
        await gameInstance.joinGame({
          from: accounts[2],
          value: web3.utils.toWei("0.01", "ether"),
        });
        try {
          await gameInstance.deleteGame({
            from: player1,
          });
          assert(false);
        } catch (err) {
          assert(err);
        }
      });

      it("Should revert if any account other than the game creator tries to call it", async () => {
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("0.01", "ether"),
        });
        try {
          await gameInstance.deleteGame({
            from: accounts[5],
          });
          assert(false);
        } catch (err) {
          assert(err);
        }
      });
    });

    describe("declareWinner() function", async () => {
      it("Should send the prize pool (minus the 2% fee) to the winner", async () => {
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("10", "ether"),
        });
        let initialPlayer1Balance = await web3.eth.getBalance(player1);
        await gameInstance.joinGame({
          from: accounts[2],
          value: web3.utils.toWei("10", "ether"),
        });
        await gameInstance.declareWinner(player1, storageInstance.address, {
          from: owner,
        });
        let finalPlayer1Balance = await web3.eth.getBalance(player1);
        let prizePool = await gameInstance.prizePool();
        let fee = (parseInt(prizePool.toString()) / 100) * 2;
        assert.strictEqual(
          parseInt(initialPlayer1Balance) +
            parseInt(web3.utils.toWei("20", "ether")) -
            fee,
          parseInt(finalPlayer1Balance)
        );
      });

      it("Should send the 2% fee to the storage contract", async () => {
        let initialStorageBalance = await web3.eth.getBalance(
          storageInstance.address
        );
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("10", "ether"),
        });
        await gameInstance.joinGame({
          from: accounts[2],
          value: web3.utils.toWei("10", "ether"),
        });
        await gameInstance.declareWinner(player1, storageInstance.address, {
          from: owner,
        });
        let prizePool = await gameInstance.prizePool();
        let fee = (parseInt(prizePool.toString()) / 100) * 2;
        let finalStorageBalance = await web3.eth.getBalance(
          storageInstance.address
        );
        assert.strictEqual(
          parseInt(initialStorageBalance) + fee,
          parseInt(finalStorageBalance)
        );
      });

      it("Should revert if the owner tries to call it when the game is not full", async () => {
        await gameInstance.createGame({
          from: player1,
          value: web3.utils.toWei("0.01", "ether"),
        });
        try {
          await gameInstance.declareWinner(player1, storageInstance.address, {
            from: owner,
          });
          assert(false);
        } catch (err) {
          assert(err);
        }
      });
    });
  });
});
