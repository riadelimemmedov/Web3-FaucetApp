// //!Third part packages
// import HDWalletProvider from "@truffle/hdwallet-provider";
// import web3 from "./web3_local.js"
// import fs from 'fs'


// //!ABI and ByteCode
// import Faucet from './contracts/Faucet.json' assert {type:'json'}


// //!Environment variables
// import dotenv from 'dotenv';
// dotenv.config({path:"..//../.env"});




// //?deployContract
// const deployContract = async () => {
//     const accounts = await web3.eth.getAccounts()

//      //!deploy Factory
//     const factory = await new web3.eth.Contract(Faucet.abi)
//         .deploy({data:Faucet.bytecode})
//         .send({from:accounts[0],gas:'4712388'})//if increase number of block in node supervise gas fees value 
    
//     console.log('deployed campaign addrerss ', factory.options.address)

//     const filePath = "./data/FaucetLocal.json"
//     const contractData = {'abi':Faucet.abi,'network':'local'}
//     fs.writeFileSync(filePath,JSON.stringify())

// }
// deployContract() 