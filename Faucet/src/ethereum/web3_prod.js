
//!Third party packages
import Web3 from "web3";


//!Environment variables
import dotenv from 'dotenv';


//Configuration .env path
dotenv.config({path:"..//../.env"});


//?Web3
let web3;
if(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'){
    //We are in the browser and metamask in runnig
    console.log('Your application currently running on METAMASK')
    window.ethereum.request({method:'eth_requestAccounts'})//connect to metamask account which has to located in browser
    web3 = new Web3(window.ethereum)
}
else{
    //We are on the node server or not currently at browser and metamask not find
    console.log('Your application currently running on cloud node provide SEPOLIA')
    const provider = new Web3.providers.HttpProvider(
        process.env.SEPOLIA_NODE_URL_HTTPS
    )
    web3 = new Web3(provider)
}
export default web3