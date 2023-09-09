// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

//Abstract contract is we have define function but not added functionality inside this function,this function use from another contract class
//Abstract contain state variables
//Abstract contract inherit from other contract
//Using for code reusability

abstract contract Logger {
    function emitLog() public view virtual returns(bytes32);
}