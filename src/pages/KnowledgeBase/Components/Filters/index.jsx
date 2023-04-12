import React from 'react';

import {
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  styled,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import IcoDashboard from 'assets/images/ico_dashboard.png';

const AccordionI = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  border: `none`,

  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummaryI = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  padding: '0px',
  backgroundColor: 'none',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
    '& .MuiTypography-root': {
      fontFamily: 'Karla',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '16px',
      color: '#323338',
    },
  },
}));

const AccordionDetailsI = styled(MuiAccordionDetails)(() => ({
  padding: '0px 25px',
}));

const TypographyTitleAll = styled(Typography)(() => ({
  padding: '18px 0px',
  color: '#F22076',
  fontFamily: 'Karla',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '14px',
  alignItems: 'center',
  display: 'flex',
  lineHeight: '0px',
  '& img': {
    marginRight: '6px',
  },
}));

const TypographyTitleGroup = styled(Typography)(() => ({
  padding: '0px 0px 18px 0px ',
  fontFamily: 'Karla',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '18px',
  lineHeight: '21px',
  color: '#323338',
}));

const AccordionMain = styled((props) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(() => ({
  border: `none`,

  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummaryMain = styled((props) => (
  <AccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(() => ({
  backgroundColor: 'none',
  '& .MuiAccordionSummary-expandIconWrapper': {
    fontSize: '21px',
  },

  '& .MuiAccordionSummary-content': {
    margin: '0px !important',

    '& .MuiTypography-root': {
      fontFamily: 'Karla',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '18px',
      lineHeight: '21px',
      color: '#323338',
    },
  },
}));

const DividerStyle = styled(Divider)(() => ({
  borderColor: 'rgba(83, 83, 83, 0.2)',
  width: '75%',
}));

export default function Filters() {
  const [expanded, setExpanded] = React.useState('');
  const [expandedMain, setExpandedMain] = React.useState('main_panel');

  const handleChange = (panel) => (newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChangeMain = (panel) => (newExpandedMain) => {
    setExpandedMain(newExpandedMain ? panel : false);
  };

  return (
    <Box>
      <AccordionMain
        expanded={expandedMain === 'main_panel'}
        onChange={handleChangeMain('main_panel')}
      >
        <AccordionSummaryMain
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Filter Knowledge Base</Typography>
        </AccordionSummaryMain>
        <AccordionDetails>
          <TypographyTitleGroup>Group</TypographyTitleGroup>
          <DividerStyle />
          <TypographyTitleAll>
            <img src={IcoDashboard} alt="ico dashboard" />
            All
          </TypographyTitleAll>
          <DividerStyle />
          <AccordionI
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummaryI
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>Developers Guide</Typography>
            </AccordionSummaryI>
            <AccordionDetailsI>
              <Typography>Lorem ipsum</Typography>
            </AccordionDetailsI>
          </AccordionI>
        </AccordionDetails>
      </AccordionMain>
    </Box>
  );
}
