import React from "react";
import PropTypes from "prop-types";

// styles
import { Drawer, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  drawer: {},
  drawerPaper: {
    width: props => props.drawerWidth,
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(2),
  },
  mobileDrawer: {},
}));

const SideDrawer = props => {
  const { mobileOpen, handleDrawer, drawerWidth } = props;

  const classes = useStyles(props);

  return (
    <nav aria-label="chart parameters">
      {/* <Hidden lgUp> */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawer}
        className={classes.mobileDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{ keepMounted: true }}
      >
        {props.children}
      </Drawer>
      {/* </Hidden> */}
      {/* <Hidden mdDown>
				<Drawer
					variant="permanent" 
					open
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					{props.children}
				</Drawer>
			</Hidden> */}
    </nav>
  );
};

export { SideDrawer };

SideDrawer.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawer: PropTypes.func.isRequired,
  drawerWidth: PropTypes.number,
};

SideDrawer.defaultProps = {
  drawerWidth: 240,
};
