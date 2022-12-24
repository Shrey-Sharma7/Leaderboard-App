import React from "react";
import { io } from "socket.io-client";
import "./App.css";
import Navbar from "./components/Navbar";
import Leaderboard from "./components/Leaderboard";
import Transaction from "./components/Transaction";
import { useState, useEffect } from "react";

const socket = io.connect("https://leaderboard-api-i94y.onrender.com");

socket.on("connect", () => {
  console.log("Connected to server");
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Leaderboard socket={socket}/>
      {isLoggedIn && <Transaction socket={socket} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
    </>
  );
}

export default App;
