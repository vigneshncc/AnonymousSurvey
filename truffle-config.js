const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = 'horn park van suit lunar master long mom senior promote expand clutch';

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: 5777 // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3/483f5722d4534135b12ae4a79c4f4940")
      },
      network_id: 3,
      gas: 6912390
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://rinkeby.infura.io/v3/483f5722d4534135b12ae4a79c4f4940")
      },
      network_id: 4,
      gas: 6912390
    },
    rpc: {
      host: "127.0.0.1",
      post: 8545
    }
  }
};
