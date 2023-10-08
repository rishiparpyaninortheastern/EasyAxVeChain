import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

const StyledCard = styled(Card)`
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

function ThreeDCard(props) {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.content}
        </Typography>
      </CardContent>
    </StyledCard>
  );
}

function StyledCards({ cardsData }) {
  console.log(cardsData);
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {cardsData.map((card, index) => (
        <ThreeDCard key={index} title={card.title} content={card.content} />
      ))}
    </div>
  );
}

export default StyledCards;
