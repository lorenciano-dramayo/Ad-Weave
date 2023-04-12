import React, { useEffect, Fragment, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import _ from 'lodash';
import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  Stack,
  Divider,
  IconButton,
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import IconPink from 'assets/images/2022/ico_clock_pink.png';
import { getTaskTimelogById } from 'store/reducers/tasks';
import TaskContext from 'pages/Task/Context';

const useStyles = makeStyles(() => ({
  accordionContainerIsActive: {
    boxShadow: 'none',
    backgroundColor: '#F5F6F8',
    transition: '.5s ease',
  },
  accordionContainerActive: {
    boxShadow: 'none',
    transition: '.5s ease',
  },
  accordionSummary: {
    minHeight: '0px !important',
    height: '48px',
  },
  avatarSize: {
    width: '33px',
    height: '33px',
    marginRight: '10px',
  },
  avatarWrapper: {
    display: 'flex',
  },
  txtLoghours: {
    color: '#DF3C76',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '120%',
    letterSpacing: '0.005em',
    padding: '5px',
    width: '20%',
  },
  txtDate: {
    color: '#767676',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '120%',
    letterSpacing: '0.005em',
    padding: '5px',
    width: '30%',
  },
  tableHeader1: {
    color: '#767676',
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '120%',
    letterSpacing: '0.005em',
    padding: '5px',
    width: '30%',
  },
  tableHeader2: {
    color: '#767676',
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '120%',
    letterSpacing: '0.005em',
    padding: '5px',
    width: '20%',
  },
  tableRowModify: {
    display: 'inline-table',
    width: '100%',
  },
  tableCellModify30: {
    padding: '5px',
    width: '30%',
  },
  tableCellModifyPlay: {
    padding: '5px',
    width: '20%',
    textAlign: 'center',
  },
  iconPinkSize: {
    height: '16px',
    width: '16px',
    marginLeft: '10px',
  },
  clockWrapper: {
    alignItems: 'center',
    display: 'flex',
    marginTop: '7px',
    justifyContent: 'center',
  },
  tableContainer: {
    margin: '10px 10px 0px',
    padding: '0px',
    borderTop: '1px solid #CDD2D7',
  },
  mT20: {
    marginTop: '20px',
  },
}));

const TimelogTask = () => {
  const { taskId } = useParams();
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { timelog } = useSelector((state) => state.tasks);
  const { handleOpen } = useContext(TaskContext);

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    dispatch(getTaskTimelogById(taskId));
  }, []);

  return (
    <Box mt={2}>
      {!_.isEmpty(timelog) ? (
        <Card className={classes.mT20} elevation={0} variant="outlined">
          <Stack
            direction="row"
            justifyContent="space-between"
            px={2}
            py={2}
            backgroundColor={'#F9F9FC'}
            alignItems="center"
          >
            <Typography fontWeight={700} variant="body2">
              User
            </Typography>
            <Typography fontWeight={700} variant="body2">
              Total Log Hours
            </Typography>
          </Stack>
          <Divider />
          {timelog?.map((item, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              className={
                expanded == index
                  ? classes.accordionContainerActive
                  : classes.accordionContainerIsActive
              }
              onChange={handleChangeAccordion(index)}
            >
              <AccordionSummary
                className={classes.accordionSummary}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="timelogbh-content"
                id="timelogbh-header"
              >
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    className={classes.avatarWrapper}
                    sx={{ width: '100%', flexShrink: 0 }}
                  >
                    {item?.avatar?.split('/').pop() !== 'thumb_' ? (
                      <Avatar
                        className={classes.avatarSize}
                        alt={item.user_name}
                        src={item.avatar}
                      />
                    ) : (
                      <Avatar className={classes.avatarSize}>
                        {`${item.user_name.split(' ')[0][0]}${
                          item.user_name.split(' ')[1][0]
                        }`}
                      </Avatar>
                    )}
                    {item.user_name}
                  </Typography>
                  <Typography fontWeight={700} color="secondary">
                    {item?.total_time}
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails className={classes.tableContainer}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        className={classes.tableHeader1}
                      >
                        Date Started
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.tableHeader1}
                      >
                        Date Ended
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.tableHeader2}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.tableHeader2}
                      >
                        Log Hours
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {item?.timelogs.map((row, indexItem) => (
                      <TableRow key={indexItem}>
                        <TableCell colSpan={4} sx={{ padding: 0 }}>
                          {row?.timeline.map((itemData, indexData) => (
                            <TableRow
                              key={indexData}
                              className={classes.tableRowModify}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                onClick={(e) =>
                                  handleOpen(
                                    e,
                                    'left',
                                    'date_started',
                                    itemData,
                                    null,
                                    'task',
                                    itemData.timeline_id,
                                    null
                                  )
                                }
                                align="center"
                                className={classes.txtDate}
                              >
                                {itemData.time_in}
                              </TableCell>
                              <TableCell
                                onClick={(e) =>
                                  handleOpen(
                                    e,
                                    'left',
                                    'date_ended',
                                    itemData,
                                    null,
                                    'task',
                                    itemData.timeline_id,
                                    null
                                  )
                                }
                                align="center"
                                className={classes.txtDate}
                              >
                                {itemData.time_out}
                              </TableCell>
                              <TableCell
                                className={classes.tableCellModifyPlay}
                              >
                                <Chip
                                  label={itemData.timeline_status}
                                  size="small"
                                  color={
                                    itemData.timeline_status == 'stop'
                                      ? 'secondary'
                                      : 'primary'
                                  }
                                />
                              </TableCell>
                              <TableCell
                                align="center"
                                className={classes.txtLoghours}
                              >
                                <Box className={classes.clockWrapper}>
                                  {itemData.total}{' '}
                                  <img
                                    className={classes.iconPinkSize}
                                    src={IconPink}
                                    alt="icon clock pink"
                                  />
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>
          ))}
        </Card>
      ) : (
        <Card variant="outlined" sx={{ borderStyle: 'none' }}>
          <Stack alignItems="center" p={1}>
            <Box>
              <IconButton
                size="large"
                color="error"
                disableRipple
                disableTouchRipple
                disableFocusRipple
                sx={{ backgroundColor: '#f2445c1a' }}
              >
                <LinkOffIcon />
              </IconButton>
            </Box>
            <Box>
              <Typography fontWeight={700} color="#999999">
                No Timelog found.
              </Typography>
            </Box>
          </Stack>
        </Card>
      )}
    </Box>
  );
};

export default TimelogTask;
