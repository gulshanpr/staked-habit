// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract Staking {

    // major problem need to fix amount variable to store values in eth instead of wei

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
    // working as expected
    StakingDetail[] public stakingDetails;
    // this mapping working good as giving structs data
    mapping (address => TokenTransfer[]) public tokenTransfers;


    event HabitCreated(uint index, address staker, uint amount);
    event Received(address sender, uint amount, uint _index, uint time);
    event Fallback(address sender, uint amount, uint time, uint _index, bytes data);
    // event for unstack too.


    modifier onlyOwner() {
        require(owner == msg.sender, "only owner can call this");
        _;
    }


    constructor() {
        owner = msg.sender;
    }

    // no need to make this this function payable
    function stack(string calldata _title, uint _amount, uint _endDate, uint _locsPD, uint _commitsPD,  uint _index, uint _time) public  {
        require(isTokenSentForAHabit(msg.sender, _amount, _index, _time), "Error with staking");
        // require(_amount / _endDate >= 2, "send exactly 2 tokens per day");
        // also _amount is stored in wei so above require is always true so need to make it in native 
        require(_endDate >= 21, "create atleast 21 days of habit");
        require(_commitsPD >= 1, "atleast 1 commit per day");
        require(_locsPD >= 10, "10 lines of code per day");

        // one can stake for one habit multiple time so introduce a variable that check it some has
        // staked for the timestamp, index and amount
        // this can be done through db maintainig a record

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

        emit HabitCreated(arrayIndexCount - 1, msg.sender, _amount);
    }

    function unstack(uint _habitIndex, uint _amount) external onlyOwner {
        // _arrayIndex will come from database

        // require(condition);
        // make isHabitCompleted == true after withdrawal
        // this will be used to withdraw tokens

        //
        require(isCompletedForHabit(_habitIndex), "Habit is not completed yet");
        StakingDetail memory getStakingDetails = stakingDetails[_habitIndex];
        require(_amount == getStakingDetails.amount, "requested amount is not same as habit's staked amount");
        require(_amount <= address(this).balance, "Insufficient balance");


        // need to add a event
        (bool callSuccess, ) = payable(msg.sender).call{value: _amount}("");
        require(callSuccess, "Call Failed");
    }

    function isCompletedForHabit(uint _habitIndex) public view returns (bool) {
        StakingDetail memory stakingDetail = stakingDetails[_habitIndex];
        uint endTimeStamp = stakingDetail.startDate + (stakingDetail.endDate * 1 days);

        // check once if it is checking for correct timestamp
        return block.timestamp >= endTimeStamp;
    }

    
    // this will be invoked through db, do not call through person
    function isTokenSentForAHabit(address _staker, uint _amount, uint _index, uint _time) public view returns(bool) {
        // this msg.sender is working fine when called from stack() but
        // failing when calling alone so need to pass address
        TokenTransfer memory getDetails = tokenTransfers[_staker][_index];

        require(msg.sender == getDetails.sender, "call from the account you have staked");
        require(_amount == getDetails.amount, "staked amount is not same");
        require(_time == getDetails.time, "timestamp is not matching");

        return true;

    }



    // recieve is working fine and pushing data to tokenTransfer and also emitting event (done)
    // i need to store store this emitted event into database2
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


    // this will not be called as Recieved is being called but it should work fine
    fallback() external payable {
        uint time = block.timestamp;

        TokenTransfer memory newTransfer = TokenTransfer({
            sender: msg.sender,
            amount: msg.value,
            time: time
        });
        // introduce a new variable to track for a particular transaction(token sent)
        // is a habit created?

        tokenTransfers[msg.sender].push(newTransfer);

        index += 1;

        emit Fallback(msg.sender, msg.value, time, index - 1, msg.data);
    }

    // a function that will return for which habit haven't created
    // this can be done through db too, i will see which is more gas effiecent
    
    // working good
    function contractBalance() public view returns (uint) {
        return address(this).balance;
    }
}