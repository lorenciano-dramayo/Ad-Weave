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
  Checkbox,
  Button,
  Stack,
  Link,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const labelCheckBox = { inputProps: { 'aria-label': 'Checkbox demo' } };

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

function createData(user, team, feedback) {
  var feedbackLengthChar = feedback.length;

  return { user, team, feedback, feedbackLengthChar };
}

const rows = [
  createData('John Wick', 'Design', 'Change the status'),
  createData(
    'John Wick',
    'Design',
    'Please change the font sample s asdasd asdasd s'
  ),
  createData('John Wick', 'Design', 'Change the status'),
  createData('John Wick', 'Design', 'Change the status'),
  createData('John Wick', 'Design', 'Change the status'),
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

const Revision = () => {
  const classes = useStyles();

  return (
    <Box width="100%">
      <TableContainer component={Paper} className={classes.revisionTable}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <Checkbox className={classes.checkboxSize} {...labelCheckBox} />
              </StyledTableCell>
              <StyledTableCell align="left">User</StyledTableCell>
              <StyledTableCell align="center">Team</StyledTableCell>
              <StyledTableCell align="left">Feedback</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.user}>
                <StyledTableCell
                  width="10%"
                  align="center"
                  component="th"
                  scope="row"
                >
                  <Checkbox
                    className={classes.checkboxSize}
                    {...labelCheckBox}
                  />
                </StyledTableCell>
                <StyledTableCell
                  width="25%"
                  align="left"
                  component="th"
                  scope="row"
                >
                  {row.user}
                </StyledTableCell>
                <StyledTableCell width="25%" align="center">
                  {row.team}
                </StyledTableCell>
                <StyledTableCell width="40%" align="left">
                  <p className={classes.dFlexCenter}>
                    <span className={classes.txtCharLimit}>
                      {' '}
                      {row.feedback}
                    </span>
                    {row.feedbackLengthChar <= 30 ? (
                      ''
                    ) : (
                      <Link className={classes.txtSeemore}> see more</Link>
                    )}
                  </p>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" justifyContent="space-between" mt={3} spacing={2}>
        <Button
          variant="filled"
          className={classes.btn}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            className={classes.btnOutlined}
            startIcon={<AddIcon />}
          >
            Subtask
          </Button>
          <Button
            variant="filled"
            className={classes.btn}
            startIcon={<AddIcon />}
          >
            Checklist
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Revision;
