// Assets
import {} from 'theme/variables';

// Utils
import _ from 'lodash';
import theme from 'theme';
import { appColors } from 'theme/variables';

// Main Table Response Transformer

export const transformConcepts = (data, statuses) => {
  const {
    display_progress,
    google_video,
    social_static_progress,
    social_video_progress,
    youtube_video,
    campaigns,
  } = data;

  const hasCampaigns = !_.isEmpty(campaigns);

  return [
    !_.isEmpty(display_progress) && {
      header: {
        title: 'Google Display',
        color: hasCampaigns ? appColors.violet : '#0F9D58',
      },
      dataset: {
        // First level
        columns: [
          hasCampaigns ? 'Tasks' : 'Tasks',
          'Status',
          'Date Created',
          'Due Date',
          'Delivery Date',
          'Assigned To',
          'Tags',
        ],
        rows: display_progress.map((y) => ({
          // BE data starts here
          level: y.level,
          id: y.id,
          name: y.name || y.description,
          status: y.status,
          dateCreated: y.date_created,
          dueDate: y.due_date,
          deliveryDate: y.delivery_date,
          assignees: y.assignees,
          tags: y.tags,
          relType: y.rel_type,
          collection: {
            statuses: statuses,
          },
          subdata: {
            columns: [
              'Tasks',
              'Status',
              'Date Created',
              'Due Date',
              'Delivery Date',
              'Assigned To',
              'Tags',
            ],
            rows: y.sub_categories.map((z) => ({
              // BE data starts here
              level: z.level,
              id: z.id,
              name: z.name || z.description,
              status: z.status,
              dateCreated: z.date_created,
              dueDate: z.due_date,
              deliveryDate: z.delivery_date,
              assignees: z.assignees,
              tags: z.tags,
              relType: z.rel_type,
              collection: {
                statuses: statuses,
              },
              subdata: {},
            })),
            isColumnHeaderHidden: true,
          },
        })),
        isColumnHeaderHidden: false,
      },
    },
    !_.isEmpty(google_video) && {
      header: {
        title: 'Google Video',
        color: hasCampaigns ? appColors.violet : '#0F9D58',
      },
      dataset: {
        // First level
        columns: [
          hasCampaigns ? 'Tasks' : 'Tasks',
          'Status',
          'Date Created',
          'Due Date',
          'Delivery Date',
          'Assigned To',
          'Tags',
        ],
        rows: google_video.map((y) => ({
          // BE data starts here
          level: y.level,
          id: y.id,
          name: y.name || y.description,
          status: y.status,
          dateCreated: y.date_created,
          dueDate: y.due_date,
          deliveryDate: y.delivery_date,
          assignees: y.assignees,
          tags: y.tags,
          relType: y.rel_type,
          collection: {
            statuses: statuses,
          },
          subdata: {
            columns: [
              'Tasks',
              'Status',
              'Date Created',
              'Due Date',
              'Delivery Date',
              'Assigned To',
              'Tags',
            ],
            rows: y.sub_categories.map((z) => ({
              // BE data starts here
              level: z.level,
              id: z.id,
              name: z.name || z.description,
              status: z.status,
              dateCreated: z.date_created,
              dueDate: z.due_date,
              deliveryDate: z.delivery_date,
              assignees: z.assignees,
              tags: z.tags,
              relType: z.rel_type,
              collection: {
                statuses: statuses,
              },
              subdata: {},
            })),
            isColumnHeaderHidden: true,
          },
        })),
        isColumnHeaderHidden: false,
      },
    },
    !_.isEmpty(social_static_progress) && {
      header: {
        title: 'Social Static Progress',
        color: hasCampaigns ? appColors.violet : '#4285F4',
      },
      dataset: {
        // First level
        columns: [
          'Tasks',
          'Status',
          'Date Created',
          'Due Date',
          'Delivery Date',
          'Assigned To',
          'Tags',
        ],
        rows: social_static_progress.map((y) => ({
          // BE data starts here
          level: y.level,
          id: y.id,
          name: y.name || y.description,
          status: y.status,
          dateCreated: y.date_created,
          dueDate: y.due_date,
          deliveryDate: y.delivery_date,
          assignees: y.assignees,
          tags: y.tags,
          relType: y.rel_type,
          collection: {
            statuses: statuses,
          },
          subdata: {
            columns: [
              'Tasks',
              'Status',
              'Date Created',
              'Due Date',
              'Delivery Date',
              'Assigned To',
              'Tags',
            ],
            rows: y.sub_categories.map((z) => ({
              // BE data starts here
              level: z.level,
              id: z.id,
              name: z.name || z.description,
              status: z.status,
              dateCreated: z.date_created,
              dueDate: z.due_date,
              deliveryDate: z.delivery_date,
              assignees: z.assignees,
              tags: z.tags,
              relType: z.rel_type,
              collection: {
                statuses: statuses,
              },
              subdata: {},
            })),
          },
        })),
        isColumnHeaderHidden: false,
      },
    },
    !_.isEmpty(social_video_progress) && {
      header: {
        title: 'Social Video Progress',
        color: hasCampaigns ? appColors.violet : '#4285F4',
      },
      dataset: {
        // First level
        columns: [
          'Tasks',
          'Status',
          'Date Created',
          'Due Date',
          'Delivery Date',
          'Assigned To',
          'Tags',
        ],
        rows: social_video_progress.map((y) => ({
          // BE data starts here
          level: y.level,
          id: y.id,
          name: y.name || y.description,
          status: y.status,
          dateCreated: y.date_created,
          dueDate: y.due_date,
          deliveryDate: y.delivery_date,
          assignees: y.assignees,
          tags: y.tags,
          relType: y.rel_type,
          collection: {
            statuses: statuses,
          },
          subdata: {
            // Second level
            columns: [
              'Tasks',
              'Status',
              'Date Created',
              'Due Date',
              'Delivery Date',
              'Assigned To',
              'Tags',
            ],
            rows: y.sub_categories.map((z) => ({
              // BE data starts here
              level: z.level,
              id: z.id,
              name: z.name || z.description,
              status: z.status,
              dateCreated: z.date_created,
              dueDate: z.due_date,
              deliveryDate: z.delivery_date,
              assignees: z.assignees,
              tags: z.tags,
              relType: z.rel_type,
              collection: {
                statuses: statuses,
              },
              subdata: {},
            })),
            isColumnHeaderHidden: true,
          },
        })),
        isColumnHeaderHidden: false,
      },
    },
    !_.isEmpty(youtube_video) && {
      header: {
        title: 'Youtube Progress',
        color: hasCampaigns ? appColors.violet : '#BA202E',
      },
      dataset: {
        // First level
        columns: [
          'Tasks',
          'Status',
          'Date Created',
          'Due Date',
          'Delivery Date',
          'Assigned To',
          'Tags',
        ],
        rows: youtube_video.map((y) => ({
          // BE data starts here
          level: y.level,
          id: y.id,
          name: y.name || y.description,
          status: y.status,
          dateCreated: y.date_created,
          dueDate: y.due_date,
          deliveryDate: y.delivery_date,
          assignees: y.assignees,
          tags: y.tags,
          relType: y.rel_type,
          collection: {
            statuses: statuses,
          },
          subdata: {
            columns: [
              'Tasks',
              'Status',
              'Date Created',
              'Due Date',
              'Delivery Date',
              'Assigned To',
              'Tags',
            ],
            rows: y.sub_categories.map((z) => ({
              // BE data starts here
              level: z.level,
              id: z.id,
              name: z.name || z.description,
              status: z.status,
              dateCreated: z.date_created,
              dueDate: z.due_date,
              deliveryDate: z.delivery_date,
              assignees: z.assignees,
              tags: z.tags,
              relType: z.rel_type,
              collection: {
                statuses: statuses,
              },
              subdata: {},
            })),
            isColumnHeaderHidden: true,
          },
        })),
        isColumnHeaderHidden: false,
      },
    },
  ].filter(Boolean);
};

export const transformCampaigns = (data, statuses) => {
  const { campaigns } = data;
  return [
    !_.isEmpty(campaigns) && {
      header: {
        color: theme.palette.secondary.main,
      },
      dataset: {
        // First level
        columns: [
          'Campaigns',
          'Channels',
          'Tags',
          'Launch Date',
          'Delivery Date',
          'Members',
        ],
        rows: campaigns.map((x) => ({
          // level: y.level,
          id: x.id,
          name: x.name,
          channel: x.channel,
          tags: x.tags,
          launchDate: x.launch_date,
          deliveryDate: x.delivery_date,
          assignees: x.members,
          relType: x.rel_type,
          collection: {
            statuses: statuses,
          },
          // Campaign Tasks
          subdata: {
            columns: [
              'Campaign Tasks',
              'Status',
              'Date Created',
              'Due Date',
              'Assigned To',
              'Tags',
            ],
            rows: x.task.map((y) => ({
              level: y.level,
              id: y.id,
              name: y.name,
              status: y.status,
              dateCreated: y.date_created,
              dueDate: y.due_date,
              assignees: y.assignees,
              tags: y.tags,
              relType: y.rel_type,
              collection: {
                statuses: statuses,
              },
              // // Campaign Tasks > Subtasks
              subdata: {
                columns: [
                  'Campaign Tasks',
                  'Status',
                  'Date Created',
                  'Due Date',
                  'Assigned To',
                  'Tags',
                ],
                rows: y.sub_categories.map((z) => ({
                  level: z.level,
                  id: z.id,
                  name: z.name,
                  status: z.status,
                  dateCreated: z.date_created,
                  dueDate: z.due_date,
                  assignees: z.assignees,
                  tags: z.tags,
                  relType: z.rel_type,
                  collection: {
                    statuses: statuses,
                  },
                  subdata: {},
                })),
                isColumnHeaderHidden: true,
              },
            })),
            isColumnHeaderHidden: x.task.length == 0,
          },
          // Sub Campaigns
          subdata2: {
            columns: [
              'Sub Campaigns',
              'Channels',
              'Tags',
              'Launch Date',
              'Delivery Date',
              'Members',
            ],
            rows: x.sub_campaign.map((y) => ({
              // level: y.level,
              id: y.id,
              name: y.name,
              channel: y.channel,
              tags: y.tags,
              launchDate: y.launch_date,
              deliveryDate: y.delivery_date,
              assignees: y.members,
              relType: y.rel_type,
              collection: {
                statuses: statuses,
              },
              // Sub Campaigns > Tasks
              subdata: {
                columns: [
                  'Tasks',
                  'Status',
                  'Date Created',
                  'Due Date',
                  'Assigned To',
                  'Tags',
                ],
                rows: y.task.map((z) => ({
                  level: z.level,
                  id: z.id,
                  name: z.name,
                  status: z.status,
                  dateCreated: z.date_created,
                  dueDate: z.due_date,
                  assignees: z.assignees,
                  tags: z.tags,
                  relType: z.rel_type,
                  collection: {
                    statuses: statuses,
                  },
                  // // Sub Campaigns > Tasks > Subtasks
                  subdata: {
                    columns: [
                      'Campaign Tasks',
                      'Status',
                      'Date Created',
                      'Due Date',
                      'Assigned To',
                      'Tags',
                    ],
                    rows: z.sub_categories.map((i) => ({
                      level: i.level,
                      id: i.id,
                      name: i.name,
                      status: i.status,
                      dateCreated: i.date_created,
                      dueDate: i.due_date,
                      assignees: i.assignees,
                      tags: i.tags,
                      relType: i.rel_type,
                      collection: {
                        statuses: statuses,
                      },
                      subdata: {},
                    })),
                    isColumnHeaderHidden: true,
                  },
                })),
                isColumnHeaderHidden: y.task.length == 0,
              },
            })),
            isColumnHeaderHidden: x.sub_campaign.length == 0,
          },
        })),
        isColumnHeaderHidden: false,
      },
    },
  ].filter(Boolean);
};

export const transformCampaignTasks = (data, statuses) => {
  return [
    !_.isEmpty(data) && {
      header: {
        color: theme.palette.secondary.main,
      },
      dataset: {
        // First level
        columns: [
          'Campaign Tasks',
          'Status',
          'Date Created',
          'Due Date',
          'Assigned To',
          'Tags',
        ],
        rows: data.map((y) => ({
          level: y.level,
          id: y.id,
          name: y.name,
          status: y.status,
          dateCreated: y.date_created,
          dueDate: y.due_date,
          assignees: y.assignees,
          tags: y.tags,
          relType: y.rel_type,
          collection: {
            statuses: statuses,
          },
          // // Campaign Tasks > Subtasks
          subdata: {
            columns: [
              'Campaign Tasks',
              'Status',
              'Date Created',
              'Due Date',
              'Assigned To',
              'Tags',
            ],
            rows: y.sub_categories.map((z) => ({
              level: z.level,
              id: z.id,
              name: z.name,
              status: z.status,
              dateCreated: z.date_created,
              dueDate: z.due_date,
              assignees: z.assignees,
              tags: z.tags,
              relType: z.rel_type,
              collection: {
                statuses: statuses,
              },
              subdata: {},
            })),
            isColumnHeaderHidden: true,
          },
        })),
        isColumnHeaderHidden: false,
      },
    },
  ].filter(Boolean);
};

// Global Search Response Transformer

export const transformDataForGlobalSearchTasks = (data) => {
  return _.isEmpty(data)
    ? {}
    : {
        header: {
          color: theme.palette.secondary.main,
        },
        dataset: {
          columns: [
            'Tasks',
            'Status',
            'Date Created',
            'Due Date',
            'Delivery Date',
            'Assigned To',
            'Tags',
          ],
          rows: data.map((y) => ({
            id: y.id,
            relType: y.rel_type,
            name: y.title,
            status: y.status,
            dateCreated: y.date_created,
            dueDate: y.due_date,
            deliveryDate: y.delivery_date,
            assignees: y.assignees,
            tags: y.tags,
          })),
          isColumnHeaderHidden: false,
        },
      };
};

export const transformDataForGlobalSearchConcepts = (data) => {
  return _.isEmpty(data)
    ? {}
    : {
        header: {
          color: theme.palette.secondary.main,
        },
        dataset: {
          columns: [
            'Concepts',
            // 'Channels',
            'Tags',
            'Launch Date',
            'Delivery Date',
            'Members',
          ],
          rows: data.map((y) => ({
            id: y.id,
            relType: y.rel_type,
            name: y.title,
            // channel: y.channel,
            tags: y.tags,
            launchDate: y.launch_date,
            deliveryDate: y.delivery_date,
            assignees: y.members,
          })),
          isColumnHeaderHidden: false,
        },
      };
};

export const transformDataForGlobalSearchCampaigns = (data) => {
  return _.isEmpty(data)
    ? {}
    : {
        header: {
          color: theme.palette.secondary.main,
        },
        dataset: {
          columns: [
            'Campaigns',
            'Channels',
            'Tags',
            'Launch Date',
            'Delivery Date',
            'Members',
          ],
          rows: data.map((y) => ({
            id: y.id,
            relType: y.rel_type,
            name: y.title,
            channel: y.channel,
            tags: y.tags,
            launchDate: y.launch_date,
            deliveryDate: y.delivery_date,
            assignees: y.members,
          })),
          isColumnHeaderHidden: false,
        },
      };
};

/**
 * This function gets the object from the array
 * using the given key and value.
 * @param key The object key.
 * @param value The value of the key.
 * @param ref The reference array where you want to extract the obj.
 * @return The single object else {}.
 */
export const getItemByKey = (key, value, ref) => {
  const obj = {};
  obj[key] = value;
  return _.find(ref, obj) ?? {};
};
