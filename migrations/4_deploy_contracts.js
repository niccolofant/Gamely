const GameFactory = artifacts.require("GameFactory");

module.exports = async function (deployer) {
  await deployer.deploy(GameFactory);
};
