import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container"; // <-- import Container
import StyledCards from "../common/StyledCards";
import { useLocation } from "react-router-dom";
import UserContext from "../userContext";
import { FileCopy } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import seedsaver from "../assets/seedsaver.jpeg";
import earthprotector from "../assets/earthprotector.png";
import greenexplorer from "../assets/greenexplorer.png";
import ambassdor from "../assets/ambassdor.png";

const UserProfile = () => {
  const { userId, setUserId } = useContext(UserContext);
  const navigate = useNavigate();
  if (userId === null) {
    navigate("/");
  }
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  const location = useLocation();
  const user = location.state.user;
  const cardsData = [
    { title: "Seed Saver", image: seedsaver },
    { title: "Earth Protector", image: earthprotector },
    { title: "Green Explorer", image: greenexplorer },
    { title: "Sustaining Ambassdor", image: ambassdor },
  ];

  return (
    <div style={{ paddingBottom: "10px" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="100vh"
        style={{
          backgroundImage: ``,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box mt={5}>
          <Avatar
            src={user.avatar}
            alt={userId}
            style={{ width: "150px", height: "150px" }}
          />
        </Box>
        <Typography variant="h4" mt={2}>
          {"Carbon Credit Tokens"} : {10}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" mt={1}>
          {}
        </Typography>

        <Container style={{ padding: "16px", marginBottom: "24px" }}>
          <Paper style={{ padding: "16px" }}>
            <Typography variant="body4" gutterBottom>
              Wallet Address:
            </Typography>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Typography variant="body1" style={{ flexGrow: 1 }}>
                {userId}
              </Typography>
              <Button
                startIcon={<FileCopy />}
                onClick={() => copyToClipboard(userId)}
                variant="outlined"
              >
                Copy
              </Button>
            </div>
          </Paper>
        </Container>

        <StyledCards cardsData={cardsData} />
      </Box>
    </div>
  );
};

export default UserProfile;
