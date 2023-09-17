
//!React
import { useEffect, useState } from 'react'

//!Custom css classes
import './App.css'


//!Third party packages
import "bulma/css/bulma.min.css"
import { useMoralis } from "react-moralis";
import toast from "react-hot-toast";
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider'


//!Custom components
import Navbar from './components/_Navbar'
import  loadContract  from './ethereum/utils/load-contract';


//!Custom methods and functions




//*App
function App() {

  const [web3Api,setWeb3Api] = useState({
    provider:null,
    isProviderLoaded:false,
    web3:null,
    contract:null
  })

  const {isWeb3Enabled,account,login,isAuthenticated,isInitialized,logout,provider} = useMoralis();

  
  //setAccountListener
  const setAccountListener = (provider) => {
    provider.on('accountsChanged', _ => window.location.reload())
    provider.on('chainChanged', _ => window.location.reload())
  }

  //donateCoin
  const donateCoin = async()=>{
      throwError('Donate process finished succsessfully','success')
  }


  //withdrawCoin
  const withdrawCoin = async()=>{
      throwError('Please try again withdraw coin process','error')
  }


  //checkAuthentication
  const checkAuthentication = async(method_name)=>{
    if(account){
      method_name=='donateCoin' ? await donateCoin() : method_name=='withdrawCoin' ? await withdrawCoin() : null;
    }
    else{
      throwError('Please active wallet first.Click Connect Wallet button up right side','error')
    }
  }
  

  //throwError
  const throwError = (notification_message,notification_type) => {
    notification_type === 'success' ? toast.success(`${notification_message}`) : notification_type === 'error' ? toast.error(`${notification_message}`) : null;
  }



  //useEffect
  useEffect(()=>{
    async function loadProvider(){
      const provider = await detectEthereumProvider()
      console.log('Provider is ', provider);
      if(provider){
        // setAccountListener(provider)
        // const contract = await loadContract("Faucet", provider)
        console.log('Zortt ', contract);
        setWeb3Api({
          provider:provider,
          isProviderLoaded:true,
          web3:new Web3(provider),
          contract:contract
        })
      }
      else{
        throwError('Please install metamask','error')
      }
    }
    loadProvider()
  },[])



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
                Current Balance <strong>10</strong> ETH
            </div>
            <button  type="button" className="button is-primary mr-2" onClick={(e)=>checkAuthentication('donateCoin')}>Donate</button>
            <button type="button" className="button is-link btn " onClick={(e)=>checkAuthentication('withdrawCoin')}>Withdraw</button>
        </div>
      </div>
    </>
  )
}

export default App
