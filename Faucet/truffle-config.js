module.exports = {
  contracts_build_directory:"./src/ethereum/contracts",
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    sepolia:{
      url:import.meta.env.SEPOLIA_NODE_URL_HTTPS,
      accounts:[import.meta.env.METAMASK_PRIVATE_KEY],
      chainId:11155111
    }
  },
  compilers: {
    solc: {
      version: "0.8.4",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
};