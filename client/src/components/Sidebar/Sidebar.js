import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeSharpIcon from "@material-ui/icons/HomeSharp";
import SwapHorizSharpIcon from "@material-ui/icons/SwapHorizSharp";
import PaymentIcon from "@material-ui/icons/Payment";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  list: {
    fontWeight: 500,
    fontSize: ".95rem",
    color: "#000",
    opacity: ".8",
    padding: "15px 25px",
    marginBottom: "5px",
    width: "80%",
    cursor: "pointer",
    transitionProperty: "opacity,background-color",
    transitionDuration: ".2s",
    transitionTimingFunction: "ease",
    backgroundColor: "transparent",
    borderRadius: "8px",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return "active-item";
  } else {
    return "";
  }
};

function PermanentDrawerLeft(props) {
  const classes = useStyles();
  const navList = [
    {
      text: "Home",
      Icon: HomeSharpIcon,
      url: "/",
    },
    {
      text: "Plans",
      Icon: FavoriteIcon,
      url: "/plans",
    },
    {
      text: "Withdraw",
      Icon: PaymentIcon,
      url: "/transfers",
    },
    {
      text: "Transactions",
      Icon: SwapHorizSharpIcon,
      url: "/transactions",
    },
    {
      text: "Profile",
      Icon: AccountCircleIcon,
      url: "/profile",
    },
  ];

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <List>
          {navList.map(({ text, url, Icon }) => (
            <ListItem
              key={text}
              component={Link}
              to={url}
              className={`classes.list ${isActive(props.history, url)}`}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
export default withRouter(PermanentDrawerLeft);
