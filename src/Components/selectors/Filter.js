import React from 'react';
import PropTypes from "prop-types";

// styles
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";

const Filter = (props) => {
	const { filter, handleFilter, filterSettings } = props; 
	const { id, refLabel, label, type, options } = filter;

	return (
		<FormControl style={{width: "100%"}}>
			<InputLabel id={id}>{label}</InputLabel>
			<Select
				labelId={id}
				name={refLabel}
				onChange={(e) => handleFilter(e)}
			>
				{options.map(option => (
					<MenuItem 
						key={option}
						value={option}
					>
						{type === "categorical" 
							? option
							: `${option} ${filterSettings.n}`
						}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
};

export { Filter };

Filter.propTypes = {
	filter: PropTypes.object.isRequired,
	handleFilter: PropTypes.func.isRequired, 
	filterSettings: PropTypes.object
}