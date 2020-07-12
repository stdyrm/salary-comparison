import React from "react";

// components
import { AppButton, Navbar } from "../Components/nav";

// styles
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  rootSection: {},
  header: {
    marginBottom: theme.spacing(4),
  },
  cardContainer: {
    justifyContent: "center",
  },
  card: {
    margin: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <section className={classes.rootSection}>
      <header className={classes.header}>
        <Typography variant="h3">Consumer Price Index</Typography>
      </header>
      <Grid container className={classes.cardContainer}>
        <AppButton className={classes.card} href="/cpi-app">
          <Typography variant="h5">CPI Chart</Typography>
          <Typography variant="subtitle2">
            State comparison of Consumer Price Index
          </Typography>
        </AppButton>
        <AppButton className={classes.card} href="/bls-app">
          <Typography variant="h5">BLS Chart</Typography>
          <Typography variant="subtitle2">State comparison of wages</Typography>
        </AppButton>
        <AppButton className={classes.card} href="/rpi-app">
          <Typography variant="h5">RPI Chart</Typography>
          <Typography variant="subtitle2">
            State comaprison of Real Personal Income
          </Typography>
        </AppButton>
      </Grid>
    </section>
  );
};

export { Home };
