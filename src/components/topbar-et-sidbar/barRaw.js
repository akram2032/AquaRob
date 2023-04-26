import styled from "@emotion/styled";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import SailingIcon from "@mui/icons-material/Sailing";
import React from "react";

import { Link } from "react-router-dom";
const Styletoolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
}));

const RawBar = () => {
  return (
    <Box>
      <AppBar sx={{ bgcolor: "#fff" }} position="fixed">
        <Styletoolbar>
          <Icons>
            <Link to="/" className="links">
              <Typography varient="h6" mr={2} color="#191970">
                AquaRob <SailingIcon />
              </Typography>
            </Link>
          </Icons>
        </Styletoolbar>
      </AppBar>
    </Box>
  );
};
export default RawBar;
