'use client'
import React, { use } from 'react'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
// import { BrowserProvider, Contract, formatUnits } from 'ethers'
const ethers = require('ethers');


const Test = () => {

    const { isConnected, address} = useAppKitAccount();
    const { walletProvider } = useAppKitProvider()

  async function onSignMessage() {
    if (!isConnected) throw Error('User disconnected')
    const provider = new ethers.BrowserProvider(walletProvider);
    const signer = await provider.getSigner()
    console.log(provider.getSigner())
  }
      
  return (
    <div>
        <button onClick={onSignMessage}>click me</button>
    </div>
  )
}

export default Test