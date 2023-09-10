
//!React
import { useEffect, useState } from 'react'

//!Custom css classes
import './App.css'


//!Third party packages
import "bulma/css/bulma.min.css"
import { useMoralis } from "react-moralis";
import toast from "react-hot-toast";


//!Custom components
import Navbar from './components/_Navbar'


//*App
function App() {

  const {isWeb3Enabled,account,login} = useMoralis();


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
  
  const throwError = (notification_message,notification_type) => {
    notification_type === 'success' ? toast.success(`${notification_message}`) : notification_type === 'error' ? toast.error(`${notification_message}`) : null;
  }


  return (
    <>
      <Navbar/>
      <div className="faucet-wrapper">
        <div className="faucet box p-6 is-rounded has-background-white-ter">
            <div className="balance-view is-size-2">
                Current Balance <strong>10</strong> ETH
            </div>
            <button  type="button" className="btn mr-2" onClick={(e)=>checkAuthentication('donateCoin')}>Donate</button>
            <button type="button" className="btn" onClick={(e)=>checkAuthentication('withdrawCoin')}>Withdraw</button>
        </div>
      </div>
    </>
  )
}

export default App
