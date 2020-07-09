import React from 'react';
import PropTypes from "prop-types";

// styles
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const Parameter = (props) => {
	const { axis, chartParams, handleParameter } = props;
	const { id, label, paramFields } = chartParams[axis];

	return (
		<FormControl style={{width: "100%"}}>
			<InputLabel id={id}>{label}</InputLabel>
			<Select
				labelId={id}
				name={axis}
				defaultValue={paramFields[0]}
				value={chartParams[axis].param}
				onChange={(e) => handleParameter(e)}
			>
				{paramFields.map(field => (
					<MenuItem
						key={field}
						value={field}
					>
						{field}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
};

export { Parameter };

Parameter.propTypes = {
	axis: PropTypes.string.isRequired,
	chartParams: PropTypes.object.isRequired,
	handleParameter: PropTypes.func.isRequired
}