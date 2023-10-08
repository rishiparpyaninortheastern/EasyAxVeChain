import Listing from "./listing";
import Grid from "@mui/material/Grid";
import { properties } from "../constants/constants";

function Listings() {
  let data = properties;
  return (
    <Grid container spacing={2} padding={2}>
      {data.map((listing) => (
        <Grid item xs={12} sm={6} md={4} key={listing.property_id}>
          <Listing listing={listing} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Listings;
