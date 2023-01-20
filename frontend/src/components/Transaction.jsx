import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { TextField } from "@mui/material";

const Transaction = (props) => {
  const { socket, isLoggedIn, setIsLoggedIn } = props;
  const [amount, setAmount] = useState(0);

  const handleAdd = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/scores", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        amount: amount,
        type: "credit",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Error");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleRemove = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/scores", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        amount: amount,
        type: "debit",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Error");
        }
      })
      .catch((error) => {
        console.log(error.message);
        alert('You do not have enough points to make this transaction');
      });
  };

  const handleInputChange = (e) => {
    if(parseInt(e.target.value) < 0) {
        return;
    }
    setAmount(parseInt(e.target.value));
  };


  return (
    <div className="flex">
      <div className=" flex ml-auto mr-auto mt-10 item-center">
        <TextField
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          type="number"
          onChange={handleInputChange}
          name="amount"
          value={amount}
        />
        <div className="item-center ml-4 space-x-2">
          <Fab color="primary" aria-label="add" onClick={handleAdd}>
            <AddIcon />
          </Fab>
          <Fab color="secondary" aria-label="remove" onClick={handleRemove}>
            <RemoveIcon />
          </Fab>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
