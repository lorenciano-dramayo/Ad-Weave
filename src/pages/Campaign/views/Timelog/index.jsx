import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {
  Box,
  Stack,
  Card,
  Accordion,
  IconButton,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListAltIcon from '@mui/icons-material/ListAlt';
import IconPink from 'assets/images/2022/ico_clock_pink.png';

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
  },
  txtDate: {
    color: '#767676',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '120%',
    letterSpacing: '0.005em',
  },
  tableHeader: {
    color: '#767676',
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '120%',
    letterSpacing: '0.005em',
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
    margin: '0px 56px',
    borderTop: '1px solid #CDD2D7',
  },
}));

const Timelog = (data) => {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();
  const timelogData = data.timelogData;

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box width="100%">
      {timelogData?.length > 0 ? (
        timelogData.map((item, index) => (
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
              <Typography
                className={classes.avatarWrapper}
                sx={{ width: '100%', flexShrink: 0 }}
              >
                <Avatar
                  className={classes.avatarSize}
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                />{' '}
                {item.user}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.tableContainer}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={classes.tableHeader}>
                      Date Started
                    </TableCell>
                    <TableCell align="center" className={classes.tableHeader}>
                      Date Ended
                    </TableCell>
                    <TableCell align="center" className={classes.tableHeader}>
                      Log Hours
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item?.timeline.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center" className={classes.txtDate}>
                        {row.time_in}
                      </TableCell>
                      <TableCell align="center" className={classes.txtDate}>
                        {row.time_out}
                      </TableCell>
                      <TableCell align="center" className={classes.txtLoghours}>
                        <Box className={classes.clockWrapper}>
                          {row.total}{' '}
                          <img
                            className={classes.iconPinkSize}
                            src={IconPink}
                            alt="icon clock pink"
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Card variant="outlined" sx={{ borderStyle: 'dashed' }}>
          <Stack alignItems="center" p={3}>
            <Box>
              <IconButton
                size="large"
                color="error"
                disableRipple
                disableTouchRipple
                disableFocusRipple
                sx={{ backgroundColor: '#f2445c1a' }}
              >
                <ListAltIcon />
              </IconButton>
            </Box>
            <Box>
              <Typography fontWeight={700} color="#999999">
                No timelog found for this campaign.
              </Typography>
            </Box>
          </Stack>
        </Card>
      )}
    </Box>
  );
};

export default Timelog;
