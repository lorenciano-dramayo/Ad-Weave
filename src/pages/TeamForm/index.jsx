import { Container, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect } from 'react';
import PurpleShape from 'assets/shapes/PurpleShape';
import PinkShape from 'assets/shapes/PinkShape';
import SmallPinkShape from 'assets/shapes/SmallPinkShape';
import SelectField from 'components/Common/SelectField';
import Button from 'components/Common/Button';
import CheckIcon from 'assets/icons/CheckIcon';
import ArrowIcon from 'assets/icons/ArrowIcon';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from 'store/reducers/teams';
// import { updateUserTeam } from 'store/reducers/users';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  container: {
    height: '100vh',
    paddingLeft: 0,
    paddingRight: 0,
  },
  form: {
    width: '100%',
    maxWidth: '520px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  label: {
    fontSize: '1.125rem',
    lineHeight: '3.5em',
  },
  selectRoot: {
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    '& > div': {
      paddingLeft: 0,
    },
  },
  button: {
    borderRadius: '5px',
    width: '80px',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  checkIcon: {
    color: 'transparent',
    '& > path': {
      stroke: '#fff',
    },
  },
  icon: {
    width: '18px',
    height: '18px',
  },
  upArrow: {
    transform: 'rotate(-180deg)',
  },
  arrowButton: {
    minWidth: 'inherit',
    width: '47px',
    height: '39px',
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  leftArrowButton: {
    borderTopLeftRadius: '3px',
    borderBottomLeftRadius: '3px',
    marginRight: '2px',
  },
  rightArrowButton: {
    borderTopRightRadius: '3px',
    borderBottomRightRadius: '3px',
    marginLeft: '2px',
  },
  adweaveButton: {
    textTransform: 'none',
    width: '234px',
    paddingLeft: '19px',
    paddingRight: '19px',
    borderRadius: '3px',
  },
}));

const TeamForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const { user, saving, error } = useSelector((state) => state.auth);
  const teamOptions = useSelector((state) => {
    const options = state.teams.list?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    }));

    return options;
  });

  useEffect(() => {
    if (user?.teamId) {
      history.replace('/');
    }
  }, [user, history]);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const onSubmit = (data) => {
    // dispatch(updateUserTeam(data, { endpoint: `users/${user.id}/team` }));
  };

  return (
    <Container className={classes.container} maxWidth={false}>
      <Box display="flex" height="22.5%">
        <PinkShape />
        <PurpleShape />
        <SmallPinkShape />
      </Box>
      <form
        autoComplete="off"
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <SelectField
          name="team"
          placeholder="Select an option"
          label="Welcome to Ad-Weave John Wick. Please select your team."
          required
          options={teamOptions}
          control={control}
          labelClass={classes.label}
          className={classes.selectRoot}
          error={!!error?.team}
          disabled={saving}
        />
        <Button
          type="submit"
          color="primary"
          className={classes.button}
          disabled={saving}
          endIcon={
            <CheckIcon className={clsx(classes.icon, classes.checkIcon)} />
          }
        >
          OK
        </Button>
      </form>
      <Box className={classes.footer}>
        <Box marginX={1}>
          <Button
            className={clsx(classes.arrowButton, classes.leftArrowButton)}
          >
            <ArrowIcon className={clsx(classes.icon, classes.upArrow)} />
          </Button>
          <Button
            className={clsx(classes.arrowButton, classes.rightArrowButton)}
          >
            <ArrowIcon className={clsx(classes.icon)} />
          </Button>
        </Box>
        <Box marginX={1} marginRight={4}>
          <Button className={classes.adweaveButton}>Powered by Ad-Weave</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TeamForm;
