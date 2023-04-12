import React, { Component } from 'react';
import { withStyles } from '@mui/styles';

import PropTypes from 'prop-types';

import { Drawer, Box, Backdrop } from '@mui/material';

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

//Styles
import { styles } from './styles';

class ResponsiveDrawer extends Component {
  state = {
    isResizing: false,
    backDropOpen: false,
    lastDownX: 0,
    hover: false,
    newWidth: {},
  };

  constructor(props) {
    super(props);
    this.handleMousemove.bind(this);
  }

  handleMousedown = (e) => {
    this.setState({ isResizing: true, lastDownX: e.clientX });
  };

  handleMousemove = (e) => {
    // we don't want to do anything if we aren't resizing.
    if (!this.state.isResizing) {
      return;
    }

    let offsetRight =
      document.body.offsetWidth - (e.clientX - document.body.offsetLeft);
    let minWidth = 569;
    let maxWidth = 1118;
    if (offsetRight > minWidth && offsetRight < maxWidth) {
      this.setState({
        newWidth: { width: offsetRight },
        backDropOpen: true,
        hover: true,
      });
    }
  };

  handleMouseup = () => {
    this.setState({ isResizing: false, backDropOpen: false });
  };

  handleMouseOver = () => {
    this.setState({ hover: true });
  };

  handleMouseOut = () => {
    if (this.state.isResizing) {
      return;
    }

    this.setState({ hover: false });
  };

  componentDidMount() {
    document.addEventListener('mousemove', (e) => this.handleMousemove(e));
    document.addEventListener('mouseup', (e) => this.handleMouseup(e));
  }

  render() {
    const { classes, isOpen, content, handleClose } = this.props;

    return (
      <Box className={classes.root}>
        <Backdrop
          open={this.state.backDropOpen}
          sx={{
            backgroundColor: '#25175aa3',
          }}
        ></Backdrop>
        <Drawer
          open={isOpen}
          variant="persistent"
          anchor={'right'}
          classes={{
            paper: classes.drawerPaper,
          }}
          PaperProps={{ style: this.state.newWidth }}
          hideBackdrop={true}
          onClose={handleClose}
          disableEnforceFocus
          onMouseOver={(event) => {
            this.handleMouseOver(event);
          }}
          onMouseOut={(event) => {
            this.handleMouseOut(event);
          }}
        >
          <Box
            id="dragger"
            onMouseDown={(event) => {
              this.handleMousedown(event);
            }}
            role="button"
            tabIndex={0}
            sx={{ display: !this.state.hover ? 'none' : 'flex' }}
            className={classes.dragger}
          >
            <DragIndicatorIcon sx={{ width: '1.5em', height: '1.5em' }} />
          </Box>
          {content}
        </Drawer>
      </Box>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  content: PropTypes.any,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
