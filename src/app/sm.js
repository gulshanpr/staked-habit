import {
  Contract,
  SorobanRpc,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  nativeToScVal,
  Address,
} from "@stellar/stellar-sdk";
import { userSignTransaction } from "./Freighter";

// Update the RPC URL and contract address
const rpcUrl = "https://soroban-testnet.stellar.org";
const contractAddress = "CDTBHXNQIPL4NZJ2RWRJ4XQQBPBIJEIS4TRRMC7N3IRTXIL7QX3VFWA3";

// Convert to ScVal functions
const accountToScVal = (account) => new Address(account).toScVal();
const stringToScValString = (value) => nativeToScVal(value);
const numberToU64 = (value) => nativeToScVal(value, { type: "u64" });
const numberToU32 = (value) => nativeToScVal(value, { type: "u32" });

const params = {
  fee: BASE_FEE,
  networkPassphrase: Networks.TESTNET,
};

async function contractInt(caller, functName, values) {
  const provider = new SorobanRpc.Server(rpcUrl, { allowHttp: true });
  const sourceAccount = await provider.getAccount(caller);
  const contract = new Contract(contractAddress);

  const buildTx = new TransactionBuilder(sourceAccount, params)
    .addOperation(contract.call(functName, ...values))
    .setTimeout(30)
    .build();

  const _buildTx = await provider.prepareTransaction(buildTx);
  const prepareTx = _buildTx.toXDR();

  const signedTx = await userSignTransaction(prepareTx, "TESTNET", caller);
  const tx = TransactionBuilder.fromXDR(signedTx, Networks.TESTNET);

  try {
    const sendTx = await provider.sendTransaction(tx).catch((err) => {
      console.error("Catch-1", err);
      return err;
    });

    if (sendTx.errorResult) {
      throw new Error("Unable to submit transaction");
    }

    if (sendTx.status === "PENDING") {
      let txResponse = await provider.getTransaction(sendTx.hash);
      while (txResponse.status === "NOT_FOUND") {
        txResponse = await provider.getTransaction(sendTx.hash);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      if (txResponse.status === "SUCCESS") {
        const result = txResponse.returnValue;
        return result;
      }
    }
  } catch (err) {
    console.log("Catch-2", err);
    return;
  }
}

// Function to call the create_habit function
async function createHabit(
  caller,
  title,
  stakedAmount,
  startTimestamp,
  endTimestamp,
  commit,
  loc
) {
  const titleScVal = stringToScValString(title);
  const stakedAmountScVal = numberToU32(stakedAmount);
  const startTimestampScVal = numberToU64(startTimestamp);
  const endTimestampScVal = numberToU64(endTimestamp);
  const commitScVal = numberToU32(commit);
  const locScVal = numberToU32(loc);
  const values = [
    titleScVal,
    stakedAmountScVal,
    startTimestampScVal,
    endTimestampScVal,
    commitScVal,
    locScVal,
  ];

  try {
    const habitId = await contractInt(caller, "create_habit", values);
    let resolvedHabitId = Number(habitId?._value?._value);
    console.log(resolvedHabitId);
    return resolvedHabitId;
  } catch (error) {
    console.log("Habit not created. Check the parameters and try again.");
  }
}

// Call the createHabit function
const caller = "YOUR_CALLER_ADDRESS";
const title = "Example Habit";
const stakedAmount = 100;
const startTimestamp = 1625097600;
const endTimestamp = 1627689600;
const commit = 10;
const loc = 500;

createHabit(caller, title, stakedAmount, startTimestamp, endTimestamp, commit, loc)
  .then((habitId) => {
    console.log(`Habit created with ID: ${habitId}`);
  })
  .catch((error) => {
    console.error(`Error creating habit: ${error}`);
  });

module.exports = {
  createHabit,
};
