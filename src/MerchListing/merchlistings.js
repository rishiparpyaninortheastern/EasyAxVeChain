import Merchlist from "./merchlist";
import Grid from "@mui/material/Grid";
import { merchandise } from "../constants/merchlist";

function Merchlisting() {
  let data = merchandise;
  return (
    <Grid container spacing={2} padding={2}>
      {data.map((merchandise) => (
        <Grid item xs={12} sm={6} md={4} key={merchandise.id_number}>
          <Merchlist merch={merchandise} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Merchlisting;
