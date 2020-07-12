import React, { useState, useEffect } from "react";
import * as d3 from "d3";

// params
import { PARAMS_HEATMAP } from "../params";

// components
import { Navbar, SideDrawer } from "../Components/nav";
import { FilterInterface, Selections } from "../Components/selectors";
import { ChartBLS } from "./ChartBLS";
import {
  ChartControl,
  ChartControlRadio,
  ChartControlSelector,
} from "../Components/controls";
import AboutBLS from "./AboutBLS";

//hooks
import { useData, useFilters } from "../hooks";

// context
import { SelectContext } from "../context/SelectContext";

// data
import dataBLS from "../data/state_M2019_dl.csv";
import dataRPP from "../data/bea_regional_price_parities_2018.csv";

// styles
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  rootDiv: {
    [theme.breakpoints.up("lg")]: {
      paddingLeft: drawerWidth,
    },
  },
  sideDrawer: {},
  sectionTitle: {
    paddingTop: theme.spacing(4),
    fontWeight: 700,
    fontSize: "1.5rem",
  },
  drawerSection: {
    paddingLeft: theme.spacing(2),
  },
  deselectButton: {
    color: "red",
  },
}));

const filterList = PARAMS_HEATMAP.FILTER_LIST;

const AppBLS = () => {
  const dataRaw = useData(dataBLS);

  const [data, setData] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [chartParams, setChartParams] = useState(PARAMS_HEATMAP.CHART);

  const [filters, setFilters] = useState([]);
  const [filterSettings, setFilterSettings] = useState({
    operator: "AND",
    n: 12,
  });
  const filteredSelection = useFilters(filters);
  const [selected, setSelected] = useState([]);

  const classes = useStyles();

  const handleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const cleanData = async data => {
    const dataNoTerritories = data.filter(
      d =>
        d.area_title !== "Virgin Islands" &&
        d.area_title !== "Puerto Rico" &&
        d.area_title !== "Guam"
    );
    const dataMajorOccupations = dataNoTerritories.filter(
      d => d.o_group === "major"
    );
    return dataMajorOccupations;
  };

  const cleanRPPData = async data => {
    return d3
      .text(data)
      .then(res => {
        return d3.csvParse(res.split("\n").slice(4).join("\n"), d => {
          return {
            GeoFips: +d.GeoFips,
            GeoName: d.GeoName,
            LineCode: +d.LineCode,
            Description: d.Description,
            "2018": +d["2018"],
          };
        });
      })
      .then(res => {
        return res.filter(d => d.Description === "RPPs: All items");
      });
  };

  const transformData = async (data, dataRPP) => {
    const rpp = await cleanRPPData(dataRPP);
    const majorOcc = await cleanData(data);

    let revisedData = [];

    majorOcc.forEach(row => {
      const stateName = row.area_title;
      const realSalary = row.a_median;
      const stateRPP = rpp.filter(d => d.GeoName === stateName)[0]["2018"];

      row["RPP_a_median"] = (realSalary / stateRPP) * 100;
      revisedData.push(row);
    });
    return revisedData;
  };

  useEffect(() => {
    let mounted = true;
    transformData(dataRaw, dataRPP).then(res => {
      if (mounted) {
        setData(res);
      }
    });

    return () => {
      mounted = false;
    };
  }, [dataRaw]);

  useEffect(() => {
    setSelected(filteredSelection);
  }, [filteredSelection]);

  return (
    <section>
      <SelectContext.Provider value={{ selected, setSelected }}>
        <header>
          <Navbar handleDrawer={handleDrawer}>
            {data && (
              <>
                <ChartControl title="Chart Parameters">
                  <ChartControlRadio
                    ariaLabel="salary-type"
                    name="salary-type"
                    paramFields={chartParams.color.paramFields}
                    parameter={chartParams.color}
                    chartParams={chartParams}
                    setChartParams={setChartParams}
                  />
                  <ChartControlSelector />
                </ChartControl>
              </>
            )}
          </Navbar>
        </header>
        {/* <SideDrawer 
					mobileOpen={mobileOpen} 
					handleDrawer={handleDrawer}
					drawerWidth={drawerWidth}
					className={classes.sideDrawer}		
				>
					<FilterInterface 
						filterList={filterList}
						filters={filters}
						setFilters={setFilters}
						filterSettings={filterSettings}
						setFilterSettings={setFilterSettings}
						classes={{
							drawerSection: classes.drawerSection,
							sectionTitle: classes.sectionTitle,
						}}
					/>
					<Selections 
						setFilters={setFilters}
						classes={{
							drawerSection: classes.drawerSection,
							sectionTitle: classes.sectionTitle
						}}
					/>

				</SideDrawer> */}
        {data && <ChartBLS data={data} chartParams={chartParams} />}
        <AboutBLS />
      </SelectContext.Provider>
    </section>
  );
};

export { AppBLS };
