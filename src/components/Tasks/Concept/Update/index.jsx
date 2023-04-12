import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
  Typography,
  Avatar,
  Stack,
  Input,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconReply from 'assets/images/2022/ico_reply.png';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ariaLabel = { 'aria-label': 'description' };
const useStyles = makeStyles(() => ({
  accordionContainerIsActive: {
    transition: '.5s ease',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)',
  },

  accordionContainerActive: {
    boxShadow: 'none',
    transition: '.5s ease',
  },
  accordionSummary: {
    minHeight: '0px !important',
    height: '48px',
  },
  avatarReply: {
    width: '30px',
    height: '30px',
    marginRight: '10px',
  },
  nameReply: {
    color: '#192A3E',
    letterSpacing: '0.01em',
    fontWeight: '500',
    fontSize: '12px',
    margin: '0 10px 0 0 ',
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
  descriptionPost: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '165%',
    letterSpacing: '0.01em',
    color: '#848484',
  },
  accordionDetails: {
    padding: '8px 10px 16px',
    border: '1px solid #EBEFF2',
  },
  icoCheck: {
    color: '#2ED47A',
    height: '10px',
    width: '10px',
    marginRight: '10px',
  },
  txtResolved: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '10px',
    lineHeight: '12px',
    textAlign: 'right',
    letterSpacing: '0.01em',
    color: '#2ED47A',
  },
  hide: {
    display: 'none',
  },
  block: {
    display: 'block',
  },
  inputComment: {
    '&::after': {
      border: '0px solid',
    },
    '&::before': {
      border: '0px solid',
    },
    '&::hover': {
      border: '0px solid',
    },
  },
  replyContainer: {
    borderLeft: '1px solid #EBEFF2',
    borderRight: '1px solid #EBEFF2',
    borderBottom: '1px solid #EBEFF2',
    textAlign: 'center',
    padding: '5px 0px',
  },
  iconReply: {
    marginRight: '8px',
  },
  iconReplyText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '165%',
    letterSpacing: '0.01em',
    color: '#848484',
  },
}));

const Update = () => {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box width="100%">
      <Accordion
        expanded={expanded === '01'}
        className={
          expanded == '01'
            ? classes.accordionContainerActive
            : classes.accordionContainerIsActive
        }
        onChange={handleChangeAccordion('01')}
      >
        <AccordionSummary
          className={classes.accordionSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="01bh-content"
          id="01bh-header"
        >
          <Typography
            className={classes.avatarWrapper}
            sx={{ width: '33%', flexShrink: 0 }}
          >
            {' '}
            Concept Design
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <Box sx={{ margin: 1 }} className={classes.descContainer}>
            <Stack border="1px solid #EBEFF2" padding="15px">
              <Stack direction="row" justifyContent="space-between">
                <Stack alignItems="center" direction="row">
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
                  <CheckCircleIcon className={classes.icoCheck} />
                  <p className={classes.txtResolved}>Resolved</p>
                </Stack>
              </Stack>
              <p className={classes.descriptionPost}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo.
              </p>
            </Stack>
            <Stack onClick={() => setOpen(!open)}>
              <Box className={classes.replyContainer}>
                <span className={classes.iconReplyText}>3 Comments</span>
              </Box>
            </Stack>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Stack
                padding="15px"
                borderLeft="1px solid #EBEFF2"
                borderRight="1px solid #EBEFF2"
                borderBottom="1px solid #EBEFF2"
              >
                <div>
                  <Stack alignItems="center" direction="row">
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
                </div>
                <div>
                  <Stack alignItems="center" direction="row">
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
                </div>
                <div>
                  <Stack alignItems="center" direction="row">
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
                </div>
              </Stack>
              <Stack
                padding="15px"
                borderLeft="1px solid #EBEFF2"
                borderRight="1px solid #EBEFF2"
                borderBottom="1px solid #EBEFF2"
              >
                <Input
                  className={classes.inputComment}
                  placeholder="Type a message..."
                  inputProps={ariaLabel}
                />
              </Stack>
            </Collapse>
          </Box>

          <Box sx={{ margin: 1 }} className={classes.descContainer}>
            <Stack border="1px solid #EBEFF2" padding="15px">
              <Stack direction="row" justifyContent="space-between">
                <Stack alignItems="center" direction="row">
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
                  <CheckCircleIcon className={classes.icoCheck} />
                  <p className={classes.txtResolved}>Resolved</p>
                </Stack>
              </Stack>
              <p className={classes.descriptionPost}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo.
              </p>
            </Stack>
            <Stack onClick={() => setOpen1(!open1)}>
              <Box className={classes.replyContainer}>
                <img
                  className={classes.iconReply}
                  src={IconReply}
                  alt="reply icon"
                />
                <span className={classes.iconReplyText}>Reply</span>
              </Box>
            </Stack>
            <Collapse in={open1} timeout="auto" unmountOnExit>
              <Stack
                padding="15px"
                borderLeft="1px solid #EBEFF2"
                borderRight="1px solid #EBEFF2"
                borderBottom="1px solid #EBEFF2"
              >
                <Input
                  className={classes.inputComment}
                  placeholder="Type a message..."
                  inputProps={ariaLabel}
                />
              </Stack>
            </Collapse>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Update;
