// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

//They cannot inherit from other smart contract
//They cannot inherit from other interface

//They cannot declare a constructor
//Thet cannot declare state variables
//All declared functions must be external
//Using for code standardization


interface IFaucet {
    function addFunds() external payable;
    function withdraw(uint withdrawAmount) external;
}