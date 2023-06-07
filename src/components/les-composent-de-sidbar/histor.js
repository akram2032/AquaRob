import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import HistoryIcon from "@mui/icons-material/History";

const History = () => {
  return (
    <List>
      <Link className="links" to="/history">
      <ListItemButton>
        <ListItemIcon>
          <HistoryIcon sx={{ color: "#191970" }} />
        </ListItemIcon>
        <Typography varient="h6" mr={2} color="#191970">
          {" "}
          <ListItemText>
              History
          </ListItemText>
        </Typography>
      </ListItemButton>
      </Link>
    </List>
  );
};
export default History;
