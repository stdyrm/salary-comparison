import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

// styles
import {
  ButtonBase,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    position: "relative",
    minHeight: 275,
    minWidth: 275,
    borderRadius: 3,
    backgroundColor: theme.palette.primary.main,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000",
    opacity: 0,
    transition: "all .35s",
    "&:hover": {
      opacity: 0.2,
    },
  },
  content: {
    position: "absolute",
    top: "30%",
    left: "20%",
    right: "20%",
  },
}));

const AppButton = props => {
  const { className, href, classes } = props;
  const defaultClasses = useStyles();

  return (
    <ButtonBase
      focusRipple
      className={clsx(defaultClasses.button, className)}
      href={href}
    >
      <div className={clsx(defaultClasses.content, classes.content)}>
        {props.children}
      </div>
      <div className={clsx(defaultClasses.overlay, classes.overlay)} />
    </ButtonBase>
  );
};

export { AppButton };

AppButton.propTypes = {
  className: PropTypes.object,
  classes: PropTypes.object,
  href: PropTypes.string,
};

AppButton.defaultProps = {
  classes: {
    button: {},
    overlay: {},
    content: {},
  },
};
