// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;


contract Faucet{
    //storage variables
    uint public funds = 1000; //only hold positive values
    int public counter = -10; // hold positive and negative values
}