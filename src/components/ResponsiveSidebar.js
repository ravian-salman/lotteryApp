import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import Lottery from "../screens/Lotery";
import { Router, Route, useHistory } from "react-router-dom";

import funcoupons from "../assets/funcoupons.png";
import mongain from "../assets/mongain.png";
import sideticket from "../assets/sideticket.png";

import history from "../history";

const drawerWidth = 240;
// const sidebarbg = "#21215e";
const sidebartext = "#7d5c7f";
const navcolorbg = "#26234a";
// const navsign = "#c04e88";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: navcolorbg,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    color: sidebartext,
    backgroundColor: navcolorbg,
  },
  drawerContainer: {
    overflow: "auto",
  },

  content: {
    flexGrow: 1,
    backgroundColor: "#060656",
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const changeRoute = (route) => {
    setCurrentRoute(`/${route}`);
    history.push(route);
  };
  const [currentRoute, setCurrentRoute] = React.useState(
    window !== undefined ? window.location.pathname : "/"
  );

  const drawer = (
    <div>
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {["Lottery", "Profile", "Token", "Road Map", "Exchange"].map(
            (text, index) => (
              <ListItem
                key={index}
                onClick={() => changeRoute(text)}
                button
                key={text}
                divider={true}
                selected={`/${text}` === currentRoute}
              >
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <ListItem key={item} alignItems="center"></ListItem>
          ))}
          <ListItem alignItems="center" button divider={true}>
            <img src={mongain} alt="mongain" />
          </ListItem>
          <ListItem alignItems="center" button divider={true}>
            <img
              src={sideticket}
              alt="sideticket"
              style={{ width: "40px", height: "auto" }}
            />
          </ListItem>
        </List>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const redirectTo = () => {
    history.push("/Lottery");
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <img onClick={redirectTo} src={funcoupons} alt="funcoupons" />
          <div>
            <button className="connect">Connect</button>
            <span className="connectLang">FR</span>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Toolbar />
        <Router history={history}>
          <Route path="/Lottery" component={Lottery} />
        </Router>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
