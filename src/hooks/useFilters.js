import React, { useState, useEffect } from "react";

import stateInfo from "../params/stateInfo.json";

const useFilters = (filters) => {
	const [selection, setSelection] = useState([]);

	const filterCategories = newFilter => {
		let newSelection = [];

		stateInfo.forEach(state => {	
			if (state[newFilter.refLabel] === newFilter.selectedFilter) {
				newSelection.push(state.name);
			}
		});
		return newSelection;
	};

	const filterValues = newFilter => {
		let newSelection = [];
		let filtered;

		if (newFilter.selectedFilter === "Top") {
			filtered = stateInfo
				.sort((a,b) => b[newFilter.refLabel] - a[newFilter.refLabel])
				.slice(0, newFilter.n);
		} else if (newFilter.selectedFilter === "Bottom") {
			filtered = stateInfo
				.sort((a,b) => a[newFilter.refLabel] - b[newFilter.refLabel])
				.slice(0, newFilter.n);
		} else {
			throw "Invalid filter selection!";
		}

		filtered.forEach(state => newSelection.push(state.name));
		return newSelection;
	};

	const handleSelectionChange = filterList => {
		let finalSelection = [];
		let currSelection = [];

		filterList.forEach(newFilter => {
			currSelection = newFilter.type === "categorical" 
				? filterCategories(newFilter)
				: filterValues(newFilter);
			
			finalSelection = finalSelection.length < 1 
				? currSelection 
				: currSelection.filter(s => finalSelection.includes(s));
		});

		return finalSelection;
	};

	useEffect(() => {
		if (filters.length < 1) {
			return setSelection([]);
		}
		setSelection(handleSelectionChange(filters));
	}, [filters]);
	
	return selection;
};

export { useFilters };