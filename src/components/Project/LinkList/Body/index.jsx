import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";

// MUI Components
import {
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Chip,
  Box,
  Popover,
  Stack,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  tableCellClasses,
  styled,
} from "@mui/material";

// MUI Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#939393",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Body = ({
  list,
  anchor: anchorEl,
  handleButtonClick,
  handlePopperClose,
  handleDrawer,
  handleDelete,
  search,
}) => {
  const open = Boolean(anchorEl);
  const id = open ? "actions-popover" : undefined;

  return (
    <TableBody>
      {list
        .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
        .map((row) => (
          <StyledTableRow key={row.id}>
            <StyledTableCell component="th" scope="row">
              <Box
                component={Link}
                to={{ pathname: row.link_url }}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontWeight: 700,
                  textDecoration: "none",
                  color: "#F22076",
                }}
              >
                {row.name}
              </Box>
            </StyledTableCell>
            <StyledTableCell>
              <Stack spacing={1} direction="row">
                {row.task_type.map((data, index) => {
                  return (
                    <Chip
                      size="small"
                      key={`${data.id}-${index}`}
                      label={
                        _.isEmpty(data.name) ? data.task_type_name : data.name
                      }
                      variant="outlined"
                    />
                  );
                })}
              </Stack>
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              <IconButton
                aria-label="Options"
                aria-describedby={id}
                onClick={(e) => handleButtonClick(e, row.id, row.name)}
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      {/* Popper */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopperClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuList dense>
          <MenuItem onClick={() => handleDrawer("Edit")}>
            <ListItemIcon>
              <EditOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </MenuList>
      </Popover>
    </TableBody>
  );
};

Body.propTypes = {
  list: PropTypes.array,
  anchor: PropTypes.any,
  handleButtonClick: PropTypes.func,
  handlePopperClose: PropTypes.func,
  handleDrawer: PropTypes.func,
  handleDelete: PropTypes.func,
  search: PropTypes.string,
};

export default Body;
