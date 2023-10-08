import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

const StyledCard = styled(Card)`
  transition: transform 0.3s;
  width: 300px; // or whatever fixed width you prefer
  height: 400px; // or a height of your choice
  &:hover {
    transform: scale(1.1);
  }
    opacity: ${(props) => (props.disabled ? '0.5' : '1')}; // Reducing opacity for disabled cards
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')}; // Preventing clicks on disabled cards
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 70%; // adjust based on your requirement
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function ThreeDCard(props) {
  return (
    <StyledCard disabled={props.disabled}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <ImageContainer>
          <img src={props.image} alt={props.title} />
        </ImageContainer>
      </CardContent>
    </StyledCard>
  );
}

function StyledCards({ cardsData, myBadgeLevel }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {cardsData.map((card, index) => (
        <ThreeDCard
          key={index}
          title={card.title}
          image={card.image}
          disabled={index+1 > myBadgeLevel}
        />
      ))}
    </div>
  );
}

export default StyledCards;
