import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {
  Box,
  Grid,
  Select,
  FormControl,
  Collapse,
  Avatar,
  Stack,
  MenuItem,
  InputLabel,
  Input,
  TextField,
  Button,
} from '@mui/material';
import FilesDummyImage from 'assets/files_dummy.png';

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
    display: 'flex',
    justifyContent: 'space-around',
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
  txtPosition: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '20px',
    color: '#171717',
    marginBottom: '0px',
    marginTop: '8px',
  },
  txtName: {
    color: '#192A3E',
    letterSpacing: '0.01em',
    fontWeight: '500',
    fontSize: '12px',
    margin: '-8px 10px 0 0 ',
  },
  txtLinksPink: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '14px',
    display: 'flex',
    alignItems: 'center',
    margin: '0',
    color: '#F22076',
    marginBottom: '10px',
  },
  txtonClick: {
    margin: '10px 0px',
  },
  commentContainer: {
    marginBottom: '15px',
  },
  avatarContainer: {
    padding: '10px',
    border: '1px solid #EEEEEE',
    marginRight: '15px',
  },
  txtStatus: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '20px',
    color: '#5887FF',
    background: 'rgba(88, 135, 255, 0.1)',
    borderRadius: '100px',
    padding: '8px 13px',
  },
  addNewContainer: {
    border: '1px dashed #F22076',
    boxSizing: 'border-box',
    borderRadius: '4px',
    color: '#F22076',
    textAlign: 'center',
    padding: '10px 0px',
    marginBottom: '20px',
  },
  txtConsultationForm: {
    margin: '8px 0px',
    textAlign: 'center',
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '120%',
    letterSpacing: '0.005em',

    color: '#323338',
  },
  buttonAddContainer: {
    textAlign: 'right',
    margin: '10px 0px',
  },
  btnCancel: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#484964',
  },
  btnApply: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#808192',
  },
  consultationContainer: {
    marginBottom: '35px',
  },
}));

const Consultation = () => {
  const classes = useStyles();
  const [comments, setComment] = React.useState(false);
  const [files, setFiles] = React.useState(false);
  const [referenceLink, setReferenceLink] = React.useState('');
  const [consultationType, setConsultationType] = React.useState('');

  const handleChangeReferenceLink = (event) => {
    setReferenceLink(event.target.value);
  };

  const handleChangeConsultationType = (event) => {
    setConsultationType(event.target.value);
  };

  return (
    <Box width="100%">
      <Box className={classes.addNewContainer}>Add New</Box>
      <Stack
        border="1px solid #EBEFF2"
        padding="15px"
        className={classes.consultationContainer}
      >
        <Box>
          <h4 className={classes.txtConsultationForm}>Consultation Form</h4>
        </Box>
        <FormControl sx={{ m: 1, minWidth: '97.5%' }}>
          <InputLabel id="demo-simple-select-helper-label">
            Consultation Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={consultationType}
            label="Consultation Type"
            onChange={handleChangeConsultationType}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > :not(style)': { m: 1 },
          }}
        >
          <TextField id="demo-helper-text-misaligned-no-helper" label="Name" />
        </Box>
        <Box>
          <FormControl sx={{ m: 1, minWidth: '97.5%' }}>
            <InputLabel id="demo-simple-select-helper-label">
              Reference Link
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={referenceLink}
              label="Reference Link"
              onChange={handleChangeReferenceLink}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > :not(style)': { m: 1 },
          }}
        >
          <TextField id="demo-helper-text-misaligned-no-helper" type="file" />
        </Box>
        <Box className={classes.buttonAddContainer}>
          <Button className={classes.btnCancel}>Cancel</Button>
          <Button className={classes.btnApply}>Apply</Button>
        </Box>
      </Stack>

      <Stack border="1px solid #EBEFF2" padding="15px">
        <Stack direction="row" justifyContent="space-between">
          <Stack alignItems="center" direction="row">
            <Box className={classes.avatarContainer}>
              <Avatar
                alt="Remy Sharp"
                className={classes.avatarReply}
                src="/static/images/avatar/1.jpg"
              />
            </Box>
            <Stack direction="column">
              <p className={classes.txtPosition}>PM Consultation </p>
              <p className={classes.txtName}>Lindsey Stroud </p>
            </Stack>
          </Stack>
          <Box>
            <p className={classes.txtStatus}>Approved</p>
          </Box>
        </Stack>
        <p className={classes.descriptionPost}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo.
        </p>
        <p className={classes.txtLinksPink}>Creative Link</p>
        <p className={classes.txtLinksPink}>Storyboard Link</p>
        <p className={classes.txtLinksPink}>Netsle.JPG</p>
      </Stack>
      <Stack>
        <Box className={classes.replyContainer}>
          <Grid
            onClick={() => setComment(!comments)}
            item
            xs={12}
            sm={5}
            className={classes.iconReplyText}
          >
            <p className={classes.txtonClick}> 3 Comments</p>
          </Grid>
          <Grid
            onClick={() => setFiles(!files)}
            item
            xs={12}
            sm={5}
            className={classes.iconReplyText}
          >
            <p className={classes.txtonClick}>10 Files</p>
          </Grid>
        </Box>
      </Stack>
      <Collapse in={comments} timeout="auto" unmountOnExit>
        <Stack
          padding="20px"
          borderLeft="1px solid #EBEFF2"
          borderRight="1px solid #EBEFF2"
          borderBottom="1px solid #EBEFF2"
        >
          <div className={classes.commentContainer}>
            <Stack alignItems="center" direction="row">
              <Avatar
                alt="Remy Sharp"
                className={classes.avatarReply}
                src="/static/images/avatar/1.jpg"
              />
              <p className={classes.nameReply}>
                Lindsey Stroud <span className={classes.dateReply}>11:12</span>
              </p>
            </Stack>
            <p className={classes.desc}>
              Your idea for this application is nice!{' '}
            </p>
          </div>
          <div className={classes.commentContainer}>
            <Stack alignItems="center" direction="row">
              <Avatar
                alt="Remy Sharp"
                className={classes.avatarReply}
                src="/static/images/avatar/1.jpg"
              />
              <p className={classes.nameReply}>
                Lindsey Stroud <span className={classes.dateReply}>11:12</span>
              </p>
            </Stack>
            <p className={classes.desc}>
              Your idea for this application is nice!{' '}
            </p>
          </div>
          <div className={classes.commentContainer}>
            <Stack alignItems="center" direction="row">
              <Avatar
                alt="Remy Sharp"
                className={classes.avatarReply}
                src="/static/images/avatar/1.jpg"
              />
              <p className={classes.nameReply}>
                Lindsey Stroud <span className={classes.dateReply}>11:12</span>
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
      <Collapse in={files} timeout="auto" unmountOnExit>
        <Stack
          padding="15px"
          borderLeft="1px solid #EBEFF2"
          borderRight="1px solid #EBEFF2"
          borderBottom="1px solid #EBEFF2"
        >
          <Grid container>
            <Grid item xs={2}>
              <img src={FilesDummyImage} alt="sample" className="w-96" />
            </Grid>
            <Grid item xs={2}>
              <img src={FilesDummyImage} alt="sample" className="w-96" />
            </Grid>
            <Grid item xs={2}>
              <img src={FilesDummyImage} alt="sample" className="w-96" />
            </Grid>
            <Grid item xs={2}>
              <img src={FilesDummyImage} alt="sample" className="w-96" />
            </Grid>
            <Grid item xs={2}>
              <img src={FilesDummyImage} alt="sample" className="w-96" />
            </Grid>
            <Grid item xs={2}>
              <img src={FilesDummyImage} alt="sample" className="w-96" />
            </Grid>
          </Grid>
        </Stack>
      </Collapse>
    </Box>
  );
};

export default Consultation;
