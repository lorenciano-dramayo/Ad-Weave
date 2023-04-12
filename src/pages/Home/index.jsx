import React, { useEffect, Suspense, lazy, Fragment } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import _ from 'lodash';

import {
  Switch,
  Route,
  useRouteMatch,
  useLocation,
  Redirect,
} from 'react-router-dom';

// App components
import SuspenseLoader from 'components/Common/SuspenseLoader';

import { logout } from 'store/reducers/auth';

import Task from 'pages/Task';
import Campaign from 'pages/Campaign';

const Dashboard = lazy(() => import('pages/Dashboard'));
const Maintenance = lazy(() => import('pages/Maintenance'));
const Profile = lazy(() => import('pages/Profile'));
const Project = lazy(() => import('pages/Project/index'));
const Favorites = lazy(() => import('pages/Favorites'));
const TimerSheet = lazy(() => import('pages/TimerSheet'));
const EodReport = lazy(() => import('pages/EodReport'));
const Support = lazy(() => import('pages/Support'));
const KnowledgeBase = lazy(() => import('pages/KnowledgeBase'));
const TaskRedirect = lazy(() => import('pages/Redirects/TaskRedirect'));

const KnowledgeBaseDetails = lazy(() =>
  import('pages/KnowledgeBase/CardsDetails')
);

const SidebarProject = lazy(() =>
  import('components/Common/Sidebar/SidebarProject')
);

// Affix
import Affix from 'components/Affix';

function Home() {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);
  const { path } = useRouteMatch();
  const location = useLocation();

  useEffect(() => {
    _.isNull(localStorage.getItem('local')) && dispatch(logout());
  }, []);

  const background = location.state && location.state.background;

  return (
    <Fragment>
      <Suspense fallback={<SuspenseLoader />}>
        <Switch location={background || location}>
          <Route exact path={`${path}profile`} component={Profile} />
          <Route
            exact
            path={`${path}maintenance/:title`}
            component={Maintenance}
          />

          <Route
            exact
            path={`${path}knowledge-base`}
            component={KnowledgeBase}
          />
          <Route
            exact
            path={`${path}knowledge-base/details`}
            component={KnowledgeBaseDetails}
          />
          <Route
            exact
            path={`${path}crm/admin/tasks/view/:oldId`}
            component={TaskRedirect}
          />
          <Route exact path={`${path}support`} component={Support} />
          <Route exact path={`${path}favorites`} component={Favorites} />
          <Route path={`${path}projects`} component={Project} />
          <Route exact path={`${path}timesheet`} component={TimerSheet} />
          <Route path={`${path}dashboard`} component={Dashboard} />
          <Route exact path={`${path}eod-report`} component={EodReport} />
          {/* <Route path={`/task/:taskId`} component={Task} />
          <Route path={`/subtask/:taskId`} component={Task} />
          <Route exact path={`/campaign/:campaignId`} component={Campaign} /> */}
          <Route
            path={`${path}`}
            render={() => <Redirect to={`${path}dashboard`} />}
          />
          <Route exact path="*" component={SidebarProject} />
        </Switch>
        {/* {background && <Route path={`/task/:taskId`} component={Task} />} */}
        <Route path={`/task/:taskId`} component={Task} />

        {/* {background && <Route path={`/subtask/:taskId`} component={Task} />} */}
        <Route path={`/subtask/:taskId`} component={Task} />

        {/* {background && (
          <Route exact path={`/campaign/:campaignId`} component={Campaign} />
        )} */}
        <Route exact path={`/campaign/:campaignId`} component={Campaign} />
      </Suspense>

      {/* Affix */}
      {!user?.first_login &&
        location.pathname !== '/profile' &&
        location.pathname !== '/timesheet' && <Affix />}
    </Fragment>
  );
}

export default Home;
