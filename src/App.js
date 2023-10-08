import "./App.css";
import UserProfile from "./userProfile.js/userProfile";
import Header from "./header/header";
import { useState } from "react";
import Connex from "@vechain/connex";
import * as thor from '@vechain/web3-providers-connex'
import { ethers } from 'ethers'
//import ABI
import Ecotraveler from './artifacts/contracts/EcoTraveler.sol/EcoTraveler.json';

const ecoAddress = "0x250C761B43Adb9e18096011b4a880eE975737bFA";

const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://via.placeholder.com/150",
  bio: "Hello Ths is me ..the great guy",
};

function App() {
  const [userAddress, setUserAddress] = useState("");

  const [connected, setConnected] = useState(false);
  const connectWallet = async () => {
    const connex = new Connex({
      node: "https://node-testnet.vechain.energy/",
      //https://testnet.weblocks.net
      network: "test",
    });
  
  async function test(){
    const provider = thor.ethers.modifyProvider(
      new ethers.provider.Web3Provider(
        new thor.Provider({ connex })
      )
    )
    const VTHOContract = new ethers.Contract(ecoAddress, Ecotraveler.abi, provider);
    console.log(VTHOContract.ownerAddress);
  }

    const wallet = await connex.vendor
      .sign("cert", {
        purpose: "identification",
        payload: {
          type: "text",
          content: "Please sign this Certificate",
        },
      })
      .request();

    if (wallet && wallet.annex) {
      console.log(wallet);
      setUserAddress(wallet.annex.signer);
      setConnected(true);
    }
  };
  return (
    <div>
      <Header />

      <UserProfile user={user} />
      <button onClick={connectWallet}> Connect Wallet</button>
    </div>
  );
}

export default App;
