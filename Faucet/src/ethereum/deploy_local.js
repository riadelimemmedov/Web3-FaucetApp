//!Third part packages
const {web3} = require("./web3_local.js")
const fs = require("fs")


//!ABI and ByteCode
const Faucet = require('./contracts/Faucet.json')
// import Faucet from './contracts/Faucet.json' assert {type:'json'}


//!Environment variables
const dotenv = require('dotenv')
dotenv.config({path:"..//../.env"});



//?deployContract
const deployContract = async () => {
    const accounts = await web3.eth.getAccounts()

    const factory = await new web3.eth.Contract(Faucet.abi)
        .deploy({data:Faucet.bytecode})
        .send({from:accounts[0],gas:'4712388'})//if increase number of block in node supervise gas fees value 
    
    const filePath = "./data/FaucetLocal.json"
    const contractData = {'abi':Faucet.abi,'network':'local','address':Faucet.networks[5777].address}
    fs.writeFileSync(filePath,JSON.stringify(contractData))
    return {factory}
}
module.exports = {deployContract}