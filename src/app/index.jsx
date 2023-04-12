import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthenticatedRoutes from './AuthenticatedRoutes';

// App components
import SuspenseLoader from 'components/Common/SuspenseLoader';

// Pages
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const ForgotPassword = lazy(() => import('pages/ForgotPassword'));
const PasswordReset = lazy(() => import('pages/PasswordReset'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<SuspenseLoader />}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/password-reset/:key" component={PasswordReset} />
          <AuthenticatedRoutes component={Home} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
