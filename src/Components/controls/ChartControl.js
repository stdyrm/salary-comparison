import React from "react";

// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  chartControlWrapper: {
    width: "600px",
    display: "flex",
  },
}));

const ChartControl = props => {
  const classes = useStyles();

  return <div className={classes.chartControlWrapper}>{props.children}</div>;
};

export default ChartControl;
