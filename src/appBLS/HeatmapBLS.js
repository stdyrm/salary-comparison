import React, { useEffect, useRef, useContext } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";
import clsx from "clsx";

// context
import { SelectContext } from "../context/SelectContext";

// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  rootContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  chartContainer: {
    paddingTop: theme.spacing(6),
  },
  heatmapSquare: {
    opacity: 0.6,
    borderRadius: "3px",
    "&:hover": {
      strokeWidth: "3px",
      opacity: 1,
      cursor: "pointer",
    },
  },
  squaretext: {
    textAlign: "center",
    fill: "#000",
    "&:hover": {
      strokeWidth: "2px",
      opacity: 1,
      cursor: "pointer",
    },
  },
  heatmapSquareSelected: {
    stroke: theme.palette.text.primary,
    opacity: 1,
    fill: "blue",
  },
  tooltip: {
    position: "absolute",
    textAlign: "left",
    maxWidth: "250px",
    padding: ".3rem",
    border: "0px",
    borderRadius: "4px",
    backgroundColor: theme.palette.primary.dark,
  },
}));

const HeatmapBLS = props => {
  const { data, chartParams, scales, condenseYLabel } = props;
  const { x, y, color } = chartParams;
  const { xScale, yScale, getColorScale } = scales;
  const { selected, setSelected } = useContext(SelectContext);
  const heatmapRef = useRef(null);

  const classes = useStyles();

  useEffect(() => {
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", classes.tooltip)
      .attr("id", "heatmap-tooltip")
      .style("opacity", 0);

    const squares = d3
      .select(heatmapRef.current)
      .selectAll("rect")
      .data(data, d => d)
      .join("rect")
      .attr("x", d => xScale(d[x.param]))
      .attr("y", d => yScale(d[y.param]))
      .attr("width", () => xScale.bandwidth())
      .attr("height", () => yScale.bandwidth())
      .attr("id", d => `${d.occ_code}-${d.area}`)
      .attr("class", d =>
        !selected.includes(`${d.occ_code}-${d[y.param]}`)
          ? clsx(
              classes.heatmapSquare,
              `bls-area-${d.area}`,
              `bls-occ-${d.occ_code}`
            )
          : clsx(
              classes.heatmapSquare,
              classes.heatmapSquareSelected,
              `bls-area-${d.area}`,
              `bls-occ-${d.occ_code}`
            )
      )
      .style("fill", d => getColorScale(d[y.param], d[color.param]));

    squares.on("mouseover", d => {
      const selectColumn = d3.selectAll(`.bls-area-${d.area}`);
      const selectRow = d3.selectAll(`.bls-occ-${d.occ_code}`);
      const occupation = condenseYLabel(d[y.param]);

      selectColumn
        .style("opacity", 1)
        .style("stroke", "#27ffff")
        .style("stroke-width", "3px");
      selectRow
        .style("opacity", 1)
        .style("stroke", "#27ffff")
        .style("stroke-width", "3px");

      tooltip
        .style("opacity", 0.9)
        .html(
          `<strong>${d[x.param]}</strong><hr/>
					
					${occupation}
					<br/>
					${color.param}: $${Math.round(d[color.param] * 1000).toLocaleString()}/year`
        )
        .style("left", `${d3.event.pageX + 10}px`)
        .style("top", `${d3.event.pageY + 28}px`);
    });

    squares.on("mouseout", d => {
      const selectColumn = d3.selectAll(`.bls-area-${d.area}`);
      const selectRow = d3.selectAll(`.bls-occ-${d.occ_code}`);

      selectColumn.style("opacity", 0.7).style("stroke", "none");
      selectRow.style("opacity", 0.7).style("stroke", "none");

      tooltip.style("opacity", 0).style("left", `0px`).style("top", `0px`);
    });

    squares.on("click", d => {
      const selectColumn = d3.selectAll(`.bls-area-${d.area}`);
      const selectRow = d3.selectAll(`.bls-occ-${d.occ_code}`);

      const selection = `${d.occ_code}-${d[y.param]}`;

      selectColumn
        .attr("class", classes.heatmapSquareSelected)
        .style("opacity", 1)
        .style("stroke", "#27ffff")
        .style("stroke-width", "3px");
      selectRow
        .attr("class", classes.heatmapSquareSelected)
        .style("opacity", 1)
        .style("stroke", "#27ffff")
        .style("stroke-width", "3px");
    });
  }, [chartParams, scales]);

  return <g ref={heatmapRef} />;
};

export { HeatmapBLS };

HeatmapBLS.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  chartParams: PropTypes.object.isRequired,
  scales: PropTypes.object.isRequired,
};
