import React from "react";

// MUI COMPONENTS
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

const BlockCardTransactions = ({ transactions }) => {
  return (
    <TableContainer component={Paper} sx={{ background: "rgb(231, 235, 240)" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell align="center">To</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {transaction.from}
              </TableCell>
              <TableCell align="center">{transaction.to}</TableCell>
              <TableCell align="center">{transaction.amount}</TableCell>
              <TableCell align="center">
                <Chip label={transaction.status} color="success" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BlockCardTransactions;
