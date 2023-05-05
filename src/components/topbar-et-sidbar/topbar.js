import styled from "@emotion/styled";
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import SailingIcon from "@mui/icons-material/Sailing";
import React from "react";
import Nav from "./sidbar";
import Avatarbar from "../les-composent-de-appbar/avatar";
import ViewChanger from "../les-composent-de-appbar/error";
import {Link} from "react-router-dom";

const Styletoolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
});

const Icons = styled(Box)(({theme}) => ({
    display: "flex",
    gap: "20px",
    alignItems: "center",
}));

const Navbar = ({setSessionKey, indice, handleChange, total}) => {
    return (
        <Box>
            <AppBar sx={{bgcolor: "#fff"}} position="absolute">
                <Styletoolbar>
                    <Icons>
                        <Nav/>
                        {/* Top bar  */}
                        <Link to="/home" className="links">
                            <Typography varient="h6" mr={2} color="#191970">
                                <span id="logo">AquaRob</span>
                                <SailingIcon/>
                            </Typography>
                        </Link>
                    </Icons>
                    <Icons>
                        <ViewChanger
                            indice={indice}
                            handleChange={handleChange}
                            total={total}
                        />
                        <Avatarbar setSessionKey={setSessionKey}/>
                    </Icons>
                </Styletoolbar>
            </AppBar>
        </Box>
    );
};
export default Navbar;
