'use client'
import GridPattern from './../components/magicui/animated-grid-pattern';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import VelocityScroll from './../components/magicui/scroll-based-velocity';
import AnimatedShinyText from './../components/magicui/animated-shiny-text';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useToast } from "@/components/ui/use-toast";

const walletConnetButtonProps = {
  buttonColor: "white", 
  buttonTextColor: "black",
  subscribeStatus: false,
  initialText: "Wallet Connect",
  changeText: "Connected"
}

const textRevealProps = {
  text: "Habit Tracker on Chain with the staking functionality with Fuse",
}

const shinyTextProps = {
  children: "✨Habit Tracker for developer",
  shimmerWidth: 500,
}

export default function Home() {
  const [connectedToCorrectChain, setConnectedToCorrectChain] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleGoToApp = () => {
    router.push('/home');
  }

  const handleErrToast = (errMsg: string) => {
    toast({
      variant: "destructive",
      description: errMsg,
    });
  }

  const handleSucToast = (msg: string) => {
    toast({
      description: msg,
    });
  }

  const checkConnectionAndRedirect = async (expectedChainId: string) => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (chainId === expectedChainId) {
            setConnectedToCorrectChain(true);
            handleSucToast("Signed in Go to app");
          } else {
            handleErrToast("Please switch to the correct chain");
          }
        }
      } catch (error) {
        handleErrToast('Error checking MetaMask connection: ' + error);
      }
    } else {
      handleErrToast("MetaMask is not installed");
    }
  }

  useEffect(() => {
    checkConnectionAndRedirect('0x7b');

    // Listen to chain and account changes
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        checkConnectionAndRedirect('0x7b');
      });
      
      window.ethereum.on('accountsChanged', (accounts: any) => {
        if (accounts.length === 0) {
          setConnectedToCorrectChain(false);
        } else {
          checkConnectionAndRedirect('0x7b');
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('chainChanged', checkConnectionAndRedirect);
        window.ethereum.removeListener('accountsChanged', checkConnectionAndRedirect);
      }
    };
  }, []);

  return (
    <div>
      <div>
        <GridPattern />
      </div>
      <div className="flex justify-end my-8 mx-10">
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
      {connectedToCorrectChain && (
        <div className="flex justify-center my-8 mx-10">
          <button
            className="border border-black text-black text-xl bg-white px-4 py-2 rounded"
            onClick={handleGoToApp}
          >
            Go to app &gt;
          </button>
        </div>
      )}
    </div>
  );
}
