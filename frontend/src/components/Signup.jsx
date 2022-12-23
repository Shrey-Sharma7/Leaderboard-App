import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const Signup = (props) => {
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
    fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 201) {
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

//   const validatePassword = (e) => {

//   }

  return (
    <>
      <Typography variant="h4">Sign Up</Typography>
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
        {/* <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={validatePassword}
        /> */}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </form>
      <Button variant="contained" onClick={changeLoginVar}>
        Login Instead
      </Button>
    </>
  );
};

export default Signup;
