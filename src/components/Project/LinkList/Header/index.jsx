import PropTypes from "prop-types";

// MUI Components
import {
  Button,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  TextField,
  Box,
  tableCellClasses,
  styled,
} from "@mui/material";

// MUI Icons
import AddLinkOutlinedIcon from "@mui/icons-material/AddLinkOutlined";

// MUI Custom
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#939393",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Header = ({ handleSearch, handleDrawer }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell colSpan={3} sx={{ padding: "0.5em" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <TextField
                placeholder="Search link name"
                id="outlined-size-small"
                size="small"
                sx={{ height: 40 }}
                onChange={handleSearch}
                autoComplete="off"
              />
            </Box>
            <Box>
              <Button
                size="small"
                variant="contained"
                startIcon={<AddLinkOutlinedIcon />}
                onClick={handleDrawer}
              >
                Add new link
              </Button>
            </Box>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell width={300}>Name</StyledTableCell>
        <StyledTableCell>Task Types</StyledTableCell>
        <StyledTableCell width={30}>Actions</StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

Header.propTypes = {
  handleDrawer: PropTypes.func,
  handleSearch: PropTypes.func,
};

export default Header;
