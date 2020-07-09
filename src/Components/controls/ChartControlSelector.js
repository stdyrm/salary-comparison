import React, { useState, useEffect, useContext } from 'react';

// context
import { SelectContext } from "../../context/SelectContext";

// styles
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
	root: {
		"& p": {
			display: "inline",
			fontSize: "1rem"
		}
	},
	deselectAllButton: {
		color: "#FF0000"
	}
}));

const ChartControlSelector = (props) => {
	const { select, setSelected } = useContext(SelectContext);
	const classes = useStyles();

	return (
		<div container className={classes.root}>
			<p>Deselect All</p>
			<IconButton
				title="Deselect all"
				onClick={() => setSelected([])}	
			>
				<ClearIcon className={classes.deselectAllButton}/>
			</IconButton>
		</div>
	);
};

export default ChartControlSelector;

