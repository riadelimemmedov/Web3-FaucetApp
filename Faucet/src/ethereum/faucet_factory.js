//!Third party packages
import web3 from './web3_local.js'


//!ABI and ByteCode
import Faucet from './contracts/Faucet.json'


//?Smart contract instance
const faucet_instance = new web3.eth.Contract(
    Faucet.abi,
    Faucet.networks[5777].address
)
export default faucet_instance