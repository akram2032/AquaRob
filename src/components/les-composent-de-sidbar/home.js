import { List, ListSubheader, Typography } from "@mui/material";
import React from "react";

import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";

const Home = () => {
  return (
    <List
      sx={{ width: "100%", maxWidth: 500 }}
      subheader={
        <ListSubheader>
          <Typography varient="h6" mr={2} color="#191970">
            {" "}
            <DirectionsBoatIcon /> AquaRob{" "}
          </Typography>
        </ListSubheader>
      }
    ></List>
  );
};
export default Home;
