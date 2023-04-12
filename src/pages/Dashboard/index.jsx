import React from 'react';
// Context
import { DashboardProvider } from 'pages/Dashboard/Context';
import Main from 'pages/Dashboard/views/Main';

export default function Dashboard() {
  return (
    <DashboardProvider>
      <Main />
    </DashboardProvider>
  );
}
