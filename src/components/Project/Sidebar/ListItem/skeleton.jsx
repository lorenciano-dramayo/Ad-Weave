import React, { Fragment } from 'react';
// App Components
import CustomSkeletonLoader from 'components/Common/Skeleton';

const SkeletonLoader = () => {
  return (
    <Fragment>
      <CustomSkeletonLoader height={45} />
      <CustomSkeletonLoader height={45} />
      <CustomSkeletonLoader height={45} />
      <CustomSkeletonLoader height={45} />
      <CustomSkeletonLoader height={45} />
    </Fragment>
  );
};

export default SkeletonLoader;
