import React from "react";

// styles
import { Grid, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "0 auto",
    padding: theme.spacing(4),
    maxWidth: "1200px",
    flexFlow: "column wrap",
    "& p": {
      textAlign: "justify",
      fontSize: "1.2rem",
      marginBottom: "1rem",
      lineHeight: "2rem",
    },
    "& p:last-child": {
      marginBottom: 0,
    },
    "& h2,h3": {
      fontWeight: 700,
      fontSize: "1.6rem",
      marginTop: "1rem",
      marginBottom: "1rem",
    },
    "& li": {
      textIndent: "2rem",
      textAlign: "justify",
      fontSize: "1.2rem",
      lineHeight: "1.5rem",
    },
  },
  title: {},
  divider: {
    backgroundColor: theme.palette.text.primary,
  },
}));

const About = props => {
  const classes = useStyles(props);

  return (
    <Grid className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        About this chart
      </Typography>
      <Divider className={classes.divider} />
      {props.children}
    </Grid>
  );
};

export { About };
