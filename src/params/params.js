const params = {
    pageParams: {
        maxWidth: 1200,
    },
    appCPI: {
        chart: {
            id: "",
			title: "Consumer Price Index",
			subtitle: "Data from the World Population Review",
            x: {
				id: "",
				dataType: "nominal",
				scale: "band",
                label: "State",
				axis: "x-axis",
				param: "State",
				paramFields: ["State"],
                options: ["State"],
            },
            y: {
				id: "",
				dataType: "continuous",
				scale: "linear",
                label: "Cost Index",
				axis: "y-axis",
				param: "costIndex",
				paramFields: [
					"costIndex",
					"groceryCost",
					"housingCost",
					"miscCost",
					"transportationCost",
					"utilitiesCost",
				],
            },
            z: {
                id: "",
                label: "",
				axis: "z-axis",
				param: "",
				options: [],
			},
			color: {
				id: "",
				scale: "color",
				label: "Color category",
				axis: "color-axis",
				param: "region",
				paramFields: {
					governor: ["Democrat", "Republican"],
					region: ["Northeast", "Midwest", "South", "West"]
				}
			},
			margin: {
				top: 20,
				bottom: 160,
				left: 100,
				right: 40,
			}
		},
		filterList: [
			{id: "filter-gov", refLabel: "governor", label: "Gov. Party", options: ["Democrat", "Republican"], type: "categorical"},
			{id: "filter-region", refLabel: "region", label: "Region", options: ["Northeast", "Midwest", "South", "West"], type: "categorical"},
			{id: "filter-population-total", refLabel: "population", label: "Population (total)", options: ["Top", "Bottom"], type: "numerical"},
			{id: "filter-population-density", refLabel: "populationDensity", label: "Population (density)", options: ["Top", "Bottom"], type: "numerical"},
			{id: "filter-gdp", refLabel: "gdp", label: "GDP", options: ["Top", "Bottom"], type: "numerical"},
		],
	},
	appBLS: {
        chart: {
            id: "",
			title: "Wage comparison US states",
			subtitle: "Data from the U.S. Bureau of Labor Statistics",
			x: {
				id: "",
				dataType: "nominal",
				scale: "band",
				label: "State",
				axis: "x-axis",
				param: "area_title",
				paramFields: [
				],
			},
            y: {
				id: "",
				dataType: "nominal",
				scale: "band",
                label: "Occupation",
				axis: "y-axis",
				param: "occ_title",
				paramFields: ["occ_title"],
            },
            z: {
				id: "",
				scale: "",
                label: "",
				axis: "z-axis",
				param: "",
				paramFields: [],
			},
			color: {
				id: "",
				scale: "color",
				label: "Color category",
				axis: "color-axis",
				param: "a_median",
				selected: "a_median",
				paramFields: [
					{label: "Median salary (nominal)", value: "a_median"},
					{label: "Median salary (real)", value: "RPP_a_median"}
				]
			},
			margin: {
				top: 100,
				bottom: 180,
				left: 340,
				right: 80,
			}
		},
		REFERENCE: {
			occupationAbbrevations: {
				administrative: "admin",
				business: "bus.",
				entertainment: "ent.",
				financial: "fin.",
				maintenance: "maint.",
			}
		},
		filterList: [
			{id: "filter-gov", refLabel: "governor", label: "Gov. Party", options: ["Democrat", "Republican"], type: "categorical"},
			{id: "filter-region", refLabel: "region", label: "Region", options: ["Northeast", "Midwest", "South", "West"], type: "categorical"},
			{id: "filter-population-total", refLabel: "population", label: "Population (total)", options: ["Top", "Bottom"], type: "numerical"},
			{id: "filter-population-density", refLabel: "populationDensity", label: "Population (density)", options: ["Top", "Bottom"], type: "numerical"},
			{id: "filter-gdp", refLabel: "gdp", label: "GDP", options: ["Top", "Bottom"], type: "numerical"},
		],
	},
	appRPI: {
        chart: {
            id: "",
			title: "Real Per Capita Income US states",
			subtitle: "Data from the U.S. Bureau of Economic Analysis",
            x: {
				id: "",
				dataType: "nominal",
				scale: "band",
                label: "State",
				axis: "x-axis",
				param: "GeoName",
				paramFields: ["GeoName"],
            },
            y: {
				id: "",
				dataType: "continuous",
				scale: "linear",
                label: "Real Personal Income",
				axis: "y-axis",
				param: "2018",
				paramFields: ["2018"],
            },
            z: {
				id: "",
				scale: "",
                label: "",
				axis: "z-axis",
				param: "",
				paramFields: [],
			},
			color: {
				id: "",
				scale: "color",
				label: "Color category",
				axis: "color-axis",
				param: "",
				paramFields: {
				}
			},
			margin: {
				top: 20,
				bottom: 180,
				left: 100,
				right: 20,
			}
		},
		appRPP: {
			chart: {
				id: "",
				title: "Regional Price Parity US states",
				subtitle: "Data from the U.S. Bureau of Economic Analysis (2018)",
				x: {
					id: "",
					dataType: "nominal",
					scale: "band",
					label: "State",
					axis: "x-axis",
					param: "GeoName",
					paramFields: ["GeoName"],
				},
				y: {
					id: "",
					dataType: "continuous",
					scale: "linear",
					label: "Real Personal Income",
					axis: "y-axis",
					param: "2018",
					paramFields: ["2018"],
				},
				z: {
					id: "",
					scale: "",
					label: "",
					axis: "z-axis",
					param: "",
					paramFields: [],
				},
				color: {
					id: "",
					scale: "color",
					label: "Color category",
					axis: "color-axis",
					param: "",
					paramFields: {
					}
				},
				margin: {
					top: 20,
					bottom: 180,
					left: 100,
					right: 20,
				}
			},
		}
	}
};

export { params };