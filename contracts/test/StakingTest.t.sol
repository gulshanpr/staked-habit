// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import {Staking} from "../src/Staking.sol";

contract StakingTest is Test {
    Staking staking;
    address contractAddress;
    address staker = makeAddr("staker");
    uint256 amountToSend = 50 ether;

    function setUp() public {
        staking = new Staking();
    }

    function testContract() public {
        console.log("hii gulshan");
        
    }

    function testContractAddress() public {
        contractAddress = address(this);
        console.log("staking contract address", address(staking));
        console.log("fake address", staker);
        assertEq(contractAddress, address(this));
    }

    // function testSendEther() public {
    //     Staking yourContract = new Staking();
    //     address payable contractAddress = payable(address(yourContract));
    
    //     vm.deal(address(this), 1 ether);
    //     contractAddress.transfer(1 ether);
    
    //     assertEq(contractAddress.balance, 1 ether);
    // }

    function testSendToken() public {
        vm.deal(staker, amountToSend);
        console.log("fake address that is of staker", staker);

        vm.recordLogs();
        console.log("1", msg.sender);

        (bool success, ) = address(staking).call{value: amountToSend}("");
        require(success, "Failed to send Ether");
        console.log("2", msg.sender);

        staking.stake("test habit", 50e18, 23, 100, 11, 0, 1);

        Vm.Log[] memory logs = vm.getRecordedLogs();

        require(logs.length > 0, "No logs were recorded");
        console.log("length of the log == event emitted", logs.length);

        Vm.Log memory log = logs[0];

        (address senderAddr, uint256 amount, uint256 index, uint256 time) = abi.decode(log.data, (address, uint256, uint256, uint256));

        console.log("Event Sender: %s", senderAddr);
        console.log("Event Amount: %s", amount);
        console.log("Event Index: %s", index);
        console.log("Event Time: %s", time);

        assertEq(senderAddr, address(this));
        console.log("address of this contract", address(this));
        assertEq(amount, amountToSend);

        Vm.Log memory stakeLog = logs[1];

        (string memory title, uint256 locsPD, uint256 commitsPD, uint256 endDate, uint256 stakeIndex, address sender, uint256 stakeAmount) = abi.decode(stakeLog.data, (string, uint256, uint256, uint256, uint256, address, uint256));

        console.log("Event Title: %s", title);
        console.log("Event LocsPD: %s", locsPD);
        console.log("Event CommitsPD: %s", commitsPD);
        console.log("Event EndDate: %s", endDate);
        console.log("Event Index: %s", stakeIndex);
        console.log("Event Sender: %s", sender);
        console.log("Event Amount: %s", stakeAmount);


    }

    function testStake() public {

    }

    // function testAddress() public {
    //     console.log(address(this));
    //     console.log("address of contract", address(staking));
    // }


}