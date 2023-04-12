import * as React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// MUI Components
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { makeStyles } from '@mui/styles';
//Icons
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
// import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';

//Icons
import AdweaveIcon from 'assets/icons/AdweaveIcon';

const actions = [
  { icon: <BallotOutlinedIcon />, name: 'Timesheets' },
  { icon: <TimerOutlinedIcon />, name: 'Task Timer' },
  // { icon: <TextSnippetOutlinedIcon />, name: 'Notes' },
];

const useStyles = makeStyles(() => ({
  staticTooltipLabel: {
    width: 'max-content',
    backgroundColor: '#4a299a',
    color: '#fff',
  },
  dial: {
    backgroundColor: '#4a299a',
    color: '#fff',
    fontSize: '1.2em',
    '&:hover': {
      backgroundColor: '#25165B',
    },
  },
}));

const SpeedDialTooltip = ({ setSelected }) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelect = (e) => {
    e.toLowerCase() === 'timesheets'
      ? history.push('/timesheet')
      : setSelected(e);

    setOpen(false);
  };

  return (
    <SpeedDial
      ariaLabel="Ad-Weave Affix"
      FabProps={{
        size: 'small',
        sx: {
          boxShadow: 'none',
        },
      }}
      icon={
        <SpeedDialIcon
          icon={<AdweaveIcon sx={{ transform: 'none !important' }} />}
          sx={{
            fontSize: '30px',
            height: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      }
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      sx={{ margin: open ? 'inherit' : '0 0.55em 0 0.52em' }}
    >
      {actions.map((action) => (
        <SpeedDialAction
          FabProps={{
            size: 'small',
          }}
          sx={{ display: open ? 'flex' : 'none' }}
          className={classes.dial}
          key={action.name}
          icon={action.icon}
          value={action.icon}
          classes={classes}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={() => handleSelect(action.name)}
        />
      ))}
    </SpeedDial>
  );
};

SpeedDialTooltip.propTypes = {
  setSelected: PropTypes.func.isRequired,
};

export default SpeedDialTooltip;
