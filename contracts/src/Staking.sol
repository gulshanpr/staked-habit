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
        bool isHabitCreatedForThis;
    }

    address owner;
    uint private index;
    uint private arrayIndexCount;
    StakingDetail[] public stakingDetails;
    mapping(address => TokenTransfer[]) public tokenTransfers;

    event HabitCreated(string title, uint locPD, uint commitPD, uint endDate, uint index, address staker, uint amount);
    event Received(address sender, uint amount, uint _index, uint time);
    event Fallback(address sender, uint amount, uint time, uint _index, bytes data);
    event UnStake(address withdrawer, uint index, uint amount);

    modifier onlyOwner() {
        require(owner == msg.sender, "Only owner can call this");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function stake(
        string calldata _title, 
        uint _amount, 
        uint _endDate, 
        uint _locsPD, 
        uint _commitsPD,  
        uint _index, 
        uint _time
    ) public {
        uint amtInETH = _amount / 1 ether;

        require(isTokenSentForAHabit(msg.sender, _amount, _index, _time), "Error with staking");
        require(amtInETH / _endDate >= 2, "Send exactly 2 tokens per day"); // need to modify how much token one can stake
        require(_endDate >= 21, "Create at least 21 days of habit");
        require(_commitsPD >= 1, "At least 1 commit per day");
        require(_locsPD >= 10, "10 lines of code per day");

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

        TokenTransfer storage getDetails = tokenTransfers[msg.sender][_index];
        getDetails.isHabitCreatedForThis = true;
        
        // emit title and details
        emit HabitCreated(_title, _locsPD, _commitsPD, _endDate, arrayIndexCount - 1, msg.sender, _amount);
    }

    function unStake(uint _habitIndex, uint _amount) external onlyOwner returns (bool) {
        require(isHabitCompleted(_habitIndex), "Habit is not completed yet");
        StakingDetail storage getStakingDetails = stakingDetails[_habitIndex];
        require(_amount == getStakingDetails.amount, "Requested amount is not the same as habit's staked amount");
        require(_amount <= address(this).balance, "Insufficient balance in the contract");

        (bool callSuccess, ) = payable(msg.sender).call{value: _amount}("");
        require(callSuccess, "Call failed");

        getStakingDetails.isHabitCompleted = true;

        emit UnStake(msg.sender, _habitIndex, _amount);
        return true;
    }

    function isHabitCompleted(uint _habitIndex) public view returns (bool) {
        StakingDetail memory stakingDetail = stakingDetails[_habitIndex];
        uint256 endTimeStamp = stakingDetail.startDate + (stakingDetail.endDate * 1 days);
        return block.timestamp >= endTimeStamp;
    }

    function isTokenSentForAHabit(
        address _staker, 
        uint _amount, 
        uint _index, 
        uint _time
    ) public view returns (bool) {
        TokenTransfer memory getDetails = tokenTransfers[_staker][_index];

        require(_staker == getDetails.sender, "Call from the account you have staked");
        require(_amount == getDetails.amount, "Staked amount is not the same");
        require(_time == getDetails.time, "Timestamp is not matching");
        require(!getDetails.isHabitCreatedForThis, "Habit created for this already");

        return true;
    }

    receive() external payable {
        uint time = block.timestamp;

        TokenTransfer memory newTransfer = TokenTransfer({
            sender: msg.sender,
            amount: msg.value,
            time: time,
            isHabitCreatedForThis: false
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
            time: time,
            isHabitCreatedForThis: false
        });

        tokenTransfers[msg.sender].push(newTransfer);
        index += 1;

        emit Fallback(msg.sender, msg.value, time, index - 1, msg.data);
    }

    function contractBalance() public view returns (uint) {
        return address(this).balance;
    }
}
