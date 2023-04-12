import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
// import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import SwitchAccessShortcutOutlinedIcon from '@mui/icons-material/SwitchAccessShortcutOutlined';

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';

// headers
import { userHeader, taskTypeHeader, taskCategoryHeader, teamHeader, statusHeader, presetHeader, triggerHeader } from 'pages/Maintenance/variables';

export const navigation = [
    { icon: <PeopleOutlineOutlinedIcon sx={{ fontSize: '1.5em' }} />, label: 'Users', url: 'users', tag: 'user', headers: userHeader },
    { icon: <AssignmentOutlinedIcon sx={{ fontSize: '1.5em' }} />, label: 'Task Types', url: 'task-type', tag: 'task_type', headers: taskTypeHeader },
    { icon: <FormatListBulletedOutlinedIcon sx={{ fontSize: '1.5em' }} />, label: 'Task Categories', url: 'task-category', tag: 'task_category', headers: taskCategoryHeader },
    { icon: <GroupsOutlinedIcon sx={{ fontSize: '1.5em' }} />, label: 'Teams', url: 'teams', tag: 'teams', headers: teamHeader },
    // { icon: <AdminPanelSettingsOutlinedIcon sx={{ fontSize: '1.5em' }} />, label: 'Roles', url: 'roles', tag: '', headers: userHeader },
    { icon: <MilitaryTechOutlinedIcon sx={{ fontSize: '1.5em' }} />, label: 'Statuses', url: 'statuses', tag: 'status', headers: statusHeader },
    { icon: <AccountTreeOutlinedIcon sx={{ fontSize: '1.5em' }} />, label: 'Presets', url: 'preset', tag: 'preset', headers: presetHeader },
    { icon: <SwitchAccessShortcutOutlinedIcon sx={{ fontSize: '1.5em' }} />, label: 'Triggers', url: 'triggers', tag: 'triggers', headers: triggerHeader }
];

export const options = [
    { icon: <HistoryEduOutlinedIcon />, title: 'Edit', color: 'primary', tag: 'edit' },
    { icon: <AddBoxOutlinedIcon />, title: 'Add', color: 'primary', tag: 'add' },
    { icon: <Inventory2OutlinedIcon />, title: 'Archive', color: 'primary', tag: 'archive' },
    { icon: <FilterAltOutlinedIcon />, title: 'Filter', color: 'primary', tag: 'filter' },
];