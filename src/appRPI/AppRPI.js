import React, { useState, useEffect } from 'react';
import * as d3 from "d3";

// params
import { params } from "../params/params";
import stateInfo from "../params/stateInfo.json";

// components
import { Navbar, SideDrawer } from "../Components/nav";
import { ChartRPI } from "./ChartRPI";

// context
import { SelectContext } from "../context/SelectContext";

// data
import dataPriceParity from "../data/bea_regional_price_parities_2018.csv";
import dataRealPersonalIncome from "../data/bea_real_personal_income_2018.csv";

// styles
import { Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const AppRPI = () => {
	const [data, setData] = useState(null);
	const [chartParams, setChartParams] = useState(params.appRPI.chart);
	const [selected, setSelected] = useState([]);
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawer = () => {
		setMobileOpen(!mobileOpen);
	};

	useEffect(() => {
		d3.text(dataRealPersonalIncome)
			.then(res => {
				return d3.csvParse(res.split("\n").slice(4).join("\n"), d => {
					return {
						GeoFips: +d.GeoFips,
						GeoName: d.GeoName,
						LineCode: +d.LineCode,
						Description: d.Description,
						"2018": +d["2018"],
					}
				})	
			})
			.then(res => {
				const dataOnlyPerCapita = res.filter(
					row => 
						row.Description !== "Real personal income (millions of chained (2012) dollars)"
						&& row.GeoName.length > 0
				)	
				setData(dataOnlyPerCapita);
			});
	}, []);

	return (
		<section>
			<header>
				<Navbar handleDrawer={handleDrawer} />
			</header>
			<SelectContext.Provider value={{selected, setSelected}}>
				{data
					&& <ChartRPI
							data={data}
							chartParams={chartParams}
						/>
				}
			</SelectContext.Provider>
		</section>
	)
};

export { AppRPI };
