import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container"; // <-- import Container
import StyledCards from "../common/StyledCards";

const UserProfile = ({ user }) => {
  const cardsData = [
    { title: "Badge1", content: "Content for Card 1" },
    { title: "Badge 2", content: "Content for Card 2" },
    { title: "Badge 3", content: "Content for Card 3" },
    { title: "Badge 4", content: "Content for Card 4" },
    { title: "Badge 5", content: "Content for Card 5" },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100vh"
      bgcolor="#e8f5e9"
    >
      <Box mt={5}>
        <Avatar
          src={user.avatar}
          alt={user.name}
          style={{ width: "150px", height: "150px" }}
        />
      </Box>
      <Typography variant="h4" mt={2}>
        {user.name}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" mt={1}>
        {user.role}
      </Typography>

      <Container style={{ padding: "16px", marginBottom: "24px" }}>
        <Paper style={{ padding: "16px" }}>
          <Typography variant="body1">{user.bio}</Typography>
        </Paper>
      </Container>

      <StyledCards cardsData={cardsData} />
    </Box>
  );
};

export default UserProfile;
