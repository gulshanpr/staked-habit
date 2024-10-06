import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const clientId = process.env.NEXT_PUBLIC_PROJECT_ID || '';

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia", // i will change it to an alchemy rpc
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3AuthOptions: Web3AuthOptions = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET,
  privateKeyProvider,
};

const web3auth = new Web3Auth(web3AuthOptions);

export default function Connect() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();

        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error("Error during Web3Auth initialization:", error);
      }
    };

    init();
  }, []);

  const handleLogin = async () => {
    try {
      await web3auth.connect();
      setProvider(web3auth.provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleUserInfo = async () => {
    if (provider) {
      try {
        const userInfo = await web3auth.getUserInfo();
        console.log(userInfo);
      } catch (error) {
        console.error("Error getting user info:", error);
      }
    }
  };

  const getIntoApp = async () => {
    try {
      if (web3auth.connected) {
        router.push("/home");
      }
    } catch (error) {
      console.error("Error getting into app:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleUserInfo}>user details</button>
      <button onClick={getIntoApp}>go to app</button>
    </div>
  );
}
