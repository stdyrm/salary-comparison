PARAMS_RPP = {
	CHART: {
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
	APP_RPP: {
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