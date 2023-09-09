// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;


import "./Owned.sol";
import "./Logger.sol";
import "./IFaucet.sol";

// contract Faucet{

//     address[] public funders;

//     //The receive function is a special function in Solidity that is automatically invoked when a contract receives Ether without any specific function call
//     receive() external payable{}

//     function addFunds() external payable{
//         funders.push(msg.sender);
//     }

//     function getAllFunders() public view returns(address[] memory){
//         return funders;
//     }

//     function getFundersAtIndex(uint8 index) external view returns(address){
//         address[] memory _funders = getAllFunders();
//         return _funders[index];
//     }

// }

//  instance.addFunds({value:"500000000000000",from:accounts[4]})



contract Faucet is Owned,Logger,IFaucet{
    uint public numberOfFunders;
    mapping(address => bool) private isFundersExist;
    mapping(uint => address) private lutFunders;

    receive() external payable{}

    function addFunds() external override payable{
        require(!isFundersExist[msg.sender],'Funders already exists');
        isFundersExist[msg.sender] = true;
        lutFunders[numberOfFunders] = msg.sender;
        numberOfFunders++;
    }

    function getFunderAtIndex(uint lutFundersIndex) external view returns(address){
        return lutFunders[lutFundersIndex];
    }

    function getAllFunders() public view returns(address[] memory){
        address [] memory _funders = new address[](numberOfFunders);

        for(uint i=0;i<numberOfFunders;i++){
            _funders[i] = lutFunders[i];
        }
        return _funders;
    }


    function withdraw(uint withdrawAmount) external override limitWithdraw(withdrawAmount){
        payable(msg.sender).transfer(withdrawAmount);
    }


    function test1() public onlyOwner view returns(string memory){
        return "Test1";
    }


    function emitLog() public view override virtual returns(bytes32){
        return "Hello world";
    }


    modifier limitWithdraw(uint withdrawAmount){
        require(withdrawAmount <= 5000000000000000000,'Cannot withdraw more than 5 ether');
        _;
    }

}

// const instance = await Faucet.deployed()
// instance.addFunds({from:accounts[8],value:"2000000000000000000"})
// instance.addFunds({from:accounts[2],value:"1000000000000000000"})
//instance.getAllFunders()
// instance.withdraw("8000000000000000000",{from:accounts[1]})
