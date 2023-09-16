//!Third part packages
import HDWalletProvider from "@truffle/hdwallet-provider";
import web3 from "./web3_prod.js"


//!ABI and ByteCode
import Faucet from './contracts/Faucet.json' assert {type:'json'}


//!Environment variables
import dotenv from 'dotenv';
dotenv.config({path:"..//../.env"});



//?deployContract
const deployContract = async () => {
    const accounts = await web3.eth.getAccounts()
    
}
deployContract() 