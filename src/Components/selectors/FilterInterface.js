import React from 'react';
import PropTypes from "prop-types";

// components
import { Filter } from "./Filter";

// styles
import { TextField, Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	drawerSection: {},
	sectionTitle: {
		paddingTop: theme.spacing(4),
		fontWeight: 700,
		fontSize: "1.5rem",
	},
	chip: {
		margin: theme.spacing(0.5)
	}
}));

const FilterInterface = (props) => {
	const { 
		filterList, 
		filters, 
		setFilters, 
		filterSettings, 
		setFilterSettings,
	} = props;

	const classes = useStyles(props);

	const handleFilterSettings = (e) => {
		const newNumber = e.target.value;
		setFilterSettings(prevState => ({
			...prevState,
			n: newNumber
		}))
	};

	const handleFilter = (e) => {
		setFilters(prevState => [
			...prevState, 
			{
				id: e.target.labelId,
				refLabel: e.target.name,
				selectedFilter: e.target.value,
				type: e.target.name === "governor" || e.target.name === "region" 
					? "categorical"
					: "numerical",
				n: filterSettings.n
			}
		]);
	};

	const handleDeleteChip = (chip) => {
		setFilters(prevState => prevState.filter(f => f !== chip));
	};

	return (
		<>
			<Typography className={classes.sectionTitle}>Filters</Typography>
			<div className={classes.drawerSection}>
				<TextField
					variant="outlined"
					type="number"
					label="Num. to filter"
					defaultValue={filterSettings.n}
					style={{width: "100%"}}
					InputProps={{
						inputProps: {
							min: 1,
							max: 50,
						}
					}}
					onChange={(e) => handleFilterSettings(e)} 
				/>
				{filterList.map(filter => (
					<Filter 
						key={filter.id}
						filter={filter}
						handleFilter={handleFilter}
						filterSettings={filterSettings}
					/>
				))}
			</div>
			<Typography className={classes.sectionTitle}>Active Filters</Typography>
			<div className={classes.drawerSection}>
				{filters.length > 0
					? filters.map((filter,i) => (
						<Chip
							key={filter.refLabel}
							name={i}
							label={filter.type === "categorical" 
								? filter.selectedFilter
								: `${filter.refLabel} ${filter.selectedFilter} ${filter.n}`
							}
							variant="outlined"
							onDelete={() => handleDeleteChip(filter)}
							className={classes.chip}
						/>
					))
					: <Typography>No active filters</Typography>
				}
			</div>
	</>
	)
};

export { FilterInterface };

FilterInterface.propTypes = { 
	filterList: PropTypes.arrayOf(PropTypes.object).isRequired, 
	filters: PropTypes.arrayOf(PropTypes.object).isRequired, 
	setFilters: PropTypes.func.isRequired, 
	filterSettings: PropTypes.object.isRequired, 
	setFilterSettings: PropTypes.func.isRequired,
};