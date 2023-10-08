import "./App.css";
import UserProfile from "./userProfile.js/userProfile";
import Header from "./header/header";
import { useContext } from "react";
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

function App() {
  const { userId, setUserId } = useContext(UserContext);
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
