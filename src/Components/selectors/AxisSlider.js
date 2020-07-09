import React, { useState } from 'react';

// styles
import { Slider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	slider: {
		width: 800,
	}
}))

const AxisSlider = (props) => {
	const { data, chartParams, axis } = props;
	const [value, setValue] = useState([0, 10])
	const classes = useStyles();

	const handleValue = (e, newVal) => {
		setValue(newVal);
	};

	return (
		<Slider
			value={value}
			step={10}
			valueLabelDisplay="on"
			onChange={handleValue}
			className={classes.slider}
		/>
	)
};

export { AxisSlider };
