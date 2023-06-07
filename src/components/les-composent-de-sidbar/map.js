import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import RoomIcon from "@mui/icons-material/Room";
import MapIcon from "@mui/icons-material/Map";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
const Map = () => {
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
          <MapIcon sx={{ color: "#191970" }} />
        </ListItemIcon>
        <ListItemText primary="map:" sx={{ color: "#191970" }} />
      </ListItem>

      <List component="div" disablePadding>
        <Link to="/map" className="links">
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <RoomIcon sx={{ color: "#191970" }} />
          </ListItemIcon>
            <Titrelist>
              <ListItemText primary="gps" />
            </Titrelist>
        </ListItemButton>
        </Link>
      </List>

      <Divider />
    </List>
  );
};
export default Map;
