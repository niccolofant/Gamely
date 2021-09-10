const FeesStorage = artifacts.require("FeesStorage");

module.exports = async function (deployer) {
  await deployer.deploy(FeesStorage);
};
