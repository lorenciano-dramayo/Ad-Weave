import * as React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  IconButton,
  Collapse,
  Avatar,
  Stack,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const ariaLabel = { 'aria-label': 'description' };
function createData(avatar, subject, department, status, comments) {
  return {
    avatar,
    subject,
    department,
    status,
    comments,

    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

const useStyles = makeStyles(() => ({
  avatarSize: {
    width: '33px',
    height: '33px',
    marginRight: '10px',
  },
  revisionHeadTable: {
    backgroundColor: '#F5F6F8',
  },
  avatarReply: {
    width: '16px',
    height: '16px',
    marginRight: '10px',
  },
  nameReply: {
    color: '#192A3E',
    letterSpacing: '0.01em',
    fontWeight: '500',
    fontSize: '12px',
    margin: '0',
  },
  dateReply: {
    color: '#90A0B7',
    letterSpacing: '0.005em',
    fontWeight: '400',
    fontSize: '9px',
    marginLeft: '10px',
  },
  desc: {
    padding: '0px 15px',
    margin: '0',
    color: '#707683',
    letterSpacing: '0.01em',
    fontWeight: '400',
    fontSize: '13px',
  },
  descContainer: {
    margin: '20px 0px 20px 33px',
  },
}));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row" align="left">
          {row.avatar}
        </TableCell>
        <TableCell align="left">{row.subject}</TableCell>
        <TableCell align="center">{row.department}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell align="center">{row.comments}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }} className={classes.descContainer}>
              <Stack border="1px solid #EBEFF2" padding="15px">
                <Stack direction="row" justifyContent="space-between">
                  <p>Description</p>
                  <p>2021/05/18 18:23:12</p>
                </Stack>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo.
                </p>
              </Stack>
              <Stack
                padding="15px"
                borderLeft="1px solid #EBEFF2"
                borderRight="1px solid #EBEFF2"
                borderBottom="1px solid #EBEFF2"
              >
                <Stack alignItems="center" direction="row" padding="15px">
                  <Avatar
                    alt="Remy Sharp"
                    className={classes.avatarReply}
                    src="/static/images/avatar/1.jpg"
                  />
                  <p className={classes.nameReply}>
                    Lindsey Stroud{' '}
                    <span className={classes.dateReply}>
                      2021/05/18 18:23:12
                    </span>
                  </p>
                </Stack>
                <p className={classes.desc}>
                  Your idea for this application is nice!{' '}
                </p>
              </Stack>
              <Stack
                padding="15px"
                borderLeft="1px solid #EBEFF2"
                borderRight="1px solid #EBEFF2"
                borderBottom="1px solid #EBEFF2"
              >
                <Input placeholder="Type a message..." inputProps={ariaLabel} />
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    comments: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.string.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    subject: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData(
    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    'Wrong Asset',
    'Design Team',
    'Answered',
    1,
    4.0
  ),
  createData(
    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    'Wrong Asset',
    'Design Team',
    'Answered',
    1,
    4.0
  ),
  createData(
    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    'Wrong Asset',
    'Design Team',
    'Answered',
    1,
    4.0
  ),
  createData(
    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    'Wrong Asset',
    'Design Team',
    'Answered',
    1,
    4.0
  ),
];

const Escalation = () => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead className={classes.revisionHeadTable}>
          <TableRow>
            <TableCell />
            <TableCell align="left">Subject</TableCell>
            <TableCell align="center">Department</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Comments</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.subject} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Escalation;
