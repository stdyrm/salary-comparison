import React, { useState, useEffect, useRef,useContext } from 'react'
import { nest, min, max, scaleBand, scaleSequential, interpolateRdYlGn, axisBottom, axisLeft, select } from "d3";
import PropTypes from "prop-types";


// params
import stateInfo from "../params/stateInfo.json";
import { PARAMS_HEATMAP } from "../params";

// components
import { Labels } from "../Components/chart";
import { HeatmapBLS } from "./HeatmapBLS";

// context
import { SelectContext } from "../context/SelectContext";

//  utils
import { pivotData } from "../utils/dataUtils";

// styles
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const defaultDimensions = {
	width: window.innerWidth * 1,
	height: window.innerHeight * .9
};
const stateKeys = pivotData(stateInfo, "name");
const { occupationAbbreviations } = PARAMS_HEATMAP.REFERENCE;

const useStyles = makeStyles((theme) => ({
	rootContainer: {
		position: "relative",
		width: "100%",
		height: "100%",
		padding: 0
	},
	chartContainer: {
		width: "100%",
		position: "relative",
		margin: "0 auto",
	},
	boundsContainer: {
	},
	axis: {
		color: theme.palette.text.primary,
		fontSize: "1rem",
		fontWeight: 600,
	},
	axisSelected: {
		color: "red",
	},
}));

const ChartBLS = (props) => {
	const { data, chartParams } = props;
	const [scales, setScales] = useState(null);
	const [dimensions, setDimensions] = useState(defaultDimensions);
	const { selected, setSelected } = useContext(SelectContext);

	const { x, y, color, margin } = chartParams;
	const { width, height } = dimensions;

	const wrapperRef = useRef(null);
	const svgRef = useRef(null);
	const boundsRef = useRef(null);
	const xRef = useRef(null);
	const yRef = useRef(null);

	const classes = useStyles();

	const condenseYLabel = (label) => {
		let revLabel = label.split(" ").slice(0, -1).join(" ");
		Object.keys(occupationAbbreviations).forEach(long => {
			if (revLabel.includes(long)) {
				revLabel = revLabel.replace(long, occupationAbbreviations[long]);
			}
		});

		return revLabel;
	};

	useEffect(() => {
		const createScales = async () => {
			let statesPerOccupation = {};

			const nested = nest()
				.key(d => d.occ_title)
				.entries(data)

			await nested.forEach(occ => {
				let valuesEachState = [];
		
				occ.values.forEach(state => {
					valuesEachState.push(state[color.param])
				});

				statesPerOccupation[occ.key] = [min(valuesEachState), max(valuesEachState)];
			});

			const xScale = scaleBand()
				.domain(data.map(d => d[x.param]).sort())
				.range([0, width]);
				
			const yScale = scaleBand()
				.domain(data.map(d => d[y.param]).sort().reverse())
				.range([height, 0]);

			const getColorScale = (occupation,value) => {
				const colorScale = scaleSequential(interpolateRdYlGn)
					.domain(statesPerOccupation[occupation])

				return colorScale(value);
			};

			setScales({
				xScale,
				yScale,
				getColorScale
			});

			const xAxisGenerator = axisBottom(xScale);
			const yAxisGenerator = axisLeft(yScale);

			select(xRef.current).call(xAxisGenerator)
				.selectAll("text")
				.attr("id", d => `bls-xtick-${stateKeys[d][0].id}`)
				.attr("dy", "-.15rem")
				.attr("dx", "-.8rem")
				.attr("transform", "rotate(-65)")
				.attr("class", classes.axis)
				.style("text-anchor", "end");
			
			const yAxis = select(yRef.current).call(yAxisGenerator)
				.selectAll("text")
				.attr("class", classes.axis)
				.text(d => condenseYLabel(d));
		};
	createScales();
	}, [selected, data, chartParams]);

	return (
		<section>
			<Grid container id="bls-chart-wrapper" className={classes.rootContainer} ref={wrapperRef}>
				<svg
					ref={svgRef} 
					className={classes.chartContainer}
					viewBox={`0 ${-margin.top - margin.bottom} ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`}
				>
					<g 
						ref={boundsRef} 
						className={classes.boundsContainer} 
						transform={`translate(${margin.left},-${margin.bottom})`}
					>
						<g ref={xRef} transform={`translate(0,${height})`} />
						<g ref={yRef} className={classes.axis} />
						{scales
							&& <>
									<HeatmapBLS 
										data={data}
										chartParams={chartParams}
										scales={scales}
									/>
									<Labels
										chartParams={chartParams}
										dimensions={dimensions}
										innerProps={{
											title: {
												transform: `translate(${width / 2}, ${-margin.top * .5})`
											},
											subtitle: {
												transform: `translate(${width / 2}, ${-margin.top * .25})`
											},
											xLabel: {
												textAnchor: "start",
												transform: `translate(${width + margin.right * .25}, ${height + 10})`
											},
											yLabel: {
												textAnchor: "end",
												transform: `translate(0, ${-margin.top * .25})`
											}
										}}
										labels={{
											yLabel: "Occupation",
											xLabel: "State"
										}}
									/>
								</>
						}
					</g>
				</svg>
			</Grid>
		</section>
	)
};

export { ChartBLS };

ChartBLS.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired, 
	chartParams: PropTypes.object
};