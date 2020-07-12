const PARAMS_HEATMAP = {
  CHART: {
    id: "",
    title: "Salary comparison US states",
    subtitle:
      "Data from the U.S. Bureau of Labor Statistics and U.S. Bureau of Economic Analysis",
    x: {
      id: "",
      dataType: "nominal",
      scale: "band",
      label: "State",
      axis: "x-axis",
      param: "area_title",
      paramFields: [],
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
        {
          label: "Median salary (nominal)",
          value: "a_median",
          description:
            "Data from Bureau of Labor Statistics: \nMay 2019 State Occupational Employment and Wage Estimates",
        },
        {
          label: "Median salary (real)",
          value: "RPP_a_median",
          description:
            "Real salary derived using Regional Price Parity from Bureau of Economic Analysis report: \nSARPP Regional Price Parities by State",
        },
      ],
    },
    margin: {
      top: 100,
      bottom: 180,
      left: 300,
      right: 80,
    },
  },
  PAGE: {
    title: "Salary Comparison US States",
    about: [
      {
        title: "Purpose",
        text: [
          "This heatmap provides a quick comparison of salaries across US states and the District of Columbia.",
          "Users can toggle between nominal (not adjusted for Regional Price Parity) and real (adjusted for Regional Price Parity).",
        ],
      },
      {
        title: "Data",
        text: [
          "Nomal salary data is provided by the Bureau of Labor Statistics (BLS) report: May 2019 State Occupational Employment and Wage Estimates. Median annual salary is used in this chart.",
          "Real salary derived using Regional Price Parity (RPP) from Bureau of Economic Analysis (BEA) report: SARPP Regional Price Parities by State",
          "RPP is calculated by the U.S. BEA, and it measures prices of goods/services expressed as a percentage of national prices.",
          "Real salary for each state is estimated by multiplying RPP by salary",
        ].join("\n"),
        list: [
          {
            id: "bls-about-green",
            text:
              "GREEN = HIGH salary for the SAME occupation in relation to OTHER states.",
          },
          {
            id: "bls-about-yellow",
            text:
              "YELLOW = MEDIAN salary for the SAME occupation in relation to OTHER states.",
          },
          {
            id: "bls-about-red",
            text:
              "RED = LOW salary for the SAME occupation in relation to OTHER states.",
          },
        ],
      },
    ],
  },
  REFERENCE: {
    occupationAbbreviations: {
      and: "&",
      Administrative: "Admin.",
      Building: "Bldg",
      Business: "Bus.",
      Cleaning: "Clean.",
      Educational: "Edu.",
      Entertainment: "Ent.",
      Financial: "Fin.",
      Maintenance: "Maint.",
      Mathematical: "Math",
      Physical: "Phys.",
      Preparation: "Prep.",
      Related: "Rel.",
      Technical: "Tech",
      Transportation: "Trans.",
    },
  },
  FILTER_LIST: [
    {
      id: "filter-gov",
      refLabel: "governor",
      label: "Gov. Party",
      options: ["Democrat", "Republican"],
      type: "categorical",
    },
    {
      id: "filter-region",
      refLabel: "region",
      label: "Region",
      options: ["Northeast", "Midwest", "South", "West"],
      type: "categorical",
    },
    {
      id: "filter-population-total",
      refLabel: "population",
      label: "Population (total)",
      options: ["Top", "Bottom"],
      type: "numerical",
    },
    {
      id: "filter-population-density",
      refLabel: "populationDensity",
      label: "Population (density)",
      options: ["Top", "Bottom"],
      type: "numerical",
    },
    {
      id: "filter-gdp",
      refLabel: "gdp",
      label: "GDP",
      options: ["Top", "Bottom"],
      type: "numerical",
    },
  ],
};

export default PARAMS_HEATMAP;
