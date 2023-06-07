import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { Link } from "react-router-dom";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import RadarIcon from "@mui/icons-material/Radar";
import styled from "@emotion/styled";

const Graph = () => {
  const Titrelist = styled(Box)(({ theme }) => ({
    varient: "h6",
    color: "#191970",
  }));
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      aria-label="contacts"
    >
      <ListItem disablePadding>
        <ListItemIcon>
          <AutoGraphIcon sx={{ color: "#191970" }} />
        </ListItemIcon>
        <ListItemText primary="Graph:" sx={{ color: "#191970" }} />
      </ListItem>

      <List component="div" disablePadding>
        <Link to="/temperature" className="links">
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <ThermostatIcon sx={{ color: "#191970" }} />
          </ListItemIcon>
            <Titrelist>
              {" "}
              <ListItemText primary="temperature" />
            </Titrelist>
        </ListItemButton>
        </Link>
      </List>
      <List component="div" disablePadding>
        <Link to="/rssisnr" className="links">
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <RadarIcon sx={{ color: "#191970" }} />
          </ListItemIcon>
            <Titrelist>
              <ListItemText primary="Rssi" />
            </Titrelist>
        </ListItemButton>
        </Link>
      </List>
    </List>
  );
};
export default Graph;
