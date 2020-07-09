import React, { useEffect, useRef, useContext } from 'react'
import * as d3 from "d3";
import clsx from "clsx";
import PropTypes from "prop-types";

// context
import { SelectContext } from "../../context/SelectContext";

// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	bar: {
		fill: theme.palette.secondary.main,
		opacity: 0.8,
		"&:hover": {
			cursor: "pointer",
			opacity: 0.7
		},
	},
	barSelected: {
		fill: theme.palette.primary.main,
		opacity: 1,
		stroke: theme.palette.text.primary,
	},
	label: {}
}));

const Bars = (props) => {
	const { chartParams, data, dimensions, scales } = props;
	const { selected } = useContext(SelectContext);
	const { x, y, color } = chartParams;
	const { xScale, yScale, colorScale } = scales;
	const { width, height } = dimensions;

	const barsRef = useRef(null);
	const classes = useStyles(props);

	useEffect(() => {
		const bars = d3.select(barsRef.current)
			.selectAll("rect")
			.data(data.sort((a,b) => d3.ascending(a[y.param], b[y.param])), d => d)
			.join("rect")
				.attr("width", xScale.bandwidth())
				.attr("height", d => height - yScale(d[y.param]))
				.attr("x", d => xScale(d[x.param]))
				.attr("y", d => yScale(d[y.param]))
				.attr("id", d => `bls-bar-${d[x.param]}`)
				.attr("class", d => selected.includes(d[x.param])
					? clsx(classes.bar, classes.barSelected)
					: classes.bar
				)
				.call(bar => bar.append("title")
					.text(d => [
						d[x.param],
						d[y.param],
					].join("\n"))
				);

		bars.on("click", bar => {
			d3.select()
		})


	}, [data, selected, chartParams, scales]);

	return (
		<g ref={barsRef} />
	)
};

export { Bars };

Bars.propTypes = {
	chartParams: PropTypes.object, 
	data: PropTypes.arrayOf(PropTypes.object), 
	dimensions: PropTypes.object, 
	scales: PropTypes.object
};