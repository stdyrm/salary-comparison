import React from "react";
import PropTypes from "prop-types";

// components
import { Parameter } from "./Parameter";

// styles
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  drawerSection: {},
  sectionTitle: {
    paddingTop: theme.spacing(4),
    fontWeight: 700,
    fontSize: "1.5rem",
  },
}));

const ParameterInterface = props => {
  const { axis, chartParams, setChartParams } = props;
  const paramAxis = chartParams[axis];

  const classes = useStyles(props);

  const handleParameter = e => {
    setChartParams(prevState => ({
      ...prevState,
      [e.target.name]: {
        ...prevState[e.target.name],
        param: e.target.value,
      },
    }));
  };

  return (
    <>
      <Typography className={classes.sectionTitle}>Parameters</Typography>
      <div className={classes.drawerSection}>
        <Parameter
          axis={axis}
          paramAxis={paramAxis}
          chartParams={chartParams}
          handleParameter={handleParameter}
        />
      </div>
    </>
  );
};

export { ParameterInterface };

ParameterInterface.propTypes = {
  axis: PropTypes.string.isRequired,
  chartParams: PropTypes.object.isRequired,
  setChartParams: PropTypes.func.isRequired,
};
