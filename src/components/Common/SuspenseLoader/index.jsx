// React
import { useEffect, Fragment } from 'react';
// Components
import NProgress from 'nprogress';

const SuspenseLoader = () => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return <Fragment></Fragment>;
};

export default SuspenseLoader;
