// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const infuraKey = "fj4jll3k.....";
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "*",
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
       optimizer: {
         enabled: false,
         runs: 200
       },
    }
  },
  db: {
    enabled: false
  }
};
