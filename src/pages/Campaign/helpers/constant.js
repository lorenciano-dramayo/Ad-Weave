import { appColors } from 'theme/variables';

export const overview = [
  {
    key: 'concept_name',
    name: 'Concept Name',
  },
  {
    key: 'name',
    name: 'Campaign Name',
  },
  {
    key: 'sub_campaign',
    name: 'Sub-Campaign',
  },
  {
    key: 'partner_name',
    name: 'Partner Name',
  },
  {
    key: 'delivery_type',
    name: 'Delivery Type',
  },
  {
    key: 'created_at',
    name: 'Date Created',
  },
  {
    key: 'launch_date',
    name: 'Launch Date',
  },
  {
    key: 'delivery_date',
    name: 'Delivery Date',
  },
  {
    key: 'total_log_hours',
    name: 'Total Log Hours',
  },
  {
    key: 'personalization_type',
    name: 'Service Type',
  },
  {
    key: 'additional_info',
    name: 'Additional Information',
  },
  {
    key: 'tags',
    name: 'Tags',
  },
];

export const statusColor = (e) => {
  switch (`${e}`.toLowerCase()) {
    case 'not_started':
      return appColors.status.notStarted;
  }
};
