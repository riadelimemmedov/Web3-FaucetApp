
//!React
import { useCallback, useEffect, useState } from 'react'

//!Custom css classes
import './App.css'


//!Third party packages
import "bulma/css/bulma.min.css"
import { useMoralis } from "react-moralis";
import toast from "react-hot-toast";
import detectEthereumProvider from '@metamask/detect-provider'


//!Custom components
import Navbar from './components/_Navbar'


//!Custom methods and functions,json and etc.
import faucet_instance from './ethereum/faucet_factory.js';
import Faucet from './ethereum/contracts/Faucet.json'
import web3 from '../src/ethereum/web3_local.js'



//*App
function App() {

  //State variables
  const [web3Api,setWeb3Api] = useState({provider:null,isProviderLoaded:false,web3:null,contract:null})
  const [balance,setBalance] = useState(null)
  const [disable_donate,setDisableDonate] = useState(false)
  const [reload,setReload] = useState(false)


  //Moralis
  const {isWeb3Enabled,account,login,isAuthenticated,isInitialized,logout,provider} = useMoralis();


  //reloadEffect
  const reloadEffect = useCallback(() => setReload(!reload),[reload])


  //setAccountListener
  useEffect(()=>{
      // provider.on('accountsChanged', _ => window.location.reload())
      // provider.on('chainChanged', _ => window.location.reload())

      const setAccountListener = async()=>{
        const provider = await detectEthereumProvider()
        provider._jsonRpcConnection.events.on('notification',(payload) => {
          const { method,params } = payload

          if(params.isUnlocked===false){
            throwNotification('Logged out successfully','error')
          }
          else if(params.isUnlocked===true){
            throwNotification('Logged in successfully','success')
          }
  
          // if(method === 'metamask_unlockStateChanged'){
          //   toast.success('Logged out successfully')
          // }
        })
      }
      setAccountListener()
  },[])


  //donateCoin
  const donateCoin = useCallback(async()=>{
    setDisableDonate(true)
    setTimeout(async() => {
      setDisableDonate(false)
      try{
        const {contract,web3} = web3Api
        await contract.methods.addFunds().send({
          from:account,
          value:web3.utils.toWei("1","ether")
        })
        throwNotification('Donate process finished succsessfully','success')
        reloadEffect()
      }
      catch(err){
        throwNotification(`${account.slice(0,6)} ... ${account.slice(account.length-4)}: Already donate coin`,'error')
      }
    }, 5000);
  },[web3Api,account,reload])



  //withdrawCoin
  const withdrawCoin = useCallback(async()=>{
      try{
        const {contract,web3} = web3Api
        const withdrawAmount = web3.utils.toWei('0.1','ether')
        await contract.methods.withdraw(withdrawAmount).send({
          from:account
        })
        throwNotification('Withdraw process finished succsessfully','success')
        reloadEffect()
      }
      catch(err){
        throwNotification('Please try again withdraw coin process','error')
      }
  },[web3Api,account,reload])


  
  //checkAuthentication
  const checkAuthentication = async(method_name)=>{
    if(account){
      method_name=='donateCoin' ? await donateCoin() : method_name=='withdrawCoin' ? await withdrawCoin() : null;
    }
    else{
      throwNotification('Please active wallet first.Click Connect Wallet button up right side','error')
    }
  }
  


  //throwNotification
  const throwNotification = (notification_message,notification_type) => {
    notification_type === 'success' ? toast.success(`${notification_message}`) : notification_type === 'error' ? toast.error(`${notification_message}`) : null;
  }



  //loadProvider
  useEffect(()=>{
    async function loadProvider(){
      const provider = await detectEthereumProvider()
      if(provider){
        setWeb3Api({
          provider:provider,
          isProviderLoaded:true,
          web3:web3,
          contract:faucet_instance
        })
      }
      else{
        throwNotification('Please install metamask','error')
      }
    }
    loadProvider()
  },[])



  //loadBalance
  useEffect(() => {
    const loadBalance = async () => {
      const {web3} = web3Api
      const balance = await web3.eth.getBalance(Faucet.networks[5777].address)
      setBalance(web3.utils.fromWei(balance, 'ether'))
    }
    web3Api.contract && loadBalance()
  },[web3Api,reload])



  //return jsx to client
  return (
    <>
      <Navbar/>
      <div className="faucet-wrapper">
        <div className="faucet box p-6 is-rounded has-background-white-ter">
            <span>
              <strong>Account: </strong>
            </span>
            <h1>
                {account > 0 ? account : 'Not account'}
            </h1>
            <div className="balance-view is-size-2 mb-4">
                Current Balance <strong>{balance}</strong> ETH
            </div>
            <button  type="button" className="button is-primary mr-2" onClick={(e)=>checkAuthentication('donateCoin')} disabled={disable_donate}>
              {disable_donate ? 'Donating...' : 'Donate 1ETH' }
            </button>
            <button type="button" className="button is-link btn " onClick={(e)=>checkAuthentication('withdrawCoin')}>Withdraw</button>
        </div>
      </div>
    </>
  )
}
export default App
