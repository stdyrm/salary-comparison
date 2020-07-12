import React from "react";

// styles
import { Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  toolbar: {
    backgroundColor: theme.palette.secondary.light,
  },
}));

const Footer = props => {
  const classes = useStyles();

  return (
    <Toolbar className={classes.toolbar}>
      <h5>Footer</h5>
      {props.children}
    </Toolbar>
  );
};

export { Footer };
