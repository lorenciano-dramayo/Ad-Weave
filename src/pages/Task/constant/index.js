import EditRoundedIcon from '@mui/icons-material/EditRounded';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';

export const overview = [
  { key: 'id', name: 'Task ID' },
  { key: 'concept', name: 'Concept' },
  { key: 'campaign_name', name: 'Campaign' },
  { key: 'task_type', name: 'Task Type' },
  { key: 'team', name: 'Team' },
  { key: 'name', name: 'Subtask' },
  { key: 'partner_group', name: 'Partner Group' },
  { key: 'channel', name: 'Channel' },
  { key: 'refresh', name: 'Refresh' },
  { key: 'revision_round', name: 'Revision Round' },
  { key: 'date_created', name: 'Date Created' },
  { key: 'due_date', name: 'Due Date' },
  { key: 'delivery_date', name: 'Delivery Date' },
  { key: 'tags', name: 'Tags' },
  { key: 'triggers', name: 'Triggers' },
  { key: 'desktop_displays', name: 'Desktop Sizes' },
  { key: 'mobile_displays', name: 'Mobile Sizes' },
];

export const other_overview_info = [
  { key: 'reference', name: 'References' },
  { key: 'templates', name: 'Templates' },
  { key: 'subtask', name: 'Subtasks' },
  { key: 'revisions', name: 'Revisions' },
  { key: 'checklist', name: 'Checklist' },
];

export const other_overview_info_for_concept_design = [
  { key: 'reference', name: 'References' },
  { key: 'subtask', name: 'Subtasks' },
  { key: 'revisions', name: 'Revisions' },
  { key: 'checklist', name: 'Checklist' },
];

export const thread_opts_default = [
  {
    key: 'thread_history',
    name: 'View History',
    icon: <HistoryOutlinedIcon />,
  },
];

export const thread_opts_with_ownership = [
  { key: 'thread_edit', name: 'Edit thread', icon: <EditRoundedIcon /> },
  { key: 'thread_delete', name: 'Delete thread', icon: <DeleteIcon /> },
];

export const thread_opts_with_ownership_and_edit_history = [
  { key: 'thread_edit', name: 'Edit thread', icon: <EditRoundedIcon /> },
  { key: 'thread_delete', name: 'Delete thread', icon: <DeleteIcon /> },
  {
    key: 'thread_history',
    name: 'View History',
    icon: <HistoryOutlinedIcon />,
  },
];

export const thread_opts_for_assigned_teams = [
  {
    key: 'thread_resolve',
    name: 'Mark as Resolved',
    icon: <CheckCircleOutlineIcon color="success" />,
  },
  {
    key: 'thread_reject',
    name: 'Mark as Rejected',
    icon: <CancelIcon color="error" />,
  },
];

export const thread_opts_for_assigned_teams_with_edit_history = [
  {
    key: 'thread_resolve',
    name: 'Mark as Resolved',
    icon: <CheckCircleOutlineIcon color="success" />,
  },
  {
    key: 'thread_reject',
    name: 'Mark as Rejected',
    icon: <CancelIcon color="error" />,
  },
  {
    key: 'thread_history',
    name: 'View History',
    icon: <HistoryOutlinedIcon />,
  },
];

export const thread_opts_for_assigned_teams_with_ownership = [
  {
    key: 'thread_resolve',
    name: 'Mark as Resolved',
    icon: <CheckCircleOutlineIcon color="success" />,
  },
  {
    key: 'thread_reject',
    name: 'Mark as Rejected',
    icon: <CancelIcon color="error" />,
  },
  { key: 'thread_edit', name: 'Edit thread', icon: <EditRoundedIcon /> },
  { key: 'thread_delete', name: 'Delete thread', icon: <DeleteIcon /> },
];

export const thread_opts_for_assigned_teams_with_ownership_and_edit_history = [
  {
    key: 'thread_resolve',
    name: 'Mark as Resolved',
    icon: <CheckCircleOutlineIcon color="success" />,
  },
  {
    key: 'thread_reject',
    name: 'Mark as Rejected',
    icon: <CancelIcon color="error" />,
  },
  { key: 'thread_edit', name: 'Edit thread', icon: <EditRoundedIcon /> },
  { key: 'thread_delete', name: 'Delete thread', icon: <DeleteIcon /> },
  {
    key: 'thread_history',
    name: 'View History',
    icon: <HistoryOutlinedIcon />,
  },
];

export const subtask_thread_opts = [
  { key: 'redirect_subtask', name: 'View Task', icon: <LaunchIcon /> },
  {
    key: 'thread_history',
    name: 'View History',
    icon: <HistoryOutlinedIcon />,
  },
];

export const comment_opts_with_ownership = [
  { key: 'comment_edit', name: 'Edit comment', icon: <EditRoundedIcon /> },
  { key: 'comment_delete', name: 'Delete comment', icon: <DeleteIcon /> },
];

export const comment_opts_with_edit_history = [
  {
    key: 'comment_history',
    name: 'View History',
    icon: <HistoryOutlinedIcon />,
  },
];

export const comment_opts_with_ownership_and_edit_history = [
  { key: 'comment_edit', name: 'Edit comment', icon: <EditRoundedIcon /> },
  { key: 'comment_delete', name: 'Delete comment', icon: <DeleteIcon /> },
  {
    key: 'comment_history',
    name: 'View History',
    icon: <HistoryOutlinedIcon />,
  },
];
