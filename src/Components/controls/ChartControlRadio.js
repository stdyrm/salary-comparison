import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

// styles
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	radioGroup: {
		display: "inline-block"
	},
}));

const ChartControlRadio = ({ ariaLabel, name, axis, chartParams, setChartParams }) => {
	const parameter = chartParams[axis];
	const classes = useStyles();

	const handleSelect = e => {
		setChartParams(prevState => ({
			...prevState,
			[axis]: {
				...prevState[axis],
				param: e.target.value
			}
		}))
	};

	return (
		<FormControl component="fieldset">
			<RadioGroup
				aria-label={ariaLabel}
				name={name}
				value={parameter.param}
				onChange={e => handleSelect(e)}
				className={classes.radioGroup}
			>
				{parameter.paramFields
					? parameter.paramFields.map(field => (
						<FormControlLabel
							key={field.value}
							value={field.value}
							control={<Radio title={field.description} />}
							label={field.label}
						/>
					))
					: <div></div>
				}

			</RadioGroup>
		</FormControl>

	);
};

export default ChartControlRadio;

ChartControlRadio.propTypes = {
	ariaLabel: PropTypes.string,
	name: PropTypes.string,
	axis: PropTypes.string,
	chartParams: PropTypes.object.isRequired,
	setChartParams: PropTypes.func.isRequired,
	paramFields: PropTypes.array.isRequired
};

ChartControlRadio.defaultProps = {
	ariaLabel: "",
	name: "",
	axis: "color"
};