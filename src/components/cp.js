import React, { useEffect, useState } from "react";
import { API_URL } from "./config";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LockIcon from "@mui/icons-material/Lock";
import { useHistory } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function ChangePass({ oldpass }) {
  const history = useHistory();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLength, setIsLength] = useState(true);

  // change the password via the api
  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmNewPassword !== newPassword) {
      return 0;
    }

    if (newPassword.length < 4) {
      setIsLength(false);
      return 0;
    }
    const validate = async () => {
      if (oldPassword !== oldpass) {
        setIsUpdated(false);
        setIsLength(true);
        setIsError(true);
        return 0;
      }
      if (newPassword === confirmNewPassword) {
        const url = `${API_URL}/api/updatePass/?password=${newPassword}&oldpass=${oldPassword}`;
        const update = await fetch(url);
        const updateToJson = await update.json();
        const { success } = updateToJson;
        if (success) {
          setIsLength(true);
          setIsError(false);
          setIsUpdated(true);
          setTimeout(() => {
            setIsUpdated(true);
            history.push("/");
          }, 800);
        }
      }
    };
    if (oldPassword && newPassword && confirmNewPassword) {
      setIsError(false);
      setIsUpdated(false);
      setIsLength(true);
      validate();
    }
  };
  //  change the visibility of the passwords inputs
  const handleTypes = (x) => {
    if (x.type !== "password") x.type = "password";
    else x.type = "text";
  };
  // succeful div
  const SuccessDiv = () => {
    return <div id="success">Password updated succefully</div>;
  };
  // Error div
  const ErrorDiv = () => {
    return <div id="error">Incorrect Credentials</div>;
  };
  const LengthDiv = () => {
    return <div id="length">New password must be 4 or more characters</div>;
  };
  return (
    <>
      <div className="form">
        <form>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <div className="itemForm">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <LockIcon
                  sx={{ color: "#063251", mr: 1, my: 0.5, width: 0.08 }}
                />
                <TextField
                  id="oldPassword"
                  label="Old password"
                  variant="standard"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                />
                <VisibilityIcon
                  sx={{ width: 0.07, cursor: "pointer" }}
                  onClick={() => {
                    handleTypes(document.getElementById("oldPassword"));
                  }}
                />
              </Box>
            </div>
            <div className="itemForm">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <LockIcon
                  sx={{ color: "#063251", mr: 1, my: 0.5, width: 0.08 }}
                />
                <TextField
                  id="newPassword"
                  label="New Password"
                  variant="standard"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <VisibilityIcon
                  sx={{ width: 0.07, cursor: "pointer" }}
                  onClick={() => {
                    handleTypes(document.getElementById("newPassword"));
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <LockIcon
                  sx={{ color: "#063251", mr: 1, my: 0.5, width: 0.08 }}
                />
                <TextField
                  id="confirmNewPassword"
                  label="Confirm the new password"
                  variant="standard"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <VisibilityIcon
                  sx={{ width: 0.07, cursor: "pointer" }}
                  onClick={() => {
                    handleTypes(document.getElementById("confirmNewPassword"));
                  }}
                />
              </Box>
              {newPassword !== confirmNewPassword && confirmNewPassword ? (
                <p className="important">Passwords dont match !</p>
              ) : null}
              <div className="buttonForm">
                <Box>
                  <button
                    id="buttonForm"
                    type="Submit"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    Update
                  </button>
                </Box>
              </div>
            </div>
          </Box>
        </form>
      </div>
      {isUpdated && <SuccessDiv />}
      {isError && <ErrorDiv />}
      {!isLength && <LengthDiv />}
    </>
  );
}
