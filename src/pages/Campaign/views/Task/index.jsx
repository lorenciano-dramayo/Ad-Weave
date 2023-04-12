import { useEffect } from 'react';

import _ from 'lodash';

import { useSelector } from 'react-redux';
import { transformCampaigns } from 'utils/dictionary';
import { Box, Stack, Typography, Card, IconButton } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PropTypes from 'prop-types';

import ProjectProgress from 'components/Project/Progress';
import { useState } from 'react';

const Task = ({ campaignId }) => {
  const { overview, table } = useSelector((state) => state.concept);

  const [selectedCampaign, setSelectedCampaign] = useState({});

  useEffect(() => {
    setSelectedCampaign(
      ..._.filter(
        table?.campaign,
        (campaign) => campaign.dataset.rows[0].id == campaignId
      )
    );
  }, []);

  return (
    <Box>
      {!_.isEmpty(selectedCampaign?.dataset?.rows[0]?.subdata?.rows ?? []) ? (
        // selectedCampaign.map((progress, index) => (
        <ProjectProgress {...selectedCampaign} overview={overview} isCampaign />
      ) : (
        // ))
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
                No task found for this campaign.
              </Typography>
            </Box>
          </Stack>
        </Card>
      )}
    </Box>
  );
};

Task.propTypes = {
  campaignId: PropTypes.any,
};

export default Task;
