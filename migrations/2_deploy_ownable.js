const Ownable = artifacts.require("Ownable");

module.exports = async function (deployer) {
  await deployer.deploy(Ownable);
};
