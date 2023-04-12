import React from 'react';

import _ from 'lodash';

import PropTypes from 'prop-types';

import { useHistory, useLocation } from 'react-router-dom';

import toast from 'react-hot-toast';

// MUI

import { Alert, Typography, Button } from '@mui/material';

// Components
import Cards from 'pages/Dashboard/views/DesignQADash/Components/Cards';
import Fade from 'components/Common/Fade';

export default function Card({
  dash,
  onFieldUpdate,
  getDashData,
  handleReset,
  handleTaskUpdate,
}) {
  const history = useHistory();
  const location = useLocation();

  const handleTaskOpen = (e, id, rel_type) => {
    e.preventDefault();
    localStorage?.removeItem('isURL');
    history.push({
      pathname: `/${
        rel_type.toLowerCase().includes('task') ? rel_type : 'campaign'
      }/${id}`,
      search: history.location.search,
      state: {
        background: location,
        type: rel_type.toLowerCase().includes('task') ? rel_type : 'campaign',
        subtask: rel_type.toLowerCase() === 'subtask' ? true : false,
      },
    });

    
  };

  const handleCopyLink = (e, id, rel_type) => {
    e.preventDefault();
    
    navigator.clipboard.writeText(`${window.location.origin}/${rel_type}/${id}`)
        .then(() => {
        toast.success(
          () => ("Copied to clipboard."),
          { duration: 4000 }
        );
    })
        .catch(err => {
          toast.error(
            () => ('Something went wrong', err),
            { duration: 4000 }
          );
    })
  }

  return (
    <>
      {_.isEmpty(dash?.data) ? (
        <Alert
          variant="filled"
          severity="warning"
          sx={{
            backgroundColor: 'rgba(249,132,29,.05)',
            border: '2px solid rgba(249,132,29,.1)',
            '.MuiAlert-icon': {
              paddingTop: '13px',
              color: 'rgb(249 132 29 / 59%)',
              fontWeight: 700,
            },
          }}
          icon={false}
        >
          <Typography color="primary" variant="body1" mb={2}>
            There are no tasks found for your search &amp; filters.
          </Typography>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#ed6c02',
              color: '#ed6c02',
              '&:hover': { borderColor: '#ed6c02' },
            }}
            size="small"
            onClick={() => {
              getDashData(handleReset());
            }}
          >
            Reset
          </Button>
        </Alert>
      ) : (
        dash?.data?.map((data, index) => (
          <Fade in={true} key={index}>
            <Cards
              task={data}
              onTaskUpdate={handleTaskUpdate}
              handleClick={onFieldUpdate}
              handleTaskOpen={handleTaskOpen}
              handleCopyLink={handleCopyLink}
              range={dash?.data.length === index + 1}
              ended={data?.total === index + 1}
            />
          </Fade>
        ))
      )}
    </>
  );
}

Card.propTypes = {
  dash: PropTypes.any,
  onFieldUpdate: PropTypes.func,
  getDashData: PropTypes.func,
  dashData: PropTypes.any,
  handleReset: PropTypes.func,
  handleTaskUpdate: PropTypes.func,
};
