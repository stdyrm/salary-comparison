import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";

// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  chartContainer: {
    width: "100%",
    position: "relative",
    margin: "0 auto",
  },
  boundsContainer: {},
  axis: {
    color: theme.palette.text.primary,
    fontSize: "1.2em",
  },
}));

const ChartTemplate = props => {
  const { data, dimensions, scales, chartParams } = props;
  const { x, y, color, margin } = chartParams;
  const { width, height } = dimensions;

  const svgRef = useRef(null);
  const boundsRef = useRef(null);
  const xRef = useRef(null);
  const yRef = useRef(null);

  const classes = useStyles(props);

  useEffect(() => {
    if (scales) {
      const xAxisGenerator = d3.axisBottom().scale(scales.xScale);
      const yAxisGenerator = d3.axisLeft().scale(scales.yScale);

      d3.select(xRef.current)
        .call(xAxisGenerator)
        .selectAll("text")
        .attr("dy", ".15em")
        .attr("dx", "-.8em")
        .attr("transform", "rotate(-65)")
        .style("text-anchor", "end");

      d3.select(yRef.current).call(yAxisGenerator);
    }
  }, [data, scales, chartParams]);

  return (
    <svg
      ref={svgRef}
      className={classes.chartContainer}
      viewBox={`0 ${-margin.top - margin.bottom} ${
        width + margin.left + margin.right
      } ${height + margin.top + margin.bottom}`}
    >
      <g
        ref={boundsRef}
        className={classes.boundsContainer}
        transform={`translate(${margin.left},-${margin.bottom})`}
      >
        <g
          ref={xRef}
          className={classes.axis}
          transform={`translate(0,${height})`}
        />
        <g ref={yRef} className={classes.axis} />
        {props.children}
      </g>
    </svg>
  );
};

export { ChartTemplate };

ChartTemplate.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  dimensions: PropTypes.object,
  scales: PropTypes.object,
  chartParams: PropTypes.object,
};
