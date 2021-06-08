import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import AssiangementIcon from "@material-ui/icons/Assignment";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Star from "@material-ui/icons/Star";
import { LocationCity } from "@material-ui/icons";

const drawerWidth = 240;

const sidebar = [
  {
    item: "General",
    subitems: [{ link: "/evoucher", item: "Evoucher" }],
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#313030",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  logo: {
    width: "auto",
    height: 20,
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
}));

export default function Nav() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [list, setList] = useState(sidebar[0].item);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (list) => {
    setList(list);
    setListOpen(!listOpen);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <img
            src="/images/voucher.png"
            className={classes.logo}
            alt="EVoucher"
          />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {sidebar.map((text, index) =>
            text.subitems?.length > 0 ? (
              <>
                <ListItem
                  button
                  key={index}
                  onClick={() => handleClick(text.item)}
                >
                  <ListItemIcon>
                    <AssiangementIcon />
                  </ListItemIcon>
                  <ListItemText primary={text.item} />
                  {listOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Divider />
                <Collapse
                  in={listOpen && list === text.item ? true : false}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {text.subitems.map((sub, i) => (
                      <Link to={sub.link} className={classes.link}>
                        <ListItem button key={i}>
                          <ListItemIcon>
                            <LocationCity />
                          </ListItemIcon>
                          <ListItemText primary={sub.item} />
                        </ListItem>
                        <Divider />
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <Link to={`/${text.item}`}>
                <ListItem button key={index}>
                  <ListItemIcon>
                    <AssiangementIcon />
                  </ListItemIcon>
                  <ListItemText primary={text.item} />
                </ListItem>
                <Divider />
              </Link>
            )
          )}
        </List>
      </Drawer>
    </div>
  );
}
