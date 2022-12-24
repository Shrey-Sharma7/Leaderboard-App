import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  Avatar,
  CssBaseline,
  Divider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = (props) => {
  const { changeLoginVar, handleModalChange, setIsLoggedIn } = props;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send form data to server or perform other tasks
    fetch("https://leaderboard-api-i94y.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 200) {
          // Signup was successful
          return response.json();
        } else {
          // Display error message
          setFormData({
            username: "",
            password: "",
          });
          alert("Wrong Credentials!");
          throw new Error("Wrong Credentials!");
        }
      })
      .then((data) => {
        // console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        handleModalChange();
        setIsLoggedIn(true);
      })
      .catch((error) => {
        // Handle error
        console.log(error.message);
      });
  };

  return (
    <>
      <Container component="main">
        <CssBaseline />
        <div
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="flex justify-between m-auto items-center">
            <div className="flex items-center">
              <Avatar
                sx={{
                  margin: 1,
                  alignItems: "center",
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
            </div>
            <Button onClick={handleModalChange}>Close</Button>
          </div>
          <Divider className="mb-2" />
          <div className="pt-4">
            <form
              sx={{
                width: "100%", // Fix IE 11 issue.
                marginTop: 3,
              }}
              noValidate
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Login
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <p>
                    Don't have an account?{" "}
                    <Button onClick={changeLoginVar}>Sign up</Button>
                  </p>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
