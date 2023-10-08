import "./App.css";
import UserProfile from "./userProfile.js/userProfile";
import Header from "./header/header";
<<<<<<< HEAD
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
=======
import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import UserContext from "./userContext";
import { Home } from "./home";
import Listings from "./Listings/listings";
import Merchlisting from "./MerchListing/merchlistings";
import { properties } from "./constants/constants";

function App() {
  const { userId, setUserId, contract, setContract } = useContext(UserContext);
  useEffect(() => {
    properties.map((e, i) => {
      contract.addListing(
        e.property_id,
        e.score_out_of_5,
        "0x1b542B4D85b8C2C82c9E30D7543cf0091989fC87",
        e.price
      );
    });
  });
>>>>>>> b3e3198dd8e5d8f45fb6f539f029f0d914d8701d
  return (
    <div>
      <Router>
        <Header userAddress={userId} />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/merch" element={<Merchlisting />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
