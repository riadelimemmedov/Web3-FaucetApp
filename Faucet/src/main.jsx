//!React
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'


//!Third Party Packages
import { MoralisProvider } from "react-moralis"
import { Toaster } from "react-hot-toast";


//*React render parent componentn to site
ReactDOM.createRoot(document.getElementById('root')).render(
  <MoralisProvider initializeOnMount={false}>
    <Toaster/>
    <App />
  </MoralisProvider>
)
