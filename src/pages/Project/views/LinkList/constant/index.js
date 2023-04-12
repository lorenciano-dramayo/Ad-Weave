export const counter_options = [
  'This Week',
  'This Month',
  'This Year',
  'Custom',
];

export const inprogress_options = ['All', 'On Track', 'Critical', 'Overdue'];

export const open_options = ['All', 'New', 'Re-opened'];

export const my_tasks_options = [];

export const queues_options = [
  {
    name: 'All Tasks',
    slug: 'all_task',
  },
  {
    name: 'Unassigned',
    slug: 'unassigned',
  },
  {
    name: 'Unresponded',
    slug: 'unresponded',
  },
  {
    name: 'Due Today',
    slug: 'due_today',
  },
  {
    name: 'My Tasks',
    slug: 'my_tasks',
  },
];

export const sort_options = [
  {
    name: 'Name',
    slug: 'name',
    sortKey: 'name',
    sortType: '',
  },
  {
    name: 'Created',
    slug: 'created',
    sortKey: 'created_at',
    sortType: '',
  },
  {
    name: 'Submitted',
    slug: 'submitted',
    sortKey: 'date_submitted',
    sortType: '',
  },
  {
    name: 'Due',
    slug: 'due',
    sortKey: 'due_date',
    sortType: '',
  },
  {
    name: 'Delivery',
    slug: 'delivery',
    sortKey: 'delivery_date',
    sortType: 'delivery_date',
  },
];

export const more_options = [
  {
    name: 'EOD Report',
    slug: 'eod_report',
  },
  {
    name: 'Resources',
    slug: 'resources',
  },
  {
    name: 'Dev Dash',
    slug: 'dev_dash',
  },
];

export const summary_devdash = [
  {
    name: 'On Track',
    slug: 'onTrack',
  },
  {
    name: 'Critical',
    slug: 'critical',
  },
  {
    name: 'Overdue',
    slug: 'overdue',
  },
  {
    name: 'Completed',
    slug: 'completed',
  },
];

export const filter_list = [
  {
    name: 'Channel',
    slug: 'channel',
    options: [
      {
        name: 'Google Display',
        value: 1,
      },
      {
        name: 'Google Video',
        value: 2,
      },
      {
        name: 'Meta Static',
        value: 3,
      },
      {
        name: 'Meta Video',
        value: 4,
      },
      {
        name: 'Youtube',
        value: 5,
      },
    ],
  },
  {
    name: 'Categories',
    slug: 'categories',
  },
  {
    name: 'Task Type',
    slug: 'taskType',
  },



];
