import React, { useState, useEffect } from "react";
import * as d3 from "d3";

// reference
import stateStandardized from "../params/stateStandardized.json";

const readCSV = async csv => {
  const res = await d3.csv(csv);
  return res;
};

const cleanData = data => {
  const cols = Object.keys(data[0]);
  let revData = [];
  data.forEach((d, i) => {
    let row = {};
    cols.forEach(col => {
      row[col] = isFinite(parseFloat(d[col])) ? parseFloat(d[col]) : d[col];
    });
    revData.push(row);
  });
  return revData;
};

const standardizeStateName = state => {
  let newStateName;
  if (Object.keys(stateStandardized).includes(state)) {
    newStateName = stateStandardized[state].name;
  } else {
    throw new Error("Could not find state name");
  }
  return newStateName;
};

const joinData = () => {
  return null;
};

const pivotData = (data, col) => {
  let pivoted = {};
  data.forEach(d => {
    if (!pivoted[d[col]]) {
      pivoted[d[col]] = [d];
    } else {
      pivoted[d[col]].push(d);
    }
  });
  return pivoted;
};

export { readCSV, cleanData, joinData, standardizeStateName, pivotData };
