import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

const defaultIconSX = {
  fontSize: 22,
  color: '#92929D',
};

export const timezones = [
  {
    value: 'GMT Greenwich Mean Time	 (GMT)',
    label: 'GMT Greenwich Mean Time	 (GMT)',
  },
  {
    value: 'UTC	 Universal Coordinated Time	 (GMT)',
    label: 'UTC	 Universal Coordinated Time	 (GMT)',
  },
  {
    value: 'ECT European Central Time	 (GMT+1:00)',
    label: 'ECT European Central Time	 (GMT+1:00)',
  },
  {
    value: 'EET Eastern European Time (GMT+2:00)',
    label: 'EET Eastern European Time (GMT+2:00)',
  },
  {
    value: 'GMT+8',
    label: 'GMT+8',
  },
];

export const daysList = [
  {
    value: 'Monday',
    label: 'Monday',
  },
  {
    value: 'Tuesday',
    label: 'Tuesday',
  },
  {
    value: 'Wednesday',
    label: 'Wednesday',
  },
  {
    value: 'Thursday',
    label: 'Thursday',
  },
  {
    value: 'Friday',
    label: 'Friday',
  },
  {
    value: 'Saturday',
    label: 'Saturday',
  },
  {
    value: 'Sunday',
    label: 'Sunday',
  },
];

export const validIds = [
  {
    value: "Driver's License",
    label: "Driver's License",
  },
  {
    value: 'SSS ID',
    label: 'SSS ID',
  },
  {
    value: 'Passport',
    label: 'Passport',
  },
  {
    value: 'UMID ID',
    label: 'UMID ID',
  },
  {
    value: 'Philhealth ID',
    label: 'Philhealth ID',
  },
];

export const partnersList = [
  {
    value: 'Milo US',
    label: 'Milo US',
  },
  {
    value: 'Nestle PH',
    label: 'Nestle PH',
  },
  {
    value: 'Xbox SG',
    label: 'Xbox SG',
  },
  {
    value: 'Nike PH',
    label: 'Nike PH',
  },
  {
    value: 'Adidas US',
    label: 'Adidas US',
  },
];

export const partnersProps = [
  {
    title: 'Partner',
    variant: 'datapicker',
    name: 'partners',
    content: 'Milo PH',
    list: partnersList,
    svgIcon: <GroupOutlinedIcon sx={defaultIconSX} />,
  },
  {
    title: 'Partner',
    variant: 'datapicker',
    name: 'partners',
    content: 'Nestle US',
    list: partnersList,
    svgIcon: <GroupOutlinedIcon sx={defaultIconSX} />,
  },
];
