
// //!Third party packages
// const contract = require("@truffle/contract");
// const {web3,provider} = require('../web3_local.js');
// const HDWalletProvider = require('@truffle/hdwallet-provider');

// const Faucet = require('../contracts/Faucet.json')

// const { Web3 } = require('web3');


// //?loadContract
// const loadContract = async (name) => {


//     // console.log('All providers is ', web3)
    
//     // const response = await fetch(`../contracts/Faucet.json`)

//     // console.log('Response is ', response);

//     // const Artifact = await response.json()
//     var provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
//     const _contract = contract(Faucet)
//     _contract.setProvider(provider)

//     let deployedContract = null
//     try{
//         deployedContract = await _contract.deployed()
//         console.log('Deployed contract is ', deployedContract);
//     }
//     catch(err){
//         console.log('Please try again deploy contract process')
//         console.log('Errr is ', err);
//     }
//     return deployedContract
// }
// loadContract('Faucet')



import contract from "@truffle/contract"

const loadContract = async (name, provider) => {
    const res = await fetch(`../contracts/${name}.json`)
    console.log('Response is ', res)
    const Artifact = await res.json()

    const _contract = contract(Artifact)
    _contract.setProvider(provider)

    let deployedContract = null
    try {
        deployedContract = await _contract.deployed()
    } catch{
        console.error("You are connected to the wrong network")
    }

    return deployedContract
}
export default loadContract