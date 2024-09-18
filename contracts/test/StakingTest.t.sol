// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import {Staking} from "../src/Staking.sol";

contract StakingTest is Test {
    Staking staking;
    address contractAddress;
    address staker = makeAddr("staker");
    uint256 amountToSend = 100 ether;

    function setUp() public {
        staking = new Staking();
    }

    function testContractDemo() public {
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

    // Randomly testing everything
    function testSendToken() public {
        vm.deal(staker, amountToSend);
        console.log("fake address that is of staker", staker);

        vm.recordLogs();
        console.log("1 msg.sender", msg.sender);

        // first transaction
        (bool success0, ) = address(staking).call{value: amountToSend}("");
        require(success0, "Failed to send Ether");

        // second transaction
        (bool success1, ) = address(staking).call{value: amountToSend}("");
        require(success1, "Failed to send Ether");

        console.log("2 msg.sender", msg.sender);

        staking.stake("test habit", 100e18, 36, 100, 10, 0, 1);

        Vm.Log[] memory logs = vm.getRecordedLogs();

        require(logs.length > 0, "No logs were recorded");
        console.log("length of the log == event emitted", logs.length);

        Vm.Log memory log = logs[0];

        (address senderAddr, uint256 amount, uint256 index, uint256 time) = abi.decode(log.data, (address, uint256, uint256, uint256));

        console.log("Event Sender: %s", senderAddr);
        console.log("Event Amount: %s", amount / 1 ether);
        console.log("Event Index: %s", index);
        console.log("Event Time: %s", time);

        assertEq(senderAddr, address(this));
        console.log("address of this contract", address(this));
        assertEq(amount, amountToSend);

        // test for event recording when creating a habit
        Vm.Log memory stakeLog = logs[2];

        (string memory title, uint256 locsPD, uint256 commitsPD, uint256 endDate, uint256 stakeIndex, address sender, uint256 stakeAmount) = abi.decode(stakeLog.data, (string, uint256, uint256, uint256, uint256, address, uint256));
        console.log("Event Title: %s", title);
        console.log("Event LocsPD: %s", locsPD);
        console.log("Event CommitsPD: %s", commitsPD);
        console.log("Event EndDate: %s", endDate);
        console.log("Event Index: %s", stakeIndex);
        console.log("Event Sender: %s", sender);
        console.log("Event Amount: %s", stakeAmount / 1 ether);

        // this the tokenTransfers mapping
        address add = address(this);
        Staking.TokenTransfer memory logging = staking.getTokenTransferDetails(add, 1);
        console.log("logging.sender", logging.sender);
        console.log("logging.amount", logging.amount / 1 ether);
        console.log("logging.time", logging.time);
        console.log("logging.isHabitCreatedForThis", logging.isHabitCreatedForThis);

        // this is the stakingDetails array
        Staking.StakingDetail memory stakingDetail = staking.getStakingDetails(0);
        console.log("stakingDetail.title", stakingDetail.title);
        console.log("stakingDetail.staker", stakingDetail.staker);
        console.log("stakingDetail.amount", stakingDetail.amount / 1 ether);
        console.log("stakingDetail.startDate", stakingDetail.startDate);
        console.log("stakingDetail.endDate", stakingDetail.endDate);
        console.log("stakingDetail.locsPD", stakingDetail.locsPD);
        console.log("stakingDetail.commitsPD", stakingDetail.commitsPD);
        console.log("stakingDetail.isHabitCompleted", stakingDetail.isHabitCompleted);

        console.log(staking.isHabitCompleted(0));
    }

    /*  Sequence by testing, that is how a user will interact with the contract
        1. user first send the token to the contract
        2. then based on the emmited event, user will create habit, internally it will check if contract
            has recieved the token or not, and check certain conditions.
        3. user can also call the isTokenSentForAHabit function to check if the token is sent or not.
        4. time to time user can call the isHabitCompleted function to check if the habit is completed or not.
        5. then user can unstake token after the tiime period is over for that habit.
    */
    function testContract() public {

        vm.recordLogs();
    
        vm.deal(staker, amountToSend);

        (bool success1, ) = address(staking).call{value: amountToSend}("");
        require(success1, "Failed to send Ether");

        console.log(staking.contractBalance() / 1 ether);


        Vm.Log[] memory logs = vm.getRecordedLogs();


        require(logs.length > 0, "No logs were recorded");
        console.log("length of the log == event emitted", logs.length);

        Vm.Log memory stakeLog = logs[0];

        (address senderAddr, uint256 amount, uint256 index, uint256 time) = abi.decode(stakeLog.data, (address, uint256, uint256, uint256));

        assertEq(amount, amountToSend);
        assertEq(senderAddr, address(this));
        assertEq(index, 0);
        assertEq(time, 1);
        assertEq(staking.isTokenSentForAHabit(senderAddr, amount, index, time), true);

        vm.recordLogs();

        staking.stake("testing user flow", amountToSend, 23, 100, 10, index, time);

        Vm.Log[] memory logs1 = vm.getRecordedLogs();
        
        Vm.Log memory stakeLog1 = logs1[0];

        (string memory title, uint256 locsPD, uint256 commitsPD, uint256 endDate, uint256 stakeIndex, address sender, uint256 stakeAmount) = abi.decode(stakeLog1.data, (string, uint256, uint256, uint256, uint256, address, uint256));

        console.log(staking.timeLeftForHabitCompletion(0));


    }

    // function testTokenTransfer() public {
        
    // }

    // function testStake() public {

    // }

    // function testAddress() public {
    //     console.log(address(this));
    //     console.log("address of contract", address(staking));
    // }

    function testUnstake() public {
    vm.recordLogs();
    
    // Give the staker some Ether
    vm.deal(staker, amountToSend);

    // Send Ether to the staking contract
    (bool success1, ) = address(staking).call{value: amountToSend}("");
    require(success1, "Failed to send Ether");

    console.log(staking.contractBalance() / 1 ether);

    // Record logs and verify the initial stake was successful
    Vm.Log[] memory logs = vm.getRecordedLogs();
    Vm.Log memory stakeLog = logs[0];

    (address senderAddr, uint256 amount, uint256 index, uint256 time) = abi.decode(stakeLog.data, (address, uint256, uint256, uint256));
    assertEq(amount, amountToSend);
    assertEq(senderAddr, address(this));
    assertEq(index, 0);
    assertEq(time, 1);
    assertEq(staking.isTokenSentForAHabit(senderAddr, amount, index, time), true);

    vm.recordLogs();

    // Simulate staking details
    staking.stake("testing", amount, 23, 111, 11, index, time);

    Vm.Log[] memory logs1 = vm.getRecordedLogs();
    Vm.Log memory stakeLog1 = logs1[0];

    (string memory title, uint256 locsPD, uint256 commitsPD, uint256 endDate, uint256 stakeIndex, address sender, uint256 stakeAmount) = abi.decode(stakeLog1.data, (string, uint256, uint256, uint256, uint256, address, uint256));

    assertEq(title, "testing"); 
    assertEq(locsPD, 111);
    assertEq(commitsPD, 11);
    assertEq(endDate, 23);
    assertEq(stakeIndex, 0);
    assertEq(sender, address(this));
    assertEq(stakeAmount, 100e18);
    
    console.log(staking.contractBalance() / 1 ether);
    console.log(staking.getOwner());
    console.log(msg.sender);
    console.log(address(this).balance);

    // Simulate marking the habit as completed before calling unStake
    // staking.markHabitAsCompleted(0); // Assuming you have a function to mark habit completion

    // Call unStake and verify it works
    // staking.unStake(0, stakeAmount);
}


}