import React, {useState, useRef} from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// styles
import { Toolbar, Button, IconButton, Hidden, Menu, MenuList, MenuItem, Popper, ClickAwayListener, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuOutlined from "@material-ui/icons/MenuOutlined";

const useStyles = makeStyles((theme) => ({
	toolbar: {
		position: "fixed",
		width: "100%",
		right: 0,
		left: "auto",
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		display: "flex",
		justifyContent: "space-between",
		backgroundColor: theme.palette.background.light,
		boxShadow: `4px 4px 12px 0 ${theme.palette.background.dark}`,
		zIndex: 1100
	},	
	navLinkContainer: {
		width: 400,
		// marginLeft: "auto",
		display: "flex",
		justifyContent: "space-between",
	},
	navLinkMenu: {
		display: "block"
	},
	navLinkIcon: {
		marginLeft: "auto",
		fontSize: "2rem",
	},
}))

const Navbar = (props) => {
	const { handleDrawer } = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);
	const classes = useStyles();

	const handleNavMenu = (e) => {
		// !anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
		setOpen(!open);
	}
	
	return (
		<header>
			<Toolbar className={classes.toolbar} disableGutters>
				{props.children}
				{/* <IconButton 
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawer}
				>
					<MenuOutlined />	
				</IconButton> */}
				<Hidden smDown>
					<nav className={classes.navLinkContainer}>
						<Button href="/rpi-app" className={classes.navButtons}>Real Income</Button>
						<Button href="/bls-app" className={classes.navButtons}>Salary Comparison</Button>
						<Button href="/" className={classes.navButtons}>Home</Button>
					</nav>
				</Hidden>
				<Hidden mdUp>
					<IconButton
						aria-label="main menu"
						edge="end"
						onClick={handleNavMenu}
						ref={anchorRef}
						className={classes.navLinkIcon}
					>
						<MenuOutlined />
					</IconButton>
				</Hidden>
				<Popper
					anchorEl={anchorRef.current}
					transition
					disablePortal
					open={open}
				>
					<Paper>
						<ClickAwayListener onClickAway={handleNavMenu}>
							<MenuList className={classes.navLinkMenu}>
								<MenuItem component={Link} to="/rpi-app">Real Income</MenuItem>
								<MenuItem component={Link} to="/bls-app">Salary Comparison</MenuItem>
								<MenuItem component={Link} to="/">Home</MenuItem>
							</MenuList>
						</ClickAwayListener>
					</Paper>
				</Popper>
			</Toolbar>
			<Toolbar />
		</header>
	)
};

export { Navbar };

Navbar.propTypes = {
	handleDrawer: PropTypes.func
};