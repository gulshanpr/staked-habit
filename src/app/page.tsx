'use client'
import GridPattern from './../components/magicui/animated-grid-pattern';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import VelocityScroll from './../components/magicui/scroll-based-velocity';
import AnimatedShinyText from './../components/magicui/animated-shiny-text';
import { ConnectButton } from '@rainbow-me/rainbowkit';


const walletConnetButtonProps = {
  buttonColor: "white", 
  buttonTextColor: "black",
  subscribeStatus: false,
  initialText: "Wallet Connect",
  changeText: "Connected"
}

const textRevealProps = {
  text: "Habit Tracker on Chain with the staking functionailty with Fuse",
}

const shinyTextProps = {
  children: "✨Habit Tracker for developer",
  shimmerWidth: 500,
}

export default function Home() {
  const router = useRouter();

  const handleGoToApp = async () => {
    router.push('/home')
  }


  useEffect(() => {
    
  }, []);

  


  return (
    <div>
      <div>
        <GridPattern />
      </div>
      <div className="flex justify-end my-8 mx-10">

          {/* className="border border-black text-black text-xl bg-white px-4 py-2 rounded" */}
          
        <ConnectButton />
      </div>
      <div className="flex justify-center text-xl">
        <AnimatedShinyText
          {...shinyTextProps}
          className="border font-dark rounded-full inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"
        />
      </div>
      <div className="my-24 font-extrabold text-9xl">
        <VelocityScroll {...textRevealProps} />
      </div>
      <div className="flex justify-center my-8 mx-10">
        {/* <button
          className="border border-black text-black text-xl bg-white px-4 py-2 rounded"
          onClick={handleGoToApp}
        >
          Go to app >
        </button> */}
      </div>
    </div>
  );
  
}
