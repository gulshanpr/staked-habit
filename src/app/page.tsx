'use client'
import GridPattern from './../components/magicui/animated-grid-pattern';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import VelocityScroll from './../components/magicui/scroll-based-velocity';
import AnimatedShinyText from './../components/magicui/animated-shiny-text';
import { useToast } from "@/components/ui/use-toast";
import { useAppKitAccount } from '@reown/appkit/react';


const textRevealProps = {
  text: "Habit Tracker on Chain with the benefits staking.",
}

const shinyTextProps = {
  children: "✨Habit Tracker for developer",
  shimmerWidth: 500,
}

export default function Home() {
  const [connectedToCorrectChain, setConnectedToCorrectChain] = useState(false);
  const router = useRouter();
  const { isConnected } = useAppKitAccount();
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


  useEffect(() => {
   
  }, []);

  return (
    <div>
      <div>
        <GridPattern />
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
      {isConnected && (
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
