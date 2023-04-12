// React
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  unPinFavorites,
  fetchAllFavorites,
  fetchAllFavoritesConcept,
  fetchAllFavoritesCampaign,
  fetchAllFavoritesTasks,
} from 'store/reducers/favorites';
// Assets
import Swal from 'sweetalert2';
import CloseIcon from '@mui/icons-material/Close';
// MUI
import { styled, makeStyles } from '@mui/styles';
import {
  Avatar,
  Stack,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Collapse,
  IconButton,
} from '@mui/material';
// Assets
import User1 from 'assets/images/user-dummy-1.jpg';
import User2 from 'assets/images/user-dummy-2.jpg';
import User3 from 'assets/images/user-dummy-3.jpg';

// Utilities
import { appColors } from 'theme/variables';
import PropTypes from 'prop-types';
import _ from 'lodash';

const createRow = (
  name,
  partnerGroup,
  tags,
  deliveryDate,
  members,
  status
) => ({
  name,
  partnerGroup,
  tags,
  deliveryDate,
  members,
  status,
});

const rows = [
  createRow(
    'Facebook empty shell',
    'Ad-Lib Internal',
    'none',
    '31Jan2022 00:00:00',
    'none',
    'Completed'
  ),
  createRow(
    'Facebook empty shell',
    'Ad-Lib Internal',
    'none',
    '31Jan2022 00:00:00',
    'none',
    'Completed'
  ),
  createRow(
    'Facebook empty shell',
    'Ad-Lib Internal',
    'none',
    '31Jan2022 00:00:00',
    'none',
    'Completed'
  ),
];

const StyledAccordionButton = styled(IconButton)(({ isCollapsible }) => ({
  visibility: isCollapsible ? 'visible' : 'hidden',
  color: `${appColors.darkGray}`,
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

// Table
const StyledTable = styled(Table)({
  borderCollapse: 'separate',
  borderSpacing: '0 0.1rem',
  padding: 0,
});

// Table Header
const StyledHeaderCell = styled(TableCell)({
  fontSize: '1rem',
  padding: '9px 0px',
  borderBottom: 0,
  textAlign: 'center',
  '&:first-child p': {
    fontSize: '1.2rem',
    textAlign: 'left',
  },
});

const StyledHeaderTitle = styled(Typography)({
  fontSize: '1rem',
  fontWeight: '500 !important',
});

// Table Body
const StyledBodyRow = styled(TableRow)(({ color }) => ({
  backgroundColor: appColors.lighterGray,
  boxShadow: `-8px 0px 0px 0px ${color}`,
}));

// Table Body Cell
const StyledBodyCell = styled(TableCell)({
  textAlign: 'center',
  fontSize: '1em',
  padding: '0.3em 0',
  borderBottom: 0,
  color: appColors.darkGray,
  '&:first-child': {
    color: appColors.black,
    textAlign: 'left',
    padding: '0 0 0 1em',
  },
  '&:nth-of-type(even)': {
    // Apply border to EVEN rows only
    borderLeft: '0.2rem solid white',
    borderRight: '0.2rem solid white',
  },
});

const StyledUserAvatar = styled(Avatar)({
  width: 25,
  height: 25,
});

const useStyles = makeStyles(() => ({
  status: {
    backgroundColor: appColors.status.completed,
    color: 'white',
  },
  collapsible: {
    transition: 'transform 1000ms linear',
  },
  multiLineEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical',
  },
}));

const TasksRow = ({
  color,
  data,
  className,
  isCollapsible,
  title,
  index,
  onClick,
}) => {
  const classes = useStyles();
  const [isCollapsed, setCollapse] = useState(false);
  const dispatch = useDispatch();
  var StyleBodyRowInfo;
  const Swal = require('sweetalert2');

  const handleListItemClick = (index, type) => {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          unPinFavorites({
            data_id: index,
          })
        );
        if (type == 'Concept') {
          dispatch(fetchAllFavoritesConcept());
        } else if (type == 'Campaign') {
          dispatch(fetchAllFavoritesCampaign());
        } else if (type == 'Tasks') {
          dispatch(fetchAllFavoritesTasks());
        } else {
          dispatch(fetchAllFavorites());
        }

        Swal.fire('Saved!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

  if (title == 'Tasks') {
    // TASKS
    StyleBodyRowInfo = (
      <StyledBodyRow className={className} color={color}>
        <StyledBodyCell width="350px">
          <span className={classes.multiLineEllipsis}>
            {data?.task?.description ? data?.task?.description : '-'}
          </span>
        </StyledBodyCell>
        <StyledBodyCell className={classes.status}>
          {data?.task?.status ? data?.task?.status : '-'}
        </StyledBodyCell>
        <StyledBodyCell>
          {data?.task?.date_created ? data?.task?.date_created : '-'}
        </StyledBodyCell>
        <StyledBodyCell>
          {data?.task?.due_date ? data?.task?.due_date : '-'}
        </StyledBodyCell>
        <StyledBodyCell>
          <Stack direction="row" justifyContent="center" spacing={1}>
            {data?.task?.assignees.map((row, index) => (
              <StyledUserAvatar key={index} src={row.avatar} />
            ))}
          </Stack>
        </StyledBodyCell>
        <StyledBodyCell>
          <Chip
            label={data?.task?.tags ? data?.task?.tags : '-'}
            color="primary"
            variant="outlined"
            size="small"
          />
        </StyledBodyCell>

        <StyledBodyCell className={classes.status}>
          {data?.task?.priority_description
            ? data?.task?.priority_description
            : '-'}
        </StyledBodyCell>

        <StyledBodyCell>
          <CloseIcon
            onClick={(e) => handleListItemClick(data?.task?.id, 'Tasks')}
          />
        </StyledBodyCell>
      </StyledBodyRow>
    );
  } else if (title == 'Concept') {
    // CAMPAIGN AND CONCEPT

    StyleBodyRowInfo = (
      <StyledBodyRow className={className} color={color}>
        <StyledBodyCell width="350px">
          <span className={classes.multiLineEllipsis}>
            {data?.concept?.name ? data?.concept?.name : '-'}
          </span>
        </StyledBodyCell>
        <StyledBodyCell>
          <Chip
            label={
              data?.concept?.partner_name ? data?.concept?.partner_name : '-'
            }
            color="secondary"
            variant="outlined"
            size="small"
          />
        </StyledBodyCell>
        <StyledBodyCell>
          <Chip
            label={data?.concept?.tags ? data?.concept?.tags : '-'}
            color="primary"
            variant="outlined"
            size="small"
          />
        </StyledBodyCell>

        <StyledBodyCell>
          {data?.concept?.deadline ? data?.concept?.deadline : '-'}
        </StyledBodyCell>
        <StyledBodyCell>
          <Stack direction="row" justifyContent="center" spacing={1}>
            {data?.concept?.subscribers.map((row, index) => (
              <StyledUserAvatar key={index} src={row.avatar} />
            ))}
          </Stack>
        </StyledBodyCell>
        <StyledBodyCell className={classes.status}>
          {data?.concept?.status ? data?.concept?.status : '-'}
        </StyledBodyCell>
        <StyledBodyCell>
          <CloseIcon
            onClick={(e) => handleListItemClick(data?.concept?.uuid, 'Concept')}
          />
        </StyledBodyCell>
      </StyledBodyRow>
    );
  } else if (title == 'Campaign') {
    // CAMPAIGN AND CONCEPT

    StyleBodyRowInfo = (
      <StyledBodyRow className={className} color={color}>
        <StyledBodyCell width="350px">
          <span className={classes.multiLineEllipsis}>
            {data?.campaign?.name ? data?.campaign?.name : '-'}
          </span>
        </StyledBodyCell>
        <StyledBodyCell>
          <Chip
            label={
              data?.campaign?.partner_name ? data?.campaign?.partner_name : '-'
            }
            color="secondary"
            variant="outlined"
            size="small"
          />
        </StyledBodyCell>
        <StyledBodyCell>
          <Chip
            label={data?.campaign?.tags ? data?.campaign?.tags : '-'}
            color="primary"
            variant="outlined"
            size="small"
          />
        </StyledBodyCell>
        <StyledBodyCell>
          {data?.campaign?.launch_date ? data?.campaign?.launch_date : '-'}
        </StyledBodyCell>

        <StyledBodyCell>
          {data?.campaign?.deadline ? data?.campaign?.deadline : '-'}
        </StyledBodyCell>

        <StyledBodyCell className={classes.status}>
          {data?.campaign?.status ? data?.campaign?.status : '-'}
        </StyledBodyCell>
        <StyledBodyCell>
          <CloseIcon
            onClick={(e) =>
              handleListItemClick(data?.campaign?.uuid, 'Campaign')
            }
          />
        </StyledBodyCell>
      </StyledBodyRow>
    );
  }

  return (
    <React.Fragment>
      {StyleBodyRowInfo}
      {/* <TableRow>
        <TableCell colSpan={6}>
          <Collapse
            in={isCollapsed}
            timeout="auto"
            orientation="vertical"
            sx={{ marginLeft: 2.5 }}
            unmountOnExit
          >
            <ProjectProgressTasksConcept color={color} isParent={false} />
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
};

const ProjectProgressTasksConcept = ({ color, isParent, title }) => {
  const [state, setState] = React.useState({
    right: false,
  });

  var StyleBodyRowInfoData;

  const dispatch = useDispatch();

  const { list: favoritesList } = useSelector((state) => state.favorites);

  useEffect(() => {
    if (title == 'Concept') {
      dispatch(fetchAllFavoritesConcept());
    } else if (title == 'Campaign') {
      dispatch(fetchAllFavoritesCampaign());
    } else if (title == 'Tasks') {
      dispatch(fetchAllFavoritesTasks());
    } else {
      dispatch(fetchAllFavorites());
    }
    // dispatch(fetchAllFavorites());
  }, []);

  if (title == 'Tasks') {
    // TASKS
    StyleBodyRowInfoData = (
      <TableRow>
        <StyledHeaderCell>
          <StyledHeaderTitle>{title}</StyledHeaderTitle>
        </StyledHeaderCell>
        <StyledHeaderCell>
          <StyledHeaderTitle>Status</StyledHeaderTitle>
        </StyledHeaderCell>
        <StyledHeaderCell>
          <StyledHeaderTitle>Date Created</StyledHeaderTitle>
        </StyledHeaderCell>
        <StyledHeaderCell>
          <StyledHeaderTitle>Due Date</StyledHeaderTitle>
        </StyledHeaderCell>
        <StyledHeaderCell>
          <StyledHeaderTitle>Assigned To</StyledHeaderTitle>
        </StyledHeaderCell>
        <StyledHeaderCell>
          <StyledHeaderTitle>Tags</StyledHeaderTitle>
        </StyledHeaderCell>
        <StyledHeaderCell>
          <StyledHeaderTitle>Priority</StyledHeaderTitle>
        </StyledHeaderCell>
        <StyledHeaderCell>
          <StyledHeaderTitle></StyledHeaderTitle>
        </StyledHeaderCell>
      </TableRow>
    );
  } else if (title == 'Concept') {
    // CAMPAIGN AND CONCEPT
    StyleBodyRowInfoData = (
      <TableRow>
        <StyledHeaderCell>
          <StyledHeaderTitle>{title}</StyledHeaderTitle>
        </StyledHeaderCell>
        <StyledHeaderCell>
          <StyledHeaderTitle>Partner Group</StyledHeaderTitle>
        </StyledHeaderCell>
        <StyledHeaderCell>
          <StyledHeaderTitle>Tags</StyledHeaderTitle>
        </StyledHeaderCell>

        <StyledHeaderCell>
          <StyledHeaderTitle>Delivery Date</StyledHeaderTitle>
        </StyledHeaderCell>
        <StyledHeaderCell>
          <StyledHeaderTitle>Members</StyledHeaderTitle>
        </StyledHeaderCell>
        <StyledHeaderCell>
          <StyledHeaderTitle>Status</StyledHeaderTitle>
        </StyledHeaderCell>
        <StyledHeaderCell>
          <StyledHeaderTitle></StyledHeaderTitle>
        </StyledHeaderCell>
      </TableRow>
    );
  } else if (title == 'Campaign') {
    // CAMPAIGN AND CONCEPT
    StyleBodyRowInfoData = (
      <TableRow>
        <StyledHeaderCell>
          <StyledHeaderTitle>{title}</StyledHeaderTitle>
        </StyledHeaderCell>
        <StyledHeaderCell>
          <StyledHeaderTitle>Partner Group</StyledHeaderTitle>
        </StyledHeaderCell>
        <StyledHeaderCell>
          <StyledHeaderTitle>Tags</StyledHeaderTitle>
        </StyledHeaderCell>

        <StyledHeaderCell>
          <StyledHeaderTitle>Launched Date</StyledHeaderTitle>
        </StyledHeaderCell>
        <StyledHeaderCell>
          <StyledHeaderTitle>Delivery Date</StyledHeaderTitle>
        </StyledHeaderCell>
        <StyledHeaderCell>
          <StyledHeaderTitle>Members</StyledHeaderTitle>
        </StyledHeaderCell>
        <StyledHeaderCell>
          <StyledHeaderTitle>Status</StyledHeaderTitle>
        </StyledHeaderCell>
        <StyledHeaderCell>
          <StyledHeaderTitle></StyledHeaderTitle>
        </StyledHeaderCell>
      </TableRow>
    );
  }

  return (
    <React.Fragment>
      <StyledTable>
        {isParent && <TableHead>{StyleBodyRowInfoData}</TableHead>}
        <TableBody>
          {favoritesList.map((row, index) => {
            if (title == 'Concept') {
              return (
                <TasksRow
                  key={row.id}
                  color={color}
                  data={row}
                  isCollapsible={isParent}
                  title={title}
                  index={index}
                />
              );
            } else if (title == 'Campaign') {
              return (
                <TasksRow
                  key={index}
                  color={color}
                  data={row}
                  isCollapsible={isParent}
                  title={title}
                  index={index}
                />
              );
            } else if (title == 'Tasks') {
              return (
                <TasksRow
                  key={index}
                  color={color}
                  data={row}
                  isCollapsible={isParent}
                  title={title}
                  index={index}
                />
              );
            }
          })}
        </TableBody>
      </StyledTable>
    </React.Fragment>
  );
};

TasksRow.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.object,
  color: PropTypes.string.isRequired,
  className: PropTypes.string,
  index: PropTypes.string,
  isCollapsible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

ProjectProgressTasksConcept.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string.isRequired,
  isParent: PropTypes.bool.isRequired,
};

export default ProjectProgressTasksConcept;
