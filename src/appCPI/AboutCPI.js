import React from 'react';

// components
import { About } from "../Components/layouts/";

// styles
import { Typography, Divider } from "@material-ui/core";

const AboutCPI = (props) => {
	return (
		<section>
			<About>
				<Typography variant="h4">Background</Typography>
				<Typography>The Consumer Price Index (CPI) is used for ...</Typography><br />
				<Typography variant="h4">Data</Typography>
				<Typography>The data in this chart is sourced from the World Population Review</Typography><br />
			</About>
		</section>
	)
};

export { AboutCPI };
