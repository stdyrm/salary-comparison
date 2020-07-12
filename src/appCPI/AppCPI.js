import React, { useState, useEffect } from "react";
import { useData, useFilters } from "../hooks";

// params
import { params } from "../params/params";

// components
import { Navbar, SideDrawer } from "../Components/nav";
import {
  ParameterInterface,
  FilterInterface,
  Selections,
} from "../Components/selectors";
import { ChartCPI } from "./ChartCPI";
import { AboutCPI } from "./AboutCPI";

// context
import { SelectContext } from "../context/SelectContext";

// data
import { data as dataCPI } from "../data/dataCPI.json";

// utils
import { standardizeStateName } from "../utils/dataUtils";

// styles
import { Grid, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  rootDiv: {},
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

const AppCPI = () => {
  const dataRaw = useData(dataCPI);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState([]);
  const [filters, setFilters] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filterSettings, setFilterSettings] = useState({
    operator: "AND",
    n: 12,
  });
  const [chartParams, setChartParams] = useState(params.appCPI.chart);
  const { filterList } = params.appCPI;
  const filteredSelection = useFilters(filters);

  const classes = useStyles();

  const handleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    setSelected(filteredSelection);
  }, [filteredSelection]);

  useEffect(() => {
    let revDataRaw = dataRaw;
    revDataRaw.forEach(d => {
      let standardName = standardizeStateName(d.State);
      d.State = standardName;
    });
    setData(revDataRaw);
  }, [dataRaw]);

  return (
    <div>
      <SelectContext.Provider value={{ selected, setSelected }}>
        <header>
          <Navbar position="static" handleDrawer={handleDrawer} />
        </header>
        <SideDrawer
          mobileOpen={mobileOpen}
          handleDrawer={handleDrawer}
          drawerWdith={drawerWidth}
          className={classes.sideDrawer}
        >
          <ParameterInterface
            axis="y"
            chartParams={chartParams}
            setChartParams={setChartParams}
            classes={{
              drawerSection: classes.drawerSection,
            }}
          />
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
              sectionTitle: classes.sectionTitle,
            }}
          />
        </SideDrawer>
        <Toolbar />
        <Grid container className={classes.rootDiv}>
          {data && <ChartCPI data={data} chartParams={chartParams} />}
        </Grid>
        <AboutCPI />
      </SelectContext.Provider>
    </div>
  );
};

export { AppCPI };
