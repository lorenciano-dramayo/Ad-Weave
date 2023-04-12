import { useState } from 'react';

import PropTypes from 'prop-types';

import _ from 'lodash';

import {
  Box,
  Stack,
  Input,
  Card,
  Button,
  CardContent,
  Typography,
} from '@mui/material';

const Reference = ({ setReferenceLinks }) => {
  const [linkName, setLinkName] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (_.isEmpty(linkName) || _.isEmpty(linkUrl)) {
      console.log("Don't leave blank");
    } else {
      setReferenceLinks((prevState) => [
        ...prevState,
        ...[
          {
            name: linkName,
            url: linkUrl,
          },
        ],
      ]);

      setLinkName('');
      setLinkUrl('');
    }
  };

  const handleNameChange = (e) => {
    setLinkName(e.target.value);
  };

  const handleURLChange = (e) => {
    setLinkUrl(e.target.value);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={(e) => handleSubmit(e)}
    >
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="secondary" gutterBottom>
            Fill in both name and url, to save hit enter key.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Input
              fullWidth
              placeholder="Name"
              onChange={(e) => handleNameChange(e)}
              value={linkName}
              required
            />
            <Input
              fullWidth
              placeholder="Url"
              onChange={(e) => handleURLChange(e)}
              value={linkUrl}
              required
            />
          </Stack>

          <Button type="submit" sx={{ display: 'none' }}></Button>
        </CardContent>
      </Card>
    </Box>
  );
};

Reference.propTypes = {
  setReferenceLinks: PropTypes.func,
};

export default Reference;
