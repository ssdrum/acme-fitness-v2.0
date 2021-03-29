import React, { useContext } from "react";
import { AppContext } from "../components/AppContext";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles({
  appBar: {
    marginBottom: "15px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    "&:first-letter": {
      textTransform: "capitalize",
    },
  },
  white: {
    color: "#fff",
  },
});

const Navbar = ({ toggleDrawer }) => {
  const { currPage } = useContext(AppContext);
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {useLocation().pathname.slice(0, 20) === "/search-food/result/" ? (
          <Link to="/search-food">
            <IconButton edge="start">
              <ArrowBackIosIcon className={classes.white} />
            </IconButton>
          </Link>
        ) : null}
        <Typography variant="h6" edge="center" className={classes.title}>
          {currPage}
        </Typography>
        <IconButton edge="end" onClick={toggleDrawer} className={classes.white}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
