import "./App.css";
import UserProfile from "./userProfile.js/userProfile";
import Header from "./header/header";
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
