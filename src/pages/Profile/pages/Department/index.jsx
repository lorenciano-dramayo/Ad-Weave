import React from 'react';
import _ from 'lodash';

import PropTypes from 'prop-types';

import {
  Paper,
  Grid,
  TextField,
  Button,
  Autocomplete,
  styled,
} from '@mui/material';

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
  padding: 24px;
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
  margin: 24px 0px 0px;
  float: right;
`;

export default function Department({
  setTab,
  user,
  teamList,
  setTeam,
  team,
  roles,
  role,
  setRole,
  handleSaveChanges,
}) {
  const handleNext = () => {
    setTab(2);
  };

  return (
    <StyledPaperContent>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Autocomplete
            freeSolo
            options={teamList}
            defaultValue={_.filter(teamList, (list) => list?.id === team)[0]}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Team" />}
            onChange={(event, newValue) => {
              setTeam(newValue?.id);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            freeSolo
            options={roles}
            defaultValue={
              _.filter(
                roles,
                (list) => list?.name?.toLowerCase() === role?.toLowerCase()
              )[0]
            }
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Roles" />}
            onChange={(event, newValue) => {
              setRole(newValue?.name);
            }}
            disabled
          />
        </Grid>
        {/* <Grid item xs={12}>
          <TextField label="Manager" variant="outlined" />
        </Grid> */}
      </Grid>
      {user?.first_login ? (
        <StyledButton
          color="secondary"
          variant="contained"
          onClick={handleNext}
        >
          Next
        </StyledButton>
      ) : (
        <StyledButton
          color="secondary"
          variant="contained"
          onClick={handleSaveChanges}
        >
          Save Changes
        </StyledButton>
      )}
    </StyledPaperContent>
  );
}

Department.propTypes = {
  setTab: PropTypes.any,
  user: PropTypes.any,
  teamList: PropTypes.any,
  setTeam: PropTypes.any,
  team: PropTypes.any,
  roles: PropTypes.any,
  role: PropTypes.any,
  setRole: PropTypes.any,
  handleSaveChanges: PropTypes.any,
};
