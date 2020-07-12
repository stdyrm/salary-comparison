import React from "react";
import PropTypes from "prop-types";

// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& text": {
      fill: theme.palette.text.primary,
    },
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: 700,
  },
  subtitle: {
    fontSize: "1.4rem",
    fontWeight: 500,
  },
  xLabel: {
    fontSize: "1.4rem",
    fontWeight: 700,
  },
  yLabel: {
    fontSize: "1.4rem",
    fontWeight: 700,
  },
}));

const Labels = props => {
  const { chartParams, dimensions, innerProps, labels } = props;
  const { title, subtitle, x, y, margin } = chartParams;
  const { width, height } = dimensions;

  const classes = useStyles(props);

  return (
    <g className={classes.root}>
      <text
        textAnchor="middle"
        transform={`translate(${width / 2}, ${0})`}
        className={classes.title}
        {...innerProps.title}
      >
        {!labels.title ? title : labels.title}
      </text>
      <text
        textAnchor="middle"
        transform={`translate(${width / 2}, 20)`}
        className={classes.subtitle}
        {...innerProps.subtitle}
      >
        {!labels.subtitle ? subtitle : labels.subtitle}
      </text>
      <text
        textAnchor="middle"
        transform={`translate(${width / 2}, ${height + margin.bottom})`}
        className={classes.xLabel}
        {...innerProps.xLabel}
      >
        {!labels.xLabel ? x.param : labels.xLabel}
      </text>
      <text
        textAnchor="middle"
        transform={`translate(${-margin.left * 0.8}, ${
          height * 0.5
        }) rotate(-90)`}
        className={classes.yLabel}
        {...innerProps.yLabel}
      >
        {!labels.yLabel ? y.param : labels.yLabel}
      </text>
    </g>
  );
};

export { Labels };

Labels.propTypes = {
  chartParams: PropTypes.object.isRequired,
  dimensions: PropTypes.object.isRequired,
  innerProps: PropTypes.object,
  labels: PropTypes.object,
};

Labels.defaultProps = {
  innerProps: {
    title: {},
    subtitle: {},
    xLabel: {},
    yLabel: {},
  },
  labels: {},
};
