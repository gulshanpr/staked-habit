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


    function stack(string calldata _title, uint _amount, uint _endDate, uint _locsPD, uint _commitsPD) public payable {
        require(_amount / _endDate >= 20, "send exactly 20 tokens per day");
        require(_endDate >= 21, "create atleast 21 days of habit");
        require(_commitsPD >= 1, "atleast 1 commit per day");
        require(_locsPD >= 10, "10 lines of code per day");

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

        emit HabitCreated(arrayIndexCount, msg.sender, _amount);
    }

    function isCompleted(uint _habitIndex) public view returns (bool) {
        StakingDetail memory stakingDetail = stakingDetails[_habitIndex];
        uint endTimeStamp = stakingDetail.startDate + (stakingDetail.endDate * 1 days);

        return block.timestamp >= endTimeStamp;
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
