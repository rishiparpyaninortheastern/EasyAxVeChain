import * as React from "react";

import styled from "@emotion/styled";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Share as ShareIcon } from "@mui/icons-material";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";

import ecofriendlyshirt from "../assets/ecofriendlyshirt.jpeg";
import waterbottle from "../assets/waterbottle.jpeg";
import toothbrush from "../assets/toothbrush.jpeg";
import lantern from "../assets/lantern.jpeg";
import bag from "../assets/organicbag.jpeg";

const getImage = (key) => {
  switch (key) {
    case "ecofriendlyshirt":
      return ecofriendlyshirt;
    case "waterbottle":
      return waterbottle;
    case "toothbrush":
      return toothbrush;
    case "lantern":
      return lantern;
    case "bag":
      return bag;
    default:
      return ecofriendlyshirt; // or a default image if you have one
  }
};

const Tag = styled.span`
  display: inline-block;
  margin: 2px;
  padding: 2px 8px;
  border-radius: 12px;
  background-color: #e0e0e0;
`;
// const tagColors = ["#f44336", "#2196F3", "#4CAF50", "#FFC107", "#9C27B0"];

export default function merchListing({ merch }) {
  console.log(merch);
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        maxWidth: 800,
        alignItems: "flex-start",
      }}
    >
      <CardMedia
        sx={{ width: 140, height: 140 }}
        image={getImage(merch.image_key)}
        title="green iguana"
      />

      <CardContent sx={{ flex: "1", padding: "16px" }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Typography gutterBottom variant="h8" component="span">
              {merch.name}{" "}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />{" "}
            {merch.price}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              <Tag>{merch.id_number} sq ft</Tag>
              <Tag>Available: {merch.counts}</Tag>
              <Tag>{merch.electricity_consumption_kWh} kWh</Tag>
              <Tag>{[...merch.rawmaterials]} gallons</Tag>
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
