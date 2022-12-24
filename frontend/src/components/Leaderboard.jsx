import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Leaderboard({socket}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://leaderboard-api-i94y.onrender.com/api/leaderboard")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    socket.on('updateScore', (res) => {
      fetch("https://leaderboard-api-i94y.onrender.com/api/leaderboard")
      .then((res) => res.json())
      .then((data) => setData(data));
    })
  }, [socket]);

  return (
    <TableContainer
      sx={{
        mt: 5,
        ml: "auto",
        mr: "auto",
        boxShadow: 0,
        border: 2,
        borderRadius: 2,
        width: 800,
        borderColor: "grey.500",
        maxHeight: 500,
      }}
      component={Paper} 
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead className = "sticky top-0">
          <TableRow>
            <StyledTableCell>Rank</StyledTableCell>
            <StyledTableCell align="center">Username</StyledTableCell>
            <StyledTableCell align="right">Balance</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow key={row.username}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="center">{row.username}</StyledTableCell>
              <StyledTableCell align="right">{row.score}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
