import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Login from "./features/Login";
import SignUp from "./features/SignUp";
import CustomizedDialogs from "./features/CustomizedDialog";

export default function ButtonAppBar(props) {
  const { isLoggedIn, setIsLoggedIn } = props;

  const [open, setOpen] = useState(false);
  const [loginMode, setLoginMode] = useState(true);

  const handleModalChange = () => {
    setOpen(!open);
  };

  const changeLoginVar = () => {
    setLoginMode(!loginMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Leaderboard
          </Typography>
          {isLoggedIn ? (
            <>
              <Typography  variant="h6" component="div" sx={{marginRight: "20px"}}>
                {localStorage.getItem("username")}
              </Typography>
              <Button variant="outlined" color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleModalChange}
            >
              Login
            </Button>
          )}
          <CustomizedDialogs
            open={open}
            setOpen={setOpen}
            handleClickOpen={handleModalChange}
          >
            {loginMode ? (
              <Login
                changeLoginVar={changeLoginVar}
                handleModalChange={handleModalChange}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <SignUp
                changeLoginVar={changeLoginVar}
                handleModalChange={handleModalChange}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          </CustomizedDialogs>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
