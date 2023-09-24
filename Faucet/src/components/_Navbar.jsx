//!Third Party Packages
import { useState,useEffect } from 'react';


//!Third Party Packages
import { useMoralis } from 'react-moralis'
import { ConnectButton,Logo,Button } from 'web3uikit';
import Moralis from 'moralis-v1';



//*Navbar
const Navbar = ({Component,pageProps}) => {
    const { logout, isAuthenticating,account} = useMoralis();

    return (
        <>
            <nav className="navbar-menu has-background-info-light p-3" role="navigation" aria-label="main navigation">
                <div className="navbar-start">
                    <a className="navbar-item" href="">
                        <Logo theme="icon" size="regular"/>
                    </a>
                </div>
                <div className="navbar-end">
                    <div>
                        <ConnectButton/>
                    </div>

                </div>  
            </nav>
        </>
    )
}
export default Navbar;