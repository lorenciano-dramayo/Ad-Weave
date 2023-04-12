import React from 'react';

import PropTypes from 'prop-types';

// hooks
import { useOnMount } from 'pages/Dashboard/hooks';

export default function DataLoader({ dashData, getDashData }) {
  useOnMount(() => getDashData(dashData));
  return <></>;
}

DataLoader.propTypes = {
  getDashData: PropTypes.any,
  dashData: PropTypes.any,
};
