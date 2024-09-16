// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import { Staking } from "../src/Staking.sol";

contract StakingDeploy is Script {
    function run() external {
        vm.startBroadcast();
        
        Staking staking = new Staking();

        vm.stopBroadcast();
    }
}