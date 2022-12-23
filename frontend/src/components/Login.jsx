import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

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
    console.log(JSON.stringify(formData));
    fetch("http://localhost:3000/api/auth/login", {
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
        localStorage.setItem("token", data.token);
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
      <Typography variant="h4">Login</Typography>
      <Button onClick={handleModalChange}>Close</Button>
      <form>
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Log In
        </Button>
      </form>
      <Button variant="contained" onClick={changeLoginVar}>
        Signup Instead
      </Button>
    </>
  );
};

export default Login;
