// MUI
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
// App Components
import Button from 'components/Common/Button';
import InputField from 'components/Common/InputField';
import TimePicker from 'components/Common/TimePicker';
import DataPicker from 'components/Common/DataPicker';
import DatePicker from 'components/Common/DatePicker';
import MultiselectDataPicker from 'components/Common/MultiselectDataPicker';
//  Icons
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// Utilities
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  iconActive: {
    border: `1px solid ${theme.palette.secondary.main}`,
    padding: '1em',
    '& svg': {
      color: `${theme.palette.secondary.main}`,
    },
  },
  iconDefault: {
    border: '1px solid #92929D',
    padding: '1em',
    '& svg': {
      color: '#92929D',
    },
  },
  input: {
    width: '100%',
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 276,
    [theme.breakpoints.up('xs')]: {
      width: 200,
    },
    [theme.breakpoints.up('md')]: {
      width: 276,
    },
  },
}));

const ProfileDetail = ({
  svgIcon,
  title,
  content,
  variant,
  buttonTitle,
  buttonIcon,
  errorMessage,
  titleWidth = 120,
  isRequired = true,
  isIconHidden = false,
  isTitleHidden = false,
  isEditing = false,
  isSecured = false,
  ...props
}) => {
  const classes = useStyles();
  // Renders proper field based on variant props.
  const renderField = () => {
    switch (variant) {
      case 'input':
        return (
          <InputField
            containerClass={clsx(classes.input)}
            content={content}
            errorMessage={errorMessage}
            {...props}
          />
        );

      case 'time':
        return (
          <TimePicker
            className={clsx(classes.input)}
            errorMessage={errorMessage}
            {...props}
          />
        );
      case 'select':
        return (
          <DataPicker
            className={clsx(classes.input)}
            content={content}
            errorMessage={errorMessage}
            {...props}
          />
        );
      case 'multiselect':
        return (
          <MultiselectDataPicker
            className={clsx(classes.input)}
            content={content}
            {...props}
          />
        );
      case 'date':
        return <DatePicker className={clsx(classes.input)} {...props} />;
      case 'schedule':
        return (
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                '& .MuiFormControl-root': {
                  width: '100%',
                },
              }}
            >
              <DataPicker
                className={clsx(classes.input)}
                name="schedule_from"
                content={extractDays(content)[0]}
                {...props}
              />
              <Typography
                component="span"
                variant="caption"
                sx={{ mx: 1, color: '#323338' }}
              >
                to
              </Typography>
              <DataPicker
                className={clsx(classes.input)}
                name="schedule_to"
                content={extractDays(content)[1]}
                {...props}
              />
            </Box>
            {errorMessage && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: '4px',
                }}
              >
                <ErrorOutlineIcon
                  color="error"
                  sx={{ fontSize: '1.25em', mr: '4px' }}
                ></ErrorOutlineIcon>
                <Typography
                  variant="p"
                  sx={{
                    margin: '0 !important',
                    fontSize: '0.85em',
                    fontWeight: 300,
                    color: '#323338',
                  }}
                >
                  {errorMessage}
                </Typography>
              </Box>
            )}
          </Box>
        );
      case 'button':
        return (
          <Button endIcon={buttonIcon} {...props}>
            {buttonTitle}
          </Button>
        );
      default:
        return;
    }
  };

  const securedText = (text) => {
    return [...text].map(() => '•');
  };

  const extractDays = (text) => {
    let arr = text.split(' ');
    return [arr[0], arr[arr?.length - 1]];
  };

  return (
    <Box
      sx={{
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {!isIconHidden && (
        <Box
          sx={{
            mr: 2,
            width: 45,
            height: 45,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '22.5px',
          }}
          className={
            isEditing && isRequired ? classes.iconActive : classes.iconDefault
          }
        >
          {svgIcon}
        </Box>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {!isTitleHidden && (
          <Box width={titleWidth}>
            <Typography variant="h1" sx={{ fontSize: '1em', color: '#323338' }}>
              {title}:
            </Typography>
          </Box>
        )}
        <Box className={classes.profile}>
          {isEditing ? (
            renderField()
          ) : (
            <Typography
              variant="h1"
              sx={{
                color: '#676879',
                fontSize: isSecured ? '1.3em' : '1em',
                letterSpacing: isSecured ? 1.5 : 0,
              }}
            >
              {isSecured ? securedText(content) : content}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

ProfileDetail.propTypes = {
  variant: PropTypes.oneOf([
    'input',
    'time',
    'select',
    'multiselect',
    'date',
    'identification',
    'schedule',
    'button',
  ]),
  titleWidth: PropTypes.number,
  title: PropTypes.string,
  errorMessage: PropTypes.string,
  buttonTitle: PropTypes.string,
  content: PropTypes.string,
  contents: PropTypes.arrayOf(PropTypes.string),
  isRequired: PropTypes.bool,
  isIconHidden: PropTypes.bool,
  isTitleHidden: PropTypes.bool,
  isSecured: PropTypes.bool,
  isEditing: PropTypes.bool,
  svgIcon: PropTypes.element,
  buttonIcon: PropTypes.element,
  list: PropTypes.arrayOf(PropTypes.object),
};

export default ProfileDetail;
