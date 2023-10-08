// import React, { useState } from "react";
// import { Card, CardContent, Typography, Icon } from "@mui/material";
import styled from "@emotion/styled";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Button } from "@mui/material";
import { Share as ShareIcon } from "@mui/icons-material";

import * as React from "react";
import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";

import brickbaston from "../assets/brickbaston.jpeg";
import earthlyAdobe from "../assets/earthlyadobe.jpeg";
import concretecastle from "../assets/concerete_castle.jpeg";
import sustainablesanctuary from "../assets/sustainable_sanctuary.jpeg";
import ecofriendly from "../assets/ecofriendly.jpeg";
import ecoheaven from "../assets/ecoheaven.jpeg";
import glassglow from "../assets/glassglow.jpeg";
import urbanvillas from "../assets/urbanvillas.jpeg";

const getImage = (key) => {
  switch (key) {
    case "earthlyadobe":
      return earthlyAdobe;
    case "concretecastle":
      return concretecastle;
    case "sustainablesanctuary":
      return sustainablesanctuary;
    case "ecofriendly":
      return ecofriendly;
    case "ecoheaven":
      return ecoheaven;
    case "glassglow":
      return glassglow;
    case "urbanvillas":
      return urbanvillas;
    default:
      return sustainablesanctuary; // or a default image if you have one
  }
};
// const StyledCard = styled.div`
//   position: relative;
//   background-color: white;
//   display: flex;
//   margin-bottom: 16px;

//   &:hover::before {
//     content: "";
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     height: 7px; // Adjust as needed for underline thickness
//     background-color: ${(props) => getColorBasedOnScore(props.score)};
//   }
// `;
// const CardImage = styled.img`
//   width: 150px; // adjust as needed
//   height: auto;
//   margin-right: 16px; // some spacing between image and details
// `;

// const CardActions = styled.div`
//   position: absolute;
//   bottom: 8px;
//   right: 8px;
// `;

// const Tag = styled.span`
//   display: inline-block;
//   margin: 2px;
//   padding: 2px 8px;
//   border-radius: 12px;
//   background-color: #e0e0e0;
// `;

// function getColorBasedOnScore(score) {
//   if (score >= 4.5) return "rgba(56, 142, 60, 0.9)"; // Dark Green
//   if (score >= 3) return "rgba(255, 193, 7, 0.9)"; // Dark Yellow
//   return "rgba(211, 47, 47, 0.9)"; // Dark Red
// }

// function Listing({ listing }) {
//   const [showDetails, setShowDetails] = useState(false);

//   return (
//     <StyledCard score={listing.score_out_of_5} onClick={()=>setShowDetails(!showDetails)}>
//       <CardImage src={earthlyAdobe} alt={listing.property_name} />
//       <CardContent>
//         <Typography variant="h6">
//           {listing.property_name}
//           <Typography style={{ float: "right", paddingTop: "2px" }}>
//             <FontAwesomeIcon icon={faStar} />{" "}
//             {listing.score_out_of_5.toFixed(2)}
//           </Typography>
//         </Typography>

//         {showDetails && (
//           <>
//             <Tag>{listing.area_sq_ft} sq ft</Tag>
//             <Tag>Max Occupancy: {listing.max_occupancy}</Tag>
//             <Tag>{listing.electricity_consumption_kWh} kWh</Tag>
//             <Tag>{listing.water_consumption_gallons} gallons</Tag>
//           </>
//         )}
//       </CardContent>

//       <CardActions>
//         <Button
//           variant="contained"
//           color="primary"
//           style={{ marginRight: "10px" }}
//         >
//           Check Availability
//         </Button>
//         <Button variant="outlined" startIcon={<ShareIcon />}>
//           Share
//         </Button>
//       </CardActions>
//     </StyledCard>
//   );
// }

// export default Listing;

const Tag = styled.span`
  display: inline-block;
  margin: 2px;
  padding: 2px 8px;
  border-radius: 12px;
  background-color: #e0e0e0;
`;
// const tagColors = ["#f44336", "#2196F3", "#4CAF50", "#FFC107", "#9C27B0"];

function getColorBasedOnScore(score) {
  if (score >= 4.5) return "rgba(56, 142, 60, 0.9)"; // Dark Green
  if (score >= 3) return "rgba(255, 193, 7, 0.9)"; // Dark Yellow
  return "rgba(211, 47, 47, 0.9)"; // Dark Red
}

export default function Listing({ listing }) {
  console.log(getImage(listing.image_key));
  const [showDetails, setShowDetails] = useState(false);
  console.log(listing);
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        maxWidth: 800,
        alignItems: "flex-start",
      }}
      onClick={() => setShowDetails(!showDetails)}
    >
      <CardMedia
        sx={{ width: 140, height: 140 }}
        image={getImage(listing.image_key)}
        title="green iguana"
      />

      <CardContent sx={{ flex: "1", padding: "16px" }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Typography gutterBottom variant="h8"  component="span">
              {listing.property_name}{" "}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />{" "}
            {listing.score_out_of_5.toFixed(2)}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              <Tag>{listing.area_sq_ft} sq ft</Tag>
              <Tag>Max Occupancy: {listing.max_occupancy}</Tag>
              <Tag>{listing.electricity_consumption_kWh} kWh</Tag>
              <Tag>{listing.water_consumption_gallons} gallons</Tag>
              {/* Tags can be inserted here. */}
            </Typography>
          </Grid>

          <Grid item xs={8}>
            <Button variant="contained" color="primary">
              Check Availability
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
