import React from "react";
import { clientData } from '../dataset/clientData';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: 1000
  },
});

let multiplierByOver50 = 1; // For points over 50
let multiplierByOver100 = 2; // For points over 100

function getPoints(total) {
  const truncatedTotal = Math.trunc(total); // No need to calc using fractions
  let rewardsPoints = 0;
  if (truncatedTotal <= 50) {
    return rewardsPoints;
  } else if (truncatedTotal <= 100) {
    rewardsPoints = ((truncatedTotal - 50) * multiplierByOver50); // Multiply by integer value for the over 50, under 100 group
    return rewardsPoints;
  } else if (truncatedTotal > 100) {
    rewardsPoints = (((truncatedTotal - 100) * multiplierByOver100) + 50); // Calculate $ over 100 times 2, and add a 50 
    return rewardsPoints;
  } else {
    return rewardsPoints;
  }
}

const totalRewards = (e) => {
  let list = [];
  let totalPoints = 0;
  for (let i = 0, client; client = clientData[i]; i++) {
    if (e == i) {
      for (let z = 0, transaction; transaction = client.log[z]; z++) {
        list.push(getPoints(transaction.transaction));
      }
      totalPoints = list.length ? list.reduce((acc, key) => key + acc, 0) : 0;
    }
  }
  return totalPoints;
}

const DetailComponent = (props) => {
  const selectedIndice = props.theIndex;
  const classes = useStyles();
  return (
    <>
      <NavLink className="link" onClick={props.selectBack} to="/">Go Back To List</NavLink>
      {clientData.map((client, i) => (
        (selectedIndice == i) && (
          <div key={i} className="additionalSpace">
            <h3 className="centered">Total Rewards for {client.name}: {totalRewards(selectedIndice)}</h3>
            <hr />
            <TableContainer component={Paper} className="centerTable">
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Reward Points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {client.log.map((transaction, i) => (
                    <TableRow key={transaction.name}>
                      <TableCell component="th" scope="row">
                        {transaction.id}
                      </TableCell>
                      <TableCell align="right">{moment(transaction.date).format("MM/DD/YYYY")}</TableCell>
                      <TableCell align="right">{transaction.name}</TableCell>
                      <TableCell align="right">{transaction.transaction}</TableCell>
                      <TableCell align="right">{getPoints(transaction.transaction)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )
      ))}
    </>
  );
};

export default DetailComponent;