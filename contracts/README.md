## Staked Habit on (arbitrum-sepolia)
✅  [Success]Hash: 0x431a89c0b5e519eda983b9253d2a68c054d996ea6ee5e50076ab5437b7a01222
Contract Address: 0x592B2C58C629FCeb06DA618bEB834eADCe720392
Block: 69148934
Paid: 0.00040347 ETH (4034700 gas * 0.1 gwei)

✅ Sequence #1 on arbitrum-sepolia | Total Paid: 0.00040347 ETH (4034700 gas * avg 0.1 gwei)

---

### contract is deployed, tested and verified.

some contract drafts are in [Drafts-Contract](./drafts/Staking.sol)

---
---
---
---

### To-dos (while developing the contract)

  - stack (done)
  - unstack how much they have staked for that habit (done)
  - isCompleted (done)
  - isCompleted as modifier (no need)
  - fallback and recieve (done)

issue to be addressed rn
  - staking function's amount parameter is not storing msg.value hence, i am not able to send token to contract (solved)
  - deploy contract for the first time when user onboard, then create habit within that contract (solved)


---
- reward system? (can be dealt with another contract or from frontend)
- what is user is not able to keep up there steak?
  - rn only locking funds for specified time and relasing, not thinging of steak a such.
- write tests


---
non-sm tasks
- create db to call and store emitted events.

---

[all to-dos are completed] ✅✅



