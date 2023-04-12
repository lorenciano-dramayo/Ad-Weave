import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { DesktopTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

import {
  Box,
  Grid,
  TextField,
  Paper,
  Button,
  Avatar,
  styled,
  Typography,
  Autocomplete,
  Divider,
} from '@mui/material';

const StyledPaperImage = styled(Paper)`
  background-color: rgb(255, 255, 255);
  color: rgb(33, 43, 54);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-image: none;
  overflow: hidden;
  position: relative;
  box-shadow: rgb(145 158 171 / 20%) 0px 0px 2px 0px,
    rgb(145 158 171 / 12%) 0px 12px 24px -4px;
  border-radius: 16px;
  z-index: 0;
  padding: 80px 24px;
  text-align: center;
`;

const StyledPaperContent = styled(Paper)`
  background-color: rgb(255, 255, 255);
  color: rgb(33, 43, 54);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-image: none;
  overflow: hidden;
  position: relative;
  box-shadow: rgb(145 158 171 / 20%) 0px 0px 2px 0px,
    rgb(145 158 171 / 12%) 0px 12px 24px -4px;
  border-radius: 16px;
  z-index: 0;
`;

const StyledButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  font-weight: 700;
  line-height: 1.71429;
  font-size: 0.875rem;
  text-transform: capitalize;
  min-width: 64px;
  padding: 6px 16px;
  border-radius: 8px;
  color: rgb(255, 255, 255);
  box-shadow: #f2207633 0px 8px 16px 0px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const StyledBox = styled(Box)`
  width: 144px;
  height: 144px;
  margin: auto;
  border-radius: 50%;
  padding: 8px;
  border: 1px dashed rgba(145, 158, 171, 0.32);
  cursor: pointer;
`;

const StyledAvatar = styled(Avatar)`
  z-index: 0;
  width: 100%;
  height: 100%;
  outline: none;
  display: flex;
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const StyledAvatarBox = styled(Box)`
  z-index: 1;
  width: 125px;
  height: 125px;
  margin: auto;
  border-radius: 50%;
  padding: 8px;
  border: 1px dashed rgba(145, 158, 171, 0.32);
  cursor: pointer;
  position: absolute;
`;

const StyledTypography = styled(Typography)`
  margin: 16px auto 0px;
  line-height: 1.5;
  font-size: 0.75rem;
  font-family: 'Public Sans', sans-serif;
  font-weight: 400;
  color: rgb(99, 115, 129);
  display: block;
  text-align: center;
`;

export default function General({
  setTab,
  user,
  partners,
  timezone,
  days,
  selectFiles,
  phone,
  setPhone,
  startDay,
  setStartDay,
  endDay,
  setEndDay,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  uTimezone,
  setTimeZone,
  upartners,
  setPartners,
  handleProfilePicUpload,
  handleSaveChanges,
  handleSaveGeneral,
}) {
  const handleNext = () => {
    setTab(1);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StyledPaperImage>
            <StyledBox>
              <StyledAvatarBox
                sx={{
                  opacity: 0,
                  ':hover': {
                    background: '#000',
                    opacity: 0.5,
                  },
                }}
                onClick={() => {
                  selectFiles({ multiple: false, accept: 'image/*' }, (files) =>
                    handleProfilePicUpload(files)
                  );
                }}
              />
              {!_.isEmpty(user?.profile_picture) &&
              user?.profile_picture?.split('/').pop() !== 'thumb_' ? (
                <StyledAvatar
                  sx={{
                    fontSize: '3em',
                    background: '#5025c4',
                    textTransform: 'capitalize',
                    ':hover': {},
                  }}
                  alt={user.fullname}
                  src={user.profile_picture}
                />
              ) : (
                <StyledAvatar
                  sx={{
                    fontSize: '3em',
                    background: '#5025c4',
                  }}
                >
                  {`${user?.fullname?.split(' ')[0][0]}${
                    !_.isEmpty(user?.fullname?.split(' ')[1][0])
                      ? user?.fullname?.split(' ')[1][0]
                      : ''
                  }`}
                </StyledAvatar>
              )}
            </StyledBox>
            <StyledTypography>
              Allowed *.jpeg, *.jpg, *.png, *.gif
              <br /> max size of 3 MB
            </StyledTypography>
          </StyledPaperImage>
        </Grid>
        <Grid item xs={12} md={8}>
          <StyledPaperContent>
            <Grid container>
              <Grid item xs={12}>
                <Grid container spacing={3} pt={3} px={3}>
                  <Grid item xs={12}>
                    <TextField
                      label="Name"
                      variant="outlined"
                      value={user?.fullname}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      value={user?.email}
                      disabled
                    />
                  </Grid>
                </Grid>
                {/* User Basic info */}

                {user?.first_login ? (
                  <Divider
                    sx={{
                      margin: '12px 0',
                      borderColor: 'rgb(0 0 0 / 5%)',
                      fontWeight: 700,
                      fontSize: '12px',
                      color: '#898989',
                    }}
                  >
                    Why do we need this?
                  </Divider>
                ) : (
                  <Divider
                    sx={{
                      margin: '24px 0',
                      borderColor: 'rgb(0 0 0 / 5%)',
                    }}
                  />
                )}

                <Grid container spacing={3} px={3}>
                  <Grid item xs={12}>
                    <PhoneInput
                      label="Contact"
                      enableSearch={true}
                      variant="outlined"
                      country={'ph'}
                      onChange={(phone) => setPhone(phone)}
                      value={phone}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      freeSolo
                      value={_.filter(days, (day) => day?.name === startDay)[0]}
                      options={days}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Start Day"
                          helperText={
                            _.isEmpty(startDay) && 'Please select Start Day'
                          }
                          required
                          sx={{
                            '.MuiFormHelperText-root': {
                              color: '#f22076',
                            },
                          }}
                        />
                      )}
                      onChange={(event, newValue) => {
                        setStartDay(newValue?.name);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      freeSolo
                      options={days}
                      value={_.filter(days, (day) => day?.name === endDay)[0]}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="End Day"
                          helperText={
                            _.isEmpty(endDay) && 'Please select End Day'
                          }
                          required
                          sx={{
                            '.MuiFormHelperText-root': {
                              color: '#f22076',
                            },
                          }}
                        />
                      )}
                      onChange={(event, newValue) => {
                        setEndDay(newValue?.name);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopTimePicker
                        value={startTime}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Start Time"
                            helperText={
                              _.isNull(startTime) && 'Please set a Start Time'
                            }
                            required
                            sx={{
                              '.MuiFormHelperText-root': {
                                color: '#f22076',
                              },
                            }}
                          />
                        )}
                        inputFormat="hh:mm a"
                        onChange={(data) => setStartTime(data)}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopTimePicker
                        value={endTime}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="End Time"
                            helperText={
                              _.isNull(endTime) && 'Please set an End Time'
                            }
                            required
                            sx={{
                              '.MuiFormHelperText-root': {
                                color: '#f22076',
                              },
                            }}
                          />
                        )}
                        inputFormat="hh:mm a"
                        onChange={(data) => setEndTime(data)}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      freeSolo
                      options={timezone}
                      value={uTimezone}
                      onChange={(event, newValue) => {
                        setTimeZone(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Timezone"
                          helperText={
                            _.isEmpty(uTimezone) && 'Please a Timezone'
                          }
                          required
                          sx={{
                            '.MuiFormHelperText-root': {
                              color: '#f22076',
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                {/* Partner Follow */}
                {user?.first_login ? (
                  <Divider
                    sx={{
                      margin: '12px 0',
                      borderColor: 'rgb(0 0 0 / 5%)',
                      fontWeight: 700,
                      fontSize: '12px',
                      color: '#898989',
                    }}
                  >
                    Follow a Partner
                  </Divider>
                ) : (
                  <Divider
                    sx={{ margin: '24px 0', borderColor: 'rgb(0 0 0 / 5%)' }}
                  />
                )}

                <Grid container spacing={3} px={3}>
                  <Grid item xs={12}>
                    <Autocomplete
                      sx={{
                        '.MuiChip-root': {
                          borderRadius: '4px',
                          backgroundColor: '#25165B',
                          color: '#fff',
                          '.MuiChip-deleteIcon': {
                            color: 'rgb(255 255 255 / 26%)',
                            ':hover': {
                              color: '#fff',
                            },
                          },
                        },
                      }}
                      freeSolo
                      multiple
                      options={partners}
                      defaultValue={upartners}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField {...params} label="Partners" />
                      )}
                      onChange={(event, newValue) => {
                        setPartners(newValue);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box p={3} sx={{ justifyContent: 'flex-end', display: 'flex' }}>
              {user?.first_login ? (
                <StyledButton
                  color="secondary"
                  variant="contained"
                  onClick={handleNext}
                  disabled={
                    _.isEmpty(startDay) ||
                    _.isEmpty(endDay) ||
                    _.isNull(startTime) ||
                    _.isNull(endTime) ||
                    _.isEmpty(uTimezone)
                  }
                >
                  Next
                </StyledButton>
              ) : (
                <StyledButton
                  color="secondary"
                  variant="contained"
                  disabled={
                    _.isEmpty(startDay) ||
                    _.isEmpty(endDay) ||
                    _.isNull(startTime) ||
                    _.isNull(endTime) ||
                    _.isEmpty(uTimezone)
                  }
                  onClick={handleSaveGeneral}
                >
                  Save Changes
                </StyledButton>
              )}
            </Box>
          </StyledPaperContent>
        </Grid>
      </Grid>
    </Box>
  );
}

General.propTypes = {
  setTab: PropTypes.any,
  user: PropTypes.any,
  partners: PropTypes.any,
  timezone: PropTypes.any,
  days: PropTypes.any,
  selectFiles: PropTypes.any,
  phone: PropTypes.any,
  setPhone: PropTypes.any,
  startDay: PropTypes.any,
  setStartDay: PropTypes.any,
  endDay: PropTypes.any,
  setEndDay: PropTypes.any,
  startTime: PropTypes.any,
  setStartTime: PropTypes.any,
  endTime: PropTypes.any,
  setEndTime: PropTypes.any,
  uTimezone: PropTypes.any,
  setTimeZone: PropTypes.any,
  upartners: PropTypes.any,
  setPartners: PropTypes.any,
  handleProfilePicUpload: PropTypes.any,
  handleSaveChanges: PropTypes.any,
  handleSaveGeneral: PropTypes.any,
};
