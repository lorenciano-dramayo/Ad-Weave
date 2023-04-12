import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { styled } from '@mui/material/styles';
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F5F6F8',
    color: '#767676',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F5F6F8',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(time, team, user, desc) {
  return { time, team, user, desc };
}

const rows = [
  createData('2021-05-18 18:23:12', 'John Wick', 'Design', 'Change the status'),
  createData('2021-05-18 18:23:12', 'John Wick', 'Design', 'Change the status'),
  createData('2021-05-18 18:23:12', 'John Wick', 'Design', 'Change the status'),
  createData('2021-05-18 18:23:12', 'John Wick', 'Design', 'Change the status'),
];

const useStyles = makeStyles(() => ({
  revisionTable: {
    boxShadow: 'none !important',
  },
  txtSeemore: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '120%',
    letterSpacing: '0.005em',
    color: '#F22076',
  },
  txtCharLimit: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '239px',
  },
  dFlexCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  checkboxSize: {
    height: '30px',
    width: '30px',
  },
  btn: {
    background: '#F22076',
    color: 'white',
  },
  btnOutlined: {
    border: '1px solid #F22076',
    color: '#F22076',
  },
}));

const ActivityLog = () => {
  const classes = useStyles();

  return (
    <Box width="100%">
      <TableContainer component={Paper} className={classes.revisionTable}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Time</StyledTableCell>
              <StyledTableCell align="center">Team</StyledTableCell>
              <StyledTableCell align="center">User</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.time}>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.time}
                </StyledTableCell>
                <StyledTableCell align="center">{row.team}</StyledTableCell>
                <StyledTableCell align="center">{row.user}</StyledTableCell>
                <StyledTableCell align="center">{row.desc}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ActivityLog;
