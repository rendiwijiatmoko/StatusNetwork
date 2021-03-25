const StatusNetwork = artifacts.require("StatusNetwork");

module.exports = function (deployer) {
  deployer.deploy(StatusNetwork);
};
