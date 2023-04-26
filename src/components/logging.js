import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { useHistory } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { API_URL } from "./config";

export default function Logging({ setSessionKey, setUserPassword }) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isCorectCridentials, setIsCorectCridentials] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsloading(true);
      const validate = async () => {
        const url = `${API_URL}/api/fetchUsers/?username=${username}&password=${password}`;
        const checkUser = await fetch(url);
        const dataToJson = await checkUser.json();
        const { success } = dataToJson;
        if (success) {
          setUserPassword(password);
          setSessionKey(true);
          setIsloading(false);
          history.push("/home");
          setUsername("");
          setPassword("");
        } else {
          setUsername("");
          setPassword("");
          setIsloading(false);
          setIsCorectCridentials(true);
          setTimeout(() => {
            setIsCorectCridentials(false);
          }, 1000);
        }
      };
      validate();
    }
  };
  //  change the visibility of the passwords inputs
  const handleTypes = (x) => {
    if (x.type !== "password") x.type = "password";
    else x.type = "text";
  };
  const ConnectingDiv = () => {
    return <div id="connecting">Connecting...</div>;
  };
  return (
    <>
      <div className="form">
        <form>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <div className="itemForm">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  id="username"
                  label="Username"
                  variant="standard"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Box>
            </div>
            <div className="itemForm">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  id="password"
                  label="Password"
                  variant="standard"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <VisibilityIcon
                  sx={{ width: 0.07, cursor: "pointer" }}
                  onClick={() => {
                    handleTypes(document.getElementById("password"));
                  }}
                />
              </Box>
              {isCorectCridentials && (
                <p className="important">Incorrect Cridentials</p>
              )}

              <div className="buttonForm">
                <Box>
                  <button
                    id="buttonForm"
                    type="Submit"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    Connect
                  </button>
                </Box>
              </div>
            </div>
          </Box>
        </form>
      </div>
      {isLoading && <ConnectingDiv />}
    </>
  );
}
