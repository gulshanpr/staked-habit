'use client'
import GridPattern from './../components/magicui/animated-grid-pattern';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import VelocityScroll from './../components/magicui/scroll-based-velocity';
import AnimatedShinyText from './../components/magicui/animated-shiny-text';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useToast, toast } from "@/components/ui/use-toast";


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

  const handleGoToApp = async (route: string) => {
    router.push(route)
  }

  const handleErrToast = (errMsg: string) => {
    toast({
      variant: "destructive",
      description: errMsg,
    })
  }

  const handleSucAndToHome = (msg: string) => {
    toast({
      description: msg,
    })

    router.push('/home');
  }

  useEffect(() => {
    
    async function checkConnectionAndRedirect(expectedChainId: string) {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

          if (accounts.length > 0) {
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });

            if (chainId === expectedChainId) {
              handleSucAndToHome("Your are connected");
            } else {
              handleErrToast("Switch to the correct chain");
            }
          }
        } catch (error) {
          handleErrToast('Error connecting to MetaMask' + error);
        }
      } else {
        handleErrToast("MetaMask is not installed");
      }
    }
    
    checkConnectionAndRedirect('0x7b');

  }, []);


  


  return (
    <div>
      <div>
        <GridPattern />
      </div>
      <div className="flex justify-end my-8 mx-10">

          {/* className="border border-black text-black text-xl bg-white px-4 py-2 rounded" */}
          
        <ConnectButton label='Sign in' chainStatus="name" accountStatus="avatar" />
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
