import { useState, useEffect } from 'react';
import * as d3 from "d3";

// utils
import { cleanData } from "../utils/dataUtils";

const useData = (data) => {
	const [clean, setClean] = useState([]);

	useEffect(() => {
		if (typeof data === "object") {
			setClean(cleanData(data));
		} else if (data.split(".").pop() === "csv") {
			d3.csv(data)
				.then(res => setClean(cleanData(res)));
		} else {
			throw new Error("Unknown file type.");
		}
	}, [data]);
	
	return clean;
};

export { useData };