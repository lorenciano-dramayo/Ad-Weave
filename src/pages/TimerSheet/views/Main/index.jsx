import React, { useContext } from 'react';

import TimerSheetContext from 'pages/TimerSheet/Context';

import Header from 'pages/TimerSheet/components/Header';
import TableSheet from 'pages/TimerSheet/components/TableSheet';
import Graphs from 'pages/TimerSheet/components/Graphs';

import Loader from 'pages/TimerSheet/components/Loader';

import { Stack } from '@mui/material';

export default function Main() {
  const {
    timesheetFilterData,
    optionTimeSheet,
    isTimeSheetFetching,
    isOptionTimeSheetFetching,
    handleFilter,
    handleSearch,
    handleRedirect,
  } = useContext(TimerSheetContext);

  return (
    <Stack px={5} py={3} spacing={2}>
      <Graphs />
      {isTimeSheetFetching && isOptionTimeSheetFetching && <Loader />}
      <Header
        onSearch={handleSearch}
        onFilter={handleFilter}
        optionList={optionTimeSheet}
      />
      <TableSheet
        timesheetData={timesheetFilterData}
        handleRedirect={handleRedirect}
        handleFilter={handleFilter}
        isTimeSheetFetching={isTimeSheetFetching}
      />
    </Stack>
  );
}
