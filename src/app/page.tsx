'use client'

import Image from "next/image";
import RetroGrid from './../components/magicui/retro-grid';
import GridPattern from './../components/magicui/animated-grid-pattern';
import { AnimatedSubscribeButton } from './../components/magicui/animated-subscribe-button';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { isAllowed, setAllowed, getUserInfo } from '@stellar/freighter-api';
import { Button } from "@/components/ui/button";
import VelocityScroll from './../components/magicui/scroll-based-velocity';
import AnimatedShinyText from './../components/magicui/animated-shiny-text';
import Component from "./home/components/chart";
import { MagicCard } from "@/components/magicui/magic-card";
import { MagicCardDemo } from "./card";
import { AlertDemo } from "./alert";
import { ToastDemo } from "./confetti";
import { DayPickerProvider } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import HomeProfile from "./profile/page";
// import { createHabit }from "./sm"
import Navbar from "./nav";


const walletConnetButtonProps = {
  buttonColor: "white", 
  buttonTextColor: "black",
  subscribeStatus: false,
  initialText: "Wallet Connect",
  changeText: "Connected"
}

const textRevealProps = {
  text: "Habit Tracker on Chain with the staking functionailty",
}

const shinyTextProps = {
  children: "✨ Introducing StakedHabit",
  shimmerWidth: 500,
}

export default function Home() {
  const router = useRouter();


  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const getPk = async (): Promise<string | null> => {
    try {
      const { publicKey } = await getUserInfo();
      return publicKey;
    } catch (error) {
      console.error('Error getting public key:', error);
      return null;
    }
  };

  const handleCreatePass = async () => {
    // const tempPassId = await createHabit(pubKey, title, description).then(
    //   (value) => value
    // );
    // console.log("templPassId: ", tempPassId);
  };

  const handleConnect = async () => {
    try {
      // Toggle allowed status
      await setAllowed();
      const pk = await getPk();
      if (pk) {
        setPublicKey(pk);
        // Navigate to /home on successful connection
        router.push('/home');
      }
    } catch (error) {
      console.error('Error connecting:', error);
    }
  };

  const handleGoToApp = async () => {
    router.push('/home')
  }


  useEffect(() => {
    const checkFreighterStatus = async () => {
      if (await isAllowed()) {
        const pk = await getPk();
        if (pk) {
          setPublicKey(pk);
        } else {
          setIsLocked(true);
        }
      }
    };

    checkFreighterStatus();
  }, []);

  // if (isLocked) {
  //   return <div>Freighter is locked.<br/>Sign in & refresh the page.</div>;
  // }



  return (
    <div>
      {/* <div>
        <Navbar/>
      </div> */}
      <div>
        <GridPattern />
      </div>
        <div className="flex justify-end my-8 mx-10">
          <button className="border border-black text-black text-xl bg-white px-4 py-2 rounded" onClick={handleConnect}>
            {publicKey ? "Disconnect" : "Connect"}
          </button>
          {/* <p>{publicKey}</p> */}
      </div>
      <div className=" flex justify-center text-xl">
        <AnimatedShinyText {...shinyTextProps} className="border font-dark rounded-full inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"/>
      </div>
      <div className="my-24 font-extrabold text-9xl">
        <VelocityScroll {...textRevealProps}/>
      </div>
      {/* <div>
        <a href="/">
        <img src="frontend/src/svgs/staked_habit_logo.png" alt="My Website Logo" className="logo" style={{ width: '500px', height: '500px' }} />
        </a>
      </div> */}

      {/* <div>
      <MagicCardDemo/>
      </div> */}
      {/* <div>
        <AlertDemo/>
      </div> */}
      {/* <div>
        <ToastDemo/>
      </div> */}
      {/* <div>
        <Calendar/>
      </div> */}
      {/* {publicKey && <HomeProfile data={publicKey} />} */}
      <div className="flex justify-center my-8 mx-10">
          <button className="border border-black text-black text-xl bg-white px-4 py-2 rounded" onClick={handleGoToApp}>
            Go to app >
          </button>
          {/* <p>{publicKey}</p> */}
      </div>
    </div>
  );
}

function async() {
  throw new Error("Function not implemented.");
}

