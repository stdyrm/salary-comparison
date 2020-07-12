import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";

// components
import { ChartTemplate, Bars, Labels } from "../Components/chart";

// styles
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const defaultDimensions = {
  width: window.innerWidth * 0.8,
  height: window.innerHeight * 0.6,
};

const useStyles = makeStyles(theme => ({
  rootContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  chartContainer: {
    paddingTop: theme.spacing(6),
  },
}));

const ChartRPI = props => {
  const { data, chartParams } = props;
  const [dimensions, setDimensions] = useState(defaultDimensions);
  const [scales, setScales] = useState(null);

  const { x, y, color } = chartParams;
  const { width, height } = dimensions;

  const classes = useStyles();

  useEffect(() => {
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d[x.param]))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d[y.param])])
      .range([height, 0]);

    setScales({
      xScale,
      yScale,
    });
  }, [data]);

  return (
    <section className={classes.rootContainer}>
      <Grid className={classes.chartContainer}>
        {scales && (
          <ChartTemplate
            data={data}
            chartParams={chartParams}
            dimensions={dimensions}
            scales={scales}
          >
            <Bars
              data={data}
              chartParams={chartParams}
              dimensions={dimensions}
              scales={scales}
            />
            <Labels
              chartParams={chartParams}
              dimensions={dimensions}
              labels={{
                xLabel: "State",
                yLabel: "Real Per Capita Income (USD 2018)",
              }}
            />
          </ChartTemplate>
        )}
      </Grid>
    </section>
  );
};

export { ChartRPI };

ChartRPI.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  chartParams: PropTypes.object.isRequired,
};
