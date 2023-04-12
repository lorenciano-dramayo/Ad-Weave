export const counters = [
  { name: 'Open', color: 'rgb(94 96 96 / 85%)', slug: 'open' },
  { name: 'Assigned', color: 'rgba(45, 153, 255, 0.85)', slug: 'assigned' },
  { name: 'In Progress', color: 'rgb(178 126 50 / 85%)', slug: 'in_progress' },
  {
    name: 'Awaiting Info',
    color: 'rgba(255, 108, 64, 0.85)',
    slug: 'awaiting_info',
  },
  { name: 'In Consult', color: 'rgb(103 58 183 / 83%)', slug: 'in_consult' },
  { name: 'Answered', color: 'rgba(235,30,115, 0.8)', slug: 'answered' },
  { name: 'Finished', color: 'rgba(0, 171, 85, 0.85)', slug: 'finished' },
];

export const tableHeader = [
  {
    name: 'Subject',
    size: 3,
    key: 'subject',
  },
  {
    name: 'Tags',
    size: 1,
    key: 'tags',
  },
  {
    name: 'Department',
    size: 1.5,
    key: 'department',
  },
  {
    name: 'Services',
    size: 1.5,
    key: 'service',
  },
  {
    name: 'Contacts',
    size: 1,
    key: 'contacts',
  },
  {
    name: 'Status',
    size: 1,
    key: 'status_name',
  },
  {
    name: 'Priority',
    size: 1,
    key: 'priority',
  },
  {
    name: 'Last Reply',
    size: 1,
    key: 'last_reply_date',
  },
  {
    name: 'Created',
    size: 1,
    key: 'date_created',
  },
];

export const drawerType = {
  newTicket: {
    name: 'Add ticket',
    width: 700,
  },
  headerFilter: {
    name: 'Filters',
    width: 400,
  },
};

export const filter_list = [
  {
    name: 'Department',
    slug: 'departments',
    type: 'multiselect',
  },
  {
    name: 'Services',
    slug: 'services',
    type: 'multiselect',
  },
  {
    name: 'Assigned by',
    slug: 'assigned_by',
    type: 'multiselect',
  },
  {
    name: 'Status',
    slug: 'status',
    type: 'multiselect',
  },
  {
    name: 'Priority',
    slug: 'priorities',
    type: 'multiselect',
  },
  {
    name: 'Tags',
    slug: 'tags',
    type: 'multiselect',
  },
];
