import React from "react";
import clsx from "clsx";
import makeStyles from "@mui/styles/makeStyles";
import {
  Drawer,
  Box,
  Input,
  FormControl,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import "assets/css/search/overide.css";
import { SearchIcon } from "assets/icons";
import FireIcon from "assets/icons/search/local_fire.png";
import LightBulbIcon from "assets/icons/search/lightbulb.png";
import PersonIcon from "assets/icons/search/person.png";
import QueryBuilderIcon from "assets/icons/search/query_builder.png";
import HowToRegIcon from "assets/icons/search/how_to_reg.png";
import HistoryIcon from "assets/icons/search/history.png";
import GradeIcon from "assets/icons/search/grade.png";
import AssignmentIcon from "assets/icons/search/assignment.png";
import AlternateEmailIcon from "assets/icons/search/alternate_email.png";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import SearchIconImg from "assets/icons/search.png";

const ariaLabel = { "aria-label": "description" };

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
    padding: "128px 75px 0px 100px;",
  },
  fullList: {
    width: "auto",
  },

  containerBg: {
    backgroundColor: "#25165B",
    width: "92vw",
  },
  wrapContainer: {
    height: "90vh",
  },
  shadowLeft: {
    boxShadow: "12px 0 15px -4px rgb(0 0 0 / 15%);",
  },
  active: {
    color: "rgba(255, 255, 255, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    width: "47px",
    borderRadius: "7px",
    height: "50px",
    display: "flex",
    // backgroundColor:'#e0238c',
    // '&:hover': {
    //   color: 'white',
    //   backgroundColor:'#e0238c',
    //   width:'47px',
    //   borderRadius: '7px',
    //   height:'100%',
    //   alignItems:'center',
    //   justifyContent:'center',
    //   display:'flex'
    // },
    // '&:active': {
    //   color: 'white',
    //   backgroundColor:'#e0238c',
    //   width:'47px',
    //   borderRadius: '7px',
    //   height:'100%',
    //   alignItems:'center',
    //   justifyContent:'center',
    //   display:'flex'
    // },
  },
  searchInput: {
    color: "#D99898",
    fontSize: "24px",
    borderBottom: "1.5px solid white",
    width: "100%",
    letterSpacing: "1px",
    fontFamily: "Karla",
  },
  searchIconBtn: {
    marginRight: "-6px",
  },

  searchSizeImg: {
    height: "20px",
  },

  flexBetween: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "18px",
    paddingTop: "10px",
  },

  filterBtn: {
    height: "35px",
    width: "97px",
    marginTop: "4px",
    marginRight: "-8px",
    color: "white",
    backgroundColor: "#DF3C76",
    border: "1px solid #DF3C76",
    fontFamily: "Karla",
    fontWeight: "normal",
    fontSize: "13px",
    borderRadius: "5px",
  },
  colContainerPad: {
    padding: "5%",
  },
  textAlongIcon: {
    marginLeft: "21px",
    fontFamily: "Karla",
    fontWeight: "normal",
    color: "#FFFFFF",
    fontSize: "14px",
  },

  iconAlongText: {
    marginTop: "7px",
    position: "absolute",
  },
  wrapperItem: {
    padding: "50px 0px 0px 21px",
  },
}));

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #df3c76;
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid #df3c76;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #df3c76;
    color: white;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: "transparent";
  border-radius: 8px;
  margin-bottom: 16px;
  margin-top: 0px;
  display: flex;
  align-items: center;
  justify-content: start;
  align-content: space-between;
`;

const Search = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown") {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div className={classes.containerBg}>
      <Box
        className={clsx(classes.list, {
          [classes.fullList]: anchor === "top" || anchor === "bottom",
        })}
        role="presentation"
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <div className={classes.wrapContainer}>
          <FormControl
            className={classes.searchInput}
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
          >
            <Input
              className={classes.searchInput}
              placeholder="Search Everything..."
              inputProps={ariaLabel}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Search Icon"
                    edge="end"
                    className={classes.searchIconBtn}
                  >
                    <img
                      src={SearchIconImg}
                      className={classes.searchSizeImg}
                      alt="search"
                    />
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <div className={classes.flexBetween}>
            <TabsUnstyled defaultValue={0}>
              <TabsList>
                <Tab>All</Tab>
                <Tab>Campaign</Tab>
                <Tab>Concept</Tab>
                <Tab>Tasks</Tab>
                <Tab>Partner/Market</Tab>
                <Tab>Tags</Tab>
              </TabsList>
              <TabPanel value={0}></TabPanel>
              <TabPanel value={1}></TabPanel>
              <TabPanel value={2}></TabPanel>
              <TabPanel value={3}></TabPanel>
              <TabPanel value={4}></TabPanel>
              <TabPanel value={5}></TabPanel>
              <TabPanel value={6}></TabPanel>
            </TabsUnstyled>

            <button className={classes.filterBtn}>Filter by date</button>
          </div>
          <Grid container className={classes.wrapperItem} spacing={2}>
            <Grid item xs={3} className={classes.colContainerPad}>
              <div>
                <img
                  src={FireIcon}
                  alt="fire icon"
                  className={classes.iconAlongText}
                />{" "}
                <p className={classes.textAlongIcon}> Trend Search</p>
              </div>

              <div>
                <img
                  src={LightBulbIcon}
                  alt="light bulb icon"
                  className={classes.iconAlongText}
                />{" "}
                <p className={classes.textAlongIcon}>
                  {" "}
                  You can add a Tag column to any board. The most used tags will
                  appear here.
                </p>
              </div>
            </Grid>
            <Grid item xs={3} className={classes.colContainerPad}>
              <div>
                <img
                  src={PersonIcon}
                  alt="Person icon"
                  className={classes.iconAlongText}
                />{" "}
                <p className={classes.textAlongIcon}> Related to me</p>
              </div>

              <div>
                <img
                  src={HowToRegIcon}
                  alt="How to reg icon"
                  className={classes.iconAlongText}
                />{" "}
                <p className={classes.textAlongIcon}> I’m assigned to</p>
              </div>
              <div>
                <img
                  src={AssignmentIcon}
                  alt="assignment icon"
                  className={classes.iconAlongText}
                />{" "}
                <p className={classes.textAlongIcon}> My Files</p>
              </div>
              <div>
                <img
                  src={HistoryIcon}
                  alt="history icon"
                  className={classes.iconAlongText}
                />{" "}
                <p className={classes.textAlongIcon}> Archived Boards</p>
              </div>
              <div>
                <img
                  src={AlternateEmailIcon}
                  alt="Alternate Email icon"
                  className={classes.iconAlongText}
                />{" "}
                <p className={classes.textAlongIcon}> I was mentioned</p>
              </div>
              <div>
                <img
                  src={AlternateEmailIcon}
                  alt="Alternate Email icon"
                  className={classes.iconAlongText}
                />{" "}
                <p className={classes.textAlongIcon}>
                  {" "}
                  I was mentioned and didn’t reply.
                </p>
              </div>
            </Grid>
            <Grid item xs={3} className={classes.colContainerPad}>
              <div>
                <img
                  src={GradeIcon}
                  alt="grade icon"
                  className={classes.iconAlongText}
                />{" "}
                <p className={classes.textAlongIcon}> Saved Searches</p>
              </div>

              <div>
                <img
                  src={LightBulbIcon}
                  alt="light bulb icon"
                  className={classes.iconAlongText}
                />{" "}
                <p className={classes.textAlongIcon}>
                  Save searches for quick access. Just click the save button to
                  the right of the search field.
                </p>
              </div>
            </Grid>
            <Grid item xs={3} className={classes.colContainerPad}>
              <div>
                <img
                  src={FireIcon}
                  alt="fire icon"
                  className={classes.iconAlongText}
                />{" "}
                <p className={classes.textAlongIcon}> Recent Searches</p>
              </div>

              <div>
                <img
                  src={LightBulbIcon}
                  alt="light bulb icon"
                  className={classes.iconAlongText}
                />{" "}
                <p className={classes.textAlongIcon}>
                  {" "}
                  Here you’ll find your recent searches. (Did you know? 93$ of
                  the time, people search for the same thing)
                </p>
              </div>
            </Grid>
          </Grid>
        </div>
      </Box>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Avatar className={classes.avatar} src={defaultProfile} /> */}
          <div className={classes.active}>
            <SearchIcon onClick={toggleDrawer(anchor, true)} />
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Search;
