'use client'
import * as React from "react"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import './../globals.css';
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const ethers = require('ethers');

const CardWithForm: React.FC = () => {

  const [activeIndex, setActiveIndex] = useState(0);
  const [stakedAmount, setStakedAmount] = useState<number>(0);
  const [linesOfCode, setLinesOfCode] = useState('');
  const [commits, setCommits] = useState('');
  const [days, setDays] = useState('');
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [error, setError] = useState('');

  const minLinesOfCode = 10;
  const minCommits = 1;
  const minDays = 21;

  React.useEffect(() => {
    const amount = parseFloat(days) * 0.0001;
    const precision = amount.toFixed(4);
    setCalculatedAmount(isNaN(parseFloat(precision)) ? 0 : parseFloat(precision));
    setStakedAmount(isNaN(parseFloat(precision)) ? 0 : parseFloat(precision));
  }, [days]);

  const validateInput = (value: any, min: number, errorMessage: string) => {
    if (value === '' || parseInt(value) < min) {
      setError(errorMessage);
      return false;
    }
    setError('');
    return true;
  };

  const handleStake = async () => {
    try {
      console.log('Staking:', stakedAmount);

      const provider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = await provider.getSigner();

      const userAddress = await signer.getAddress();
      console.log("Connected account:", userAddress);

      const recipientAddress = "0x3b8ae4e1Bf9BAe7E811A883Bdec4bE0F79E70242";

      const amountInEther = '0.0001';
      const amountInWei = ethers.parseEther(amountInEther);

      console.log("Fetching gas price data...");
      const gasPrice = (await provider.getFeeData()).gasPrice; // Fetch the current gas price

      console.log("Gas Price:", gasPrice.toString());

      const tx = {
        to: recipientAddress,
        value: amountInWei,
        gasLimit: 21000, // Standard gas limit for a simple ETH transfer
        gasPrice: gasPrice, // Legacy transaction using gasPrice
      };

      console.log("Sending transaction...");
      const transactionResponse = await signer.sendTransaction(tx);

      console.log("Transaction sent:", transactionResponse.hash);

      // await transactionResponse.wait();

      console.log("Transaction confirmed!");
    } catch (error) {
      console.error('Failed to send transaction:', error);
    }

  };


  const handleStakeTest = async () => {
    try {
      const response = await fetch('/api/details');
      if (!response.ok) {
        throw new Error('Network response was not ok from page');
      }

      const product = await response.json();

      console.log(product);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  };

  const handleCreateHabit = async () => {
    // try {
    //   const productData = {
    //     address: 'New Product',
    //     index: 54643243,
    //     amount: "adsfa",
    //     timeStamp: "dfads"
    //   };

    //   const response = await fetch('/api/details', {
    //     method: 'POST',
    //     body: JSON.stringify(productData),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });

    //   const newProduct = await response.json();

    //   if (!response.ok) {
    //     throw new Error('Network response was not ok from client', newProduct.message);
    //   }

    // } catch (error) {
    //   console.error('Failed to create product:', error);
    // }

    // console.log(stakedAmount, linesOfCode, commits, calculatedAmount, days);

    // const provider = new ethers.BrowserProvider(window.ethereum);

    // await provider.send("eth_requestAccounts", []);

    // const signer = provider.getSigner();

    // const recipientAddress = "0x...";
    // const amountInEther = 1;

    // const amountInWei = ethers.utils.parseEther(amountInEther.toString());

    // const tx = await signer.sendTransaction({
    //   to: recipientAddress,
    //   value: amountInWei,
    //   gasLimit: 21000,
    //   gasPrice: await provider.getGasPrice(),
    // });

    // console.log("Transaction sent:", tx.hash);


  }

  const carouselItems = [
    {
      title: "Habit Name",
      component: (
        <Input
          id="stakedAmount"
          type="string"
          placeholder="21 days of code 💪"
          value={stakedAmount}
          onChange={(e) => setStakedAmount(Number(e.target.value))}
          required
        />
      )
    },
    {
      title: "Lines of Code",
      component: (
        <Input
          id="linesOfCode"
          type="number"
          placeholder={`Minimum ${minLinesOfCode} lines`}
          value={linesOfCode}
          onChange={(e) => {
            setLinesOfCode(e.target.value);
            validateInput(e.target.value, minLinesOfCode, `Minimum ${minLinesOfCode} lines required`);
          }}
        />
      ),
      title1: "Number of Commits",
      component1: (
        <Input
          id="commits"
          type="number"
          placeholder={`Minimum ${minCommits} commits`}
          value={commits}
          onChange={(e) => {
            setCommits(e.target.value);
            validateInput(e.target.value, minCommits, `Minimum ${minCommits} commits required`);
          }}
        />
      )
    },
    {
      title: "Number of Days",
      component: (
        <Input
          id="days"
          type="number"
          placeholder={`Minimum ${minDays} days`}
          value={days}
          onChange={(e) => {
            setDays(e.target.value);
            validateInput(e.target.value, minDays, `Minimum ${minDays} days required`);
          }}
        />
      )
    },
    {
      title: "Stake ETH on arbitrum",
      component: (
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold mb-4">{calculatedAmount}</div>
          <div className="flex space-x-2">
            <Button onClick={handleStake}>Stake</Button>
            <Button onClick={handleCreateHabit}>Create Habit</Button>
          </div>
        </div>
      )
    }
  ];


  return (
    <div>
      <div className="mx-10 my-5 flex items-end justify-end">
        <nav className="flex items-end space-x-4">
          <a href="/home" className="text-black">
            Home
          </a>
          <a href="/leaderboard" className="text-black">
            Leaderboard
          </a>
          <a href="/profile" className="text-black">
            Profile
          </a>
        </nav>
      </div>
      <div className="mt-36 ml-9 flex flex-col items-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
            <h3 className="mb-4 text-lg font-semibold">{carouselItems[activeIndex].title}</h3>
            {carouselItems[activeIndex].component}
            <h3 className="mt-3 mb-4 text-lg font-semibold">{carouselItems[activeIndex].title1}</h3>
            {carouselItems[activeIndex].component1}
          </CardContent>
        </Card>

        <div className="mt-4 flex space-x-2">
          {carouselItems.map((_, index) => (
            <Button
              key={index}
              variant={activeIndex === index ? "default" : "outline"}
              onClick={() => setActiveIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>

    </div>
  );

}

export default CardWithForm;
