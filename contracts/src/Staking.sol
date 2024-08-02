// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Staking {

    struct StakingDetail {
        string title;
        address staker;
        uint amount;
        uint startDate;
        uint endDate;
        uint locsPD;
        uint commitsPD;
        bool isHabitCompleted;
    }

    struct TokenTransfer {
        address sender;
        uint amount;
        uint time;
    }


    address owner;
    uint private index;
    StakingDetail[] public stakingDetails;
    mapping (address => TokenTransfer[]) public tokenTransfers;


    event HabitCreated(uint index, address staker, uint amount);
    event Received(address sender, uint amount, uint _index, uint time);
    event Fallback(address sender, uint amount, uint time, uint _index, bytes data);


    modifier onlyOwner() {
        require(owner == msg.sender, "only owner can call this");
        _;
    }


    constructor() {
        owner = msg.sender;
    }


    function stack(string calldata _title, uint _amount, uint _endDate, uint _locsPD, uint _commitsPD,  uint _index, uint _time) public payable {
        require(isTokenSentForAHabit(_amount, _index, _time), "Error with stakig");
        require(_amount / _endDate >= 2, "send exactly 2 tokens per day");
        require(_endDate >= 21, "create atleast 21 days of habit");
        require(_commitsPD >= 1, "atleast 1 commit per day");
        require(_locsPD >= 10, "10 lines of code per day");

        uint arrayIndexCount;

        stakingDetails.push(StakingDetail({
            title: _title,
            staker: msg.sender,
            amount: _amount,
            startDate: block.timestamp,
            endDate: _endDate,
            locsPD: _locsPD,
            commitsPD: _commitsPD,
            isHabitCompleted: false
        }));

        arrayIndexCount += 1;

        emit HabitCreated(arrayIndexCount, msg.sender, _amount);
    }

    function unstack(uint _habitIndex, uint _amount) external onlyOwner {
        // _arrayIndex will come from database

        // require(condition);
        // make isHabitCompleted == true after withdrawal
        // this will be use to withdraw tokens
        require(isCompletedForHabit(_habitIndex), "Habit is not completed yet");
        StakingDetail memory getStakingDetails = stakingDetails[_habitIndex];
        require(_amount == getStakingDetails.amount, "requested amount is not same as habit's staked amount");
        require(_amount <= address(this).balance, "Insufficient balance");



        (bool callSuccess, ) = payable(msg.sender).call{value: _amount}("");
        require(callSuccess, "Call Failed");
    }

    function isCompletedForHabit(uint _habitIndex) public view returns (bool) {
        StakingDetail memory stakingDetail = stakingDetails[_habitIndex];
        uint endTimeStamp = stakingDetail.startDate + (stakingDetail.endDate * 1 days);

        return block.timestamp >= endTimeStamp;
    }

    function isTokenSentForAHabit(uint _amount, uint _index, uint _time) public view returns(bool) {
        // this will be invoked through db, do not call through person
        TokenTransfer memory getDetails = tokenTransfers[msg.sender][_index];

        require(msg.sender == getDetails.sender, "call from the account you have staked");
        require(_amount == getDetails.amount, "staked amount is not same");
        require(_time == getDetails.time, "timestamp is not matching");

        return true;

    }


    receive() external payable {
        uint time = block.timestamp;

        TokenTransfer memory newTransfer = TokenTransfer({
            sender: msg.sender,
            amount: msg.value,
            time: time
        });

        tokenTransfers[msg.sender].push(newTransfer);

        index += 1;

        emit Received(msg.sender, msg.value, index - 1, time);
    }


    fallback() external payable {
        uint time = block.timestamp;

        TokenTransfer memory newTransfer = TokenTransfer({
            sender: msg.sender,
            amount: msg.value,
            time: time
        });

        tokenTransfers[msg.sender].push(newTransfer);

        index += 1;

        emit Fallback(msg.sender, msg.value, time, index - 1, msg.data);
    }


    function contractBalance() public view returns (uint) {
        return address(this).balance;
    }
}
