import "./App.css";
import UserProfile from "./userProfile.js/userProfile";
import Header from "./header/header";
import { useState } from "react";
import Connex from "@vechain/connex";

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
      node: "https://testnet.weblocks.net",
      network: "test",
    });

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
