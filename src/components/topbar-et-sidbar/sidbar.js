import { Box, Divider, IconButton, List } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Map from "../les-composent-de-sidbar/map";
import Graph from "../les-composent-de-sidbar/graphe";
import Home from "../les-composent-de-sidbar/home";
import History from "../les-composent-de-sidbar/histor";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    eft: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Home />
        <Divider />
        <Graph />
        <Divider />
        <Map />
        <History />
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
          </IconButton>
        </React.Fragment>
      ))}
    </div>
  );
}
