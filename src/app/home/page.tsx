'use client'
import * as React from "react"
import { Button } from "@/components/ui/button"
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const CardWithForm: React.FC = () => {

  const [activeIndex, setActiveIndex] = useState(0);
  const [stakedAmount, setStakedAmount] = useState('');
  const [linesOfCode, setLinesOfCode] = useState('');
  const [commits, setCommits] = useState('');
  const [days, setDays] = useState('');
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [error, setError] = useState('');

  const minLinesOfCode = 10;
  const minCommits = 1;
  const minDays = 21;

  React.useEffect(() => {
    const amount = parseInt(days) * 2;
    setCalculatedAmount(isNaN(amount) ? 0 : amount);
  }, [days]);

  const validateInput = (value: any, min: number, errorMessage: string) => {
    if (value === '' || parseInt(value) < min) {
      setError(errorMessage);
      return false;
    }
    setError('');
    return true;
  };

  const handleStake = () => {
    console.log('Staking:', stakedAmount);
  };

  const handleCreateHabit = () => {
    console.log('Creating habit with:', { linesOfCode, commits, days });
  };


  const carouselItems = [
    {
      title: "Habit Name",
      component: (
        <Input
          id="stakedAmount"
          type="string"
          placeholder="21 days of code 💪"
          value={stakedAmount}
          onChange={(e) => setStakedAmount(e.target.value)}
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
      title: "FUSE tokens",
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
