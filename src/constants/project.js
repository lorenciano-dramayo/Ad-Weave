// Assets
import { GoogleIcon } from 'assets/icons';

export const progress = {
  google: {
    icon: <GoogleIcon sx={{ fontSize: '1.3rem' }} />,
    title: 'Display Progress',
    color: '#0F9D58',
  },
  facebook: {
    icon: <GoogleIcon sx={{ fontSize: '1.3rem' }} />,
    title: 'Social Progress',
    color: '#4285F4',
  },
  youtube: {
    icon: <GoogleIcon sx={{ fontSize: '1.3rem' }} />,
    title: 'Youtube Progress',
    color: '#DB4437',
  },
  concept: {
    title: 'Concept',
    color: '#0F9D58',
  },
  campaign: {
    title: 'Campaign',
    color: '#DB4437',
  },
  tasks: {
    title: 'Tasks',
    color: '#4285F4',
  },
};

/*
Concept table dataset structure
{
  columns: [],
  rows: [
    {
      isHeaderShown: true,
      // BE data starts here
      channels: '',
      name: '',
      status: '',
      dateCreated: '',
      dueDate: '',
      assignedTo: '',
      tags: '',
      // Array of Collapsible Dataset
      subdata: [],
    },
  ],
};
*/

export const conceptProgressDummy = [
  {
    header: {
      icon: <GoogleIcon sx={{ fontSize: '1.3rem' }} />,
      title: 'Display Progress',
      color: '#0F9D58',
    },
    dataset: {
      // First level
      columns: [
        'Tasks',
        'Status',
        'Date Created',
        'Due Date',
        'Assigned To',
        'Tags',
      ],
      rows: [
        {
          level: 1,
          // BE data starts here
          name: '1st Level - Display',
          status: 'Completed',
          dateCreated: '25Jan2022 03:22:59',
          dueDate: '31Jan2022 00:00:00',
          assignedTo: 'none',
          tags: 'none',
          subdata: {
            // Second level
            columns: [],
            rows: [
              {
                level: 2,
                // BE data starts here
                name: '2nd Level - Display',
                status: 'Completed',
                dateCreated: '25Jan2022 03:22:59',
                dueDate: '31Jan2022 00:00:00',
                assignedTo: 'none',
                tags: 'none',
                subdata: [],
              },
            ],
          },
        },
        {
          level: 1,
          // BE data starts here
          name: '1st Level - Display',
          status: 'Completed',
          dateCreated: '25Jan2022 03:22:59',
          dueDate: '31Jan2022 00:00:00',
          assignedTo: 'none',
          tags: 'none',
          subdata: {
            // Second level
            columns: [],
            rows: [
              {
                level: 2,
                // BE data starts here
                name: '2nd Level - Display',
                status: 'Completed',
                dateCreated: '25Jan2022 03:22:59',
                dueDate: '31Jan2022 00:00:00',
                assignedTo: 'none',
                tags: 'none',
                subdata: [],
              },
            ],
          },
        },
        {
          level: 1,
          // BE data starts here
          name: '1st Level - Display',
          status: 'Completed',
          dateCreated: '25Jan2022 03:22:59',
          dueDate: '31Jan2022 00:00:00',
          assignedTo: 'none',
          tags: 'none',
          subdata: {
            // Second level
            columns: [],
            rows: [
              {
                level: 2,
                // BE data starts here
                name: '2nd Level - Display',
                status: 'Completed',
                dateCreated: '25Jan2022 03:22:59',
                dueDate: '31Jan2022 00:00:00',
                assignedTo: 'none',
                tags: 'none',
                subdata: [],
              },
            ],
          },
        },
      ],
    },
  },
  {
    header: {
      icon: <GoogleIcon sx={{ fontSize: '1.3rem' }} />,
      title: 'Social Progress',
      color: '#4285F4',
    },
    dataset: {
      // First level
      columns: [
        'Campaigns',
        'Status',
        'Date Created',
        'Due Date',
        'Assigned To',
        'Tags',
      ],
      rows: [
        {
          level: 1,
          // BE data starts here
          name: '1st Level - Display',
          status: 'Completed',
          dateCreated: '25Jan2022 03:22:59',
          dueDate: '31Jan2022 00:00:00',
          assignedTo: 'none',
          tags: 'none',
          subdata: {
            // Second level
            columns: [
              'Sub Campaigns',
              'Status',
              'Date Created',
              'Due Date',
              'Assigned To',
              'Tags',
            ],
            rows: [
              {
                level: 2,
                // BE data starts here
                name: '2nd Level - Display',
                status: 'Completed',
                dateCreated: '25Jan2022 03:22:59',
                dueDate: '31Jan2022 00:00:00',
                assignedTo: 'none',
                tags: 'none',
                subdata: {
                  // Third level
                  columns: [
                    'Tasks',
                    'Status',
                    'Date Created',
                    'Due Date',
                    'Assigned To',
                    'Tags',
                  ],
                  rows: [
                    {
                      level: 3,
                      // BE data starts here
                      name: '3rd Level - Display',
                      status: 'Completed',
                      dateCreated: '25Jan2022 03:22:59',
                      dueDate: '31Jan2022 00:00:00',
                      assignedTo: 'none',
                      tags: 'none',
                      subdata: {
                        // Fourth level
                        columns: [],
                        rows: [
                          {
                            level: 4,
                            // BE data starts here
                            name: '4th Level - Display',
                            status: 'Completed',
                            dateCreated: '25Jan2022 03:22:59',
                            dueDate: '31Jan2022 00:00:00',
                            assignedTo: 'none',
                            tags: 'none',
                            subdata: [],
                          },
                          {
                            level: 4,
                            // BE data starts here
                            name: '4th Level - Display',
                            status: 'Completed',
                            dateCreated: '25Jan2022 03:22:59',
                            dueDate: '31Jan2022 00:00:00',
                            assignedTo: 'none',
                            tags: 'none',
                            subdata: [],
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                level: 2,
                // BE data starts here
                name: '2nd Level - Display',
                status: 'Completed',
                dateCreated: '25Jan2022 03:22:59',
                dueDate: '31Jan2022 00:00:00',
                assignedTo: 'none',
                tags: 'none',
                subdata: {
                  // Third level
                  columns: [
                    'Tasks',
                    'Status',
                    'Date Created',
                    'Due Date',
                    'Assigned To',
                    'Tags',
                  ],
                  rows: [
                    {
                      level: 3,
                      // BE data starts here
                      name: '3rd Level - Display',
                      status: 'Completed',
                      dateCreated: '25Jan2022 03:22:59',
                      dueDate: '31Jan2022 00:00:00',
                      assignedTo: 'none',
                      tags: 'none',
                      subdata: {
                        // Fourth level
                        columns: [],
                        rows: [
                          {
                            level: 4,
                            // BE data starts here
                            name: '4th Level - Display',
                            status: 'Completed',
                            dateCreated: '25Jan2022 03:22:59',
                            dueDate: '31Jan2022 00:00:00',
                            assignedTo: 'none',
                            tags: 'none',
                            subdata: [],
                          },
                          {
                            level: 4,
                            // BE data starts here
                            name: '4th Level - Display',
                            status: 'Completed',
                            dateCreated: '25Jan2022 03:22:59',
                            dueDate: '31Jan2022 00:00:00',
                            assignedTo: 'none',
                            tags: 'none',
                            subdata: [],
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          level: 1,
          // BE data starts here
          name: '1st Level - Display',
          status: 'Completed',
          dateCreated: '25Jan2022 03:22:59',
          dueDate: '31Jan2022 00:00:00',
          assignedTo: 'none',
          tags: 'none',
          subdata: {
            // Second level
            columns: [
              'Sub Campaigns',
              'Status',
              'Date Created',
              'Due Date',
              'Assigned To',
              'Tags',
            ],
            rows: [
              {
                level: 2,
                // BE data starts here
                name: '2nd Level - Display',
                status: 'Completed',
                dateCreated: '25Jan2022 03:22:59',
                dueDate: '31Jan2022 00:00:00',
                assignedTo: 'none',
                tags: 'none',
                subdata: {
                  // Third level
                  columns: [
                    'Tasks',
                    'Status',
                    'Date Created',
                    'Due Date',
                    'Assigned To',
                    'Tags',
                  ],
                  rows: [
                    {
                      level: 3,
                      // BE data starts here
                      name: '3rd Level - Display',
                      status: 'Completed',
                      dateCreated: '25Jan2022 03:22:59',
                      dueDate: '31Jan2022 00:00:00',
                      assignedTo: 'none',
                      tags: 'none',
                      subdata: {
                        // Fourth level
                        columns: [],
                        rows: [
                          {
                            level: 4,
                            // BE data starts here
                            name: '4th Level - Display',
                            status: 'Completed',
                            dateCreated: '25Jan2022 03:22:59',
                            dueDate: '31Jan2022 00:00:00',
                            assignedTo: 'none',
                            tags: 'none',
                            subdata: [],
                          },
                          {
                            level: 4,
                            // BE data starts here
                            name: '4th Level - Display',
                            status: 'Completed',
                            dateCreated: '25Jan2022 03:22:59',
                            dueDate: '31Jan2022 00:00:00',
                            assignedTo: 'none',
                            tags: 'none',
                            subdata: [],
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                level: 2,
                // BE data starts here
                name: '2nd Level - Display',
                status: 'Completed',
                dateCreated: '25Jan2022 03:22:59',
                dueDate: '31Jan2022 00:00:00',
                assignedTo: 'none',
                tags: 'none',
                subdata: {
                  // Third level
                  columns: [
                    'Tasks',
                    'Status',
                    'Date Created',
                    'Due Date',
                    'Assigned To',
                    'Tags',
                  ],
                  rows: [
                    {
                      level: 3,
                      // BE data starts here
                      name: '3rd Level - Display',
                      status: 'Completed',
                      dateCreated: '25Jan2022 03:22:59',
                      dueDate: '31Jan2022 00:00:00',
                      assignedTo: 'none',
                      tags: 'none',
                      subdata: {
                        // Fourth level
                        columns: [],
                        rows: [
                          {
                            level: 4,
                            // BE data starts here
                            name: '4th Level - Display',
                            status: 'Completed',
                            dateCreated: '25Jan2022 03:22:59',
                            dueDate: '31Jan2022 00:00:00',
                            assignedTo: 'none',
                            tags: 'none',
                            subdata: [],
                          },
                          {
                            level: 4,
                            // BE data starts here
                            name: '4th Level - Display',
                            status: 'Completed',
                            dateCreated: '25Jan2022 03:22:59',
                            dueDate: '31Jan2022 00:00:00',
                            assignedTo: 'none',
                            tags: 'none',
                            subdata: [],
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  // {
  //   header: {
  //     icon: <GoogleIcon sx={{ fontSize: '1.3rem' }} />,
  //     title: 'Social Progress',
  //     color: '#4285F4',
  //   },
  // },
  // {
  //   header: {
  //     icon: <GoogleIcon sx={{ fontSize: '1.3rem' }} />,
  //     title: 'Youtube Progress',
  //     color: '#DB4437',
  //   },
  // },
  // {
  //   header: {
  //     icon: <GoogleIcon sx={{ fontSize: '1.3rem' }} />,
  //     title: 'Display Progress',
  //     color: '#0F9D58',
  //   },
  // },
];
