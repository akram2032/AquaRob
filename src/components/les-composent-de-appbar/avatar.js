import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {Avatar, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {Box} from "@mui/system";

export default function Avatarbar({setSessionKey}) {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Box sx={{display: "block"}}>
                <Button onClick={handleClick} sx={{mr: {xs: 0}}}>
                    <Typography mr={{xs: 1}} varient="h6" color="#191970">
                        {" "}
                        <span></span>admin
                    </Typography>

                    <Avatar
                        mr={2}
                        sx={{width: 40, height: 40}}
                        //src=""
                    ></Avatar>
                </Button>
            </Box>
            <Menu
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <div className="logout">
                    <MenuItem
                        onClick={() => {
                            setSessionKey(false)
                            history.push("/");

                        }}
                    >
                        Logout
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            history.push("/cp");
                        }}
                    >
                        Change Password
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            history.push("/devices");
                        }}
                    >
                        Manage Devices
                    </MenuItem>
                </div>
            </Menu>
        </div>
    );
}
