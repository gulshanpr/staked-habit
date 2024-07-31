'use client'
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react";
import { format } from 'date-fns';
import { DockDemo } from "./components/dock";
import DatePickerWithRange from "./components/date"
import CircularPlusButton from "./components/button";
import CircularMinusButton from './components/minusButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Contract,
  SorobanRpc,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  nativeToScVal,
  Address,
  xdr,
} from "@stellar/stellar-sdk";
import { userSignTransaction } from "./Freight";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const DockProp = {
  children: "Gulshan Kumar Prasad",
  direction: "bottom"
}

const CardWithForm: React.FC = () => {

  let rpcUrl = "https://soroban-testnet.stellar.org";

  let contractAddress =
    "CDK5UPMDYHBRPG2D25SN7OER7FNVS5ANUMKUVBHDXP74BVVKOKZTTFCJ";

  // coverting Account Address to ScVal form
  const accountToScVal = (account: any) => new Address(account).toScVal();

  // coverting String to ScVal form
  const stringToScValString = (value: any) => {
    return nativeToScVal(value);
  };

  const numberToU32 = (value: any) => {
    return nativeToScVal(value, { type: "u32" });
  };

  let params = {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  };

  async function contractInt(caller: string, functName: string, values: xdr.ScVal | null) {
    const provider = new SorobanRpc.Server(rpcUrl, { allowHttp: true });
    const sourceAccount = await provider.getAccount(caller);
    const contract = new Contract(contractAddress);
    let buildTx;

    if (values == null) {
      buildTx = new TransactionBuilder(sourceAccount, params)
        .addOperation(contract.call(functName))
        .setTimeout(30)
        .build();
    } else if (Array.isArray(values)) {
      buildTx = new TransactionBuilder(sourceAccount, params)
        .addOperation(contract.call(functName, ...values))
        .setTimeout(30)
        .build();
    } else {
      buildTx = new TransactionBuilder(sourceAccount, params)
        .addOperation(contract.call(functName, values))
        .setTimeout(30)
        .build();
    }

    let _buildTx = await provider.prepareTransaction(buildTx);

    let prepareTx = _buildTx.toXDR(); // pre-encoding (converting it to XDR format)

    let signedTx = await userSignTransaction(prepareTx, "TESTNET", caller);

    let tx = TransactionBuilder.fromXDR(signedTx, Networks.TESTNET);

    try {
      let sendTx = await provider.sendTransaction(tx).catch(function (err) {
        console.error("Catch-1", err);
        return err;
      });
      if (sendTx.errorResult) {
        throw new Error("Unable to submit transaction");
      }
      if (sendTx.status === "PENDING") {
        let txResponse = await provider.getTransaction(sendTx.hash);
        //   we will continously checking the transaction status until it gets successfull added to the blockchain ledger or it gets rejected
        while (txResponse.status === "NOT_FOUND") {
          txResponse = await provider.getTransaction(sendTx.hash);
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        if (txResponse.status === "SUCCESS") {
          let result = txResponse.returnValue;
          return result;
        }
      }
    } catch (err) {
      console.log("Catch-2", err);
      return;
    }
  }

  const handleSubmit = () => {


    async function expirePass(caller: string, pass_id: any) {
      let values = numberToU32(pass_id);

      try {
        let ans = await contractInt(caller, "view_habit", values);
        console.log(ans);
      } catch (error) {
        console.log("failed");
      }
    }

    expirePass("GASZAKYGUWA4KNM4CJBWENZUYG4BWSDXWY5Q4XYR5HGLMMBXUYVVBG2K", 1);


  }

  const router = useRouter();

  const [incLoc, setIncLoc] = useState(0); // State for lines of code increment
  const [incCommit, setIncCommit] = useState(0); // State for commits increment

  const handleClickLocIncrement = () => {
    setIncLoc(incLoc + 10);
  };

  const handleClickLocDecrement = () => {
    if (incLoc > 0) {
      setIncLoc(incLoc - 10);
    }
  };

  const handleClickCommitIncrement = () => {
    setIncCommit(incCommit + 1);
  };

  const handleClickCommitDecrement = () => {
    if (incCommit > 0) {
      setIncCommit(incCommit - 1);
    }
  };

  const handleMinusClick = () => {
    console.log("hdafod");
  }

  const handleClickHome = () => {
    router.push('/home')
  }

  const handleClickLeaderBoard = () => {
    router.push('/leaderboard')
  }

  const handleClickProfile = () => {
    router.push('/profile')
  }


  

  return (
    <div>
    
    <div className="mx-10 my-5 flex items-end justify-end">
        <nav className="flex items-end flex space-x-4">
          <a href="/home" className="text-black" onClick={handleClickHome}>
            Home
          </a>
          <a href="/leaderboard" className="text-black" onClick={handleClickLeaderBoard}>
            Leaderboard
          </a>
          <a href="/profile" className="text-black" onClick={handleClickProfile}>
            Profile
          </a>
        </nav>
      </div>

    <div className="my-32 flex flex-col items-center gap-4">
     

      <div className="grid w-full max-w-sm items-center gap-1.5 border rounded-md">
        <textarea placeholder="Habit title" />
      </div>
      <div className="flex space-x-4">
      <div className="flex flex-col gap-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Lines of Code</CardTitle>
          <CardDescription>Set your daily activity goal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="p-4">
              <CircularMinusButton onClick={handleClickLocDecrement} />
            </div>
            <div>
              <h1></h1>
              <h2 className="-mx-1 text-3xl font-bold">{incLoc}</h2>
              <h2 className="-mx-1 ">loc/day</h2>
            </div>
            <div className="p-4">
              <CircularPlusButton onClick={handleClickLocIncrement} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Commits per Day</CardTitle>
          <CardDescription>Set your daily activity goal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="p-4">
              <CircularMinusButton onClick={handleClickCommitDecrement} />
            </div>
            <div>
              <h1></h1>
              <h2 className="mx-10 text-3xl font-bold">{incCommit}</h2>
              <h2 className="-mx-1 ">Commits/day</h2>
            </div>
            <div className="p-4">
              <CircularPlusButton onClick={handleClickCommitIncrement} />
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
      </div>

      <div>
        <DatePickerWithRange/>
      </div>
      <div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input id="picture" type="number" placeholder="Staked amount" />
        </div>
        <div>
          {/* <DockDemo /> */}
        </div>
        <div className="my-4 bg-white grid w-full max-w-sm items-center gap-1.5">
          <Button onClick={handleSubmit}>Create Habit</Button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CardWithForm;
