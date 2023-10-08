import { useState, useEffect, useContext } from "react";
import Connex from "@vechain/connex";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UserContext from "./userContext";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "./miniSLider";

export const Home = () => {
  const [userAddress, setUserAddress] = useState("");
  const [connected, setConnected] = useState(false);
  const { userId, setUserId } = useContext(UserContext);
  const navigate = useNavigate();

  // useEffect hook to observe changes to userAddress
  useEffect(() => {
    console.log("userAddress has been updated:", userAddress);
  }, [userAddress, connected]); // Dependency array with userAddress

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

    console.log(wallet);
    if (wallet && wallet.annex) {
      setUserAddress(wallet.annex.signer);
      setUserId(wallet.annex.signer);
      setConnected(true);
      navigate("/listings");
    }
  };

  return (
    <div>
      <Box p={2} style={{ textAlign: "center" }}>
        <ImageCarousel style={{ width: "100px" }} p={2} />
        <Button
          variant="contained"
          onClick={connectWallet}
          sx={{
            padding: "10px",
            textAlign: "center",
            backgroundColor: "#ffff",
            color: "black", // Eco-friendly green
            "&:hover": {
              backgroundColor: "#ffff", // Slightly darker shade for hover
            },
            boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            transition: "transform 0.1s, box-shadow 0.1s",
            "&:active": {
              transform: "translateY(2px)",
              boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          Connect Wallet
        </Button>
      </Box>

      {/* <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="white" // Soft green background for eco-friendly theme
      ></Box> */}
    </div>
  );
};
