const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 5777 // Match any network id
    },
    ropsten:  {
     network_id: 3,
     host: "localhost",
     port:  8545,
     gas:   6912390
    },
    rinkeby:  {
     network_id: 4,
     host: "localhost",
     port:  8545,
     gas:   6912390
    }
  },
  rpc: {
    host: 'localhost',
    post:8080
  }
};
