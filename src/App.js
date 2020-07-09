import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

// components
import { AppCPI } from "./appCPI/AppCPI";
import { AppBLS } from "./appBLS/AppBLS";
import { AppRPI } from "./appRPI/AppRPI";
import { Home } from "./pages/Home";

// styles
import { Container, ThemeProvider, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "./styles/theme";

const useStyles = makeStyles(theme => ({
    rootGrid: {
        paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		maxWidth: "none"
    },
}));

function App() {
	const classes = useStyles();

    return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Container className={classes.rootGrid}>
					<Router>
						<Route exact path="/" component={() => <AppBLS />}/>
						<Route path="/cpi-app" component={() => <AppCPI />}/>
						<Route path="/bls-app" component={() => <AppBLS />}/>
						<Route path="/rpi-app" component={() => <AppRPI />}/>
					</Router>
				</Container>
			</ThemeProvider>
		</>
    );
};

export default App;
