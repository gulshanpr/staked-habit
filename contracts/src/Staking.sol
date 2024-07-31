// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Staking {

    // every time someone create habit a contract got deployed for that habit
    // its cheap to deploy contract on chain like fuse

    address owner;

    constructor (){
        owner = msg.sender;
    }

    event HabitCreated(uint index, address staker, uint amount);

    modifier onlyOwner() {
        require(owner == msg.sender, "only owner can call this");
        _;
    }

    struct StakingDetail {
        string title;
        address staker;
        uint amount;
        uint startDate;
        uint endDate;
        uint locsPD;
        uint commitsPD;
    }

    StakingDetail[] public stakingDetails;

    function stack(string calldata _title, uint _amount, uint _endDate, uint _locsPD, uint _commitsPD) public payable{
        require(_amount / _endDate == 20, "send exactly 20 tokens per day");
        require(_endDate > 21, "create atleast 21 days of habit");
        require(_commitsPD > 1, "atleast 1 commit per day");
        require(_locsPD > 10, "10 lines of code per day");

        uint arrayIndexCount;

        stakingDetails.push(StakingDetail({
            title: _title,
            staker: msg.sender,
            amount: msg.value,
            startDate: block.timestamp,
            endDate: _endDate,
            locsPD: _locsPD,
            commitsPD: _commitsPD
        }));

        arrayIndexCount += 1;

        // at the very end
        emit HabitCreated(arrayIndexCount, msg.sender, _amount);
    }
 
    // function unstack(uint _arrayIndex) external onlyOwner {

    //     require(condition);
    // }


    function isCompleted()public view {}
}