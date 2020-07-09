import React, { useContext } from "react";
import PropTypes from "prop-types";

// params
import stateInfo from "../../params/stateInfo.json";

// context
import { SelectContext } from "../../context/SelectContext";

// styles
import { IconButton, Typography, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
	drawerSection: {},
	sectionTitle: {
		paddingTop: theme.spacing(4),
		fontWeight: 700,
		fontSize: "1.5rem",
	},
	deselectButton: {
		color: "red",
	},
}));

const Selections = (props) => {
	const { setFilters } = props;
	const { selected, setSelected } = useContext(SelectContext);
	const classes = useStyles(props);

	const handleSelectionCheckbox = (state) => {
		if (selected.includes(state)) {
			setSelected(prevState => prevState.filter(s => s !== state));
		} else {
			setSelected(prevState => ([...prevState, state]));
		}
	};

    return (
		<>
			<Typography className={classes.sectionTitle}>Selections</Typography>
			<div className={classes.drawerSection}>
				<IconButton
					aria-label="deselect all"
					edge="start"
					onClick={() => setFilters([])}
					className={classes.deselectButton}
				>
					<CloseIcon />
				</IconButton>
				<Typography component="span">Deselect All</Typography>
				<FormControl>
					<FormLabel component="legend">States</FormLabel>
					<FormGroup>
						{selected.length > 0 &&
							selected.sort().map(state => (
								<FormControlLabel
									key={state}
									label={state}
									control={
										<Checkbox
											checked={selected.includes(state)}
											onChange={() =>
												handleSelectionCheckbox(state)
											}
											name={state}
										/>
									}
								/>
							))
						}
						<Divider />
						{stateInfo.map(state => {
							return (
								!selected.includes(state.name) && (
									<FormControlLabel
										key={state.name}
										label={state.name}
										control={
											<Checkbox
												checked={selected.includes(
													state.name
												)}
												onChange={() =>
													handleSelectionCheckbox(
														state.name
													)
												}
												name={state.name}
											/>
										}
									/>
								)
							);
						})}
					</FormGroup>
				</FormControl>
			</div>
		</>
    );
};

export { Selections };

Selections.propTypes = {
	setFilters: PropTypes.func.isRequired
};