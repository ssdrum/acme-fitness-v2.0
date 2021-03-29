import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import SettingsIcon from "@material-ui/icons/Settings";

// Material UI Styles
const useStyles = makeStyles((theme) => ({
  logoContainer: {
    marginTop: "20px",
    marginBottom: "50px",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

const Menu = ({ toggleDrawer, menuOpen }) => {
  const classes = useStyles();

  return (
    <Drawer
      style={{ width: "240px" }}
      variant="temporary"
      anchor="right"
      open={menuOpen}
      ModalProps={{ onBackdropClick: toggleDrawer }}
    >
      <div className={classes.logoContainer}>
        <a target="_blank" rel="noreferrer" href="https://www.acmefitness.com/">
          <img
            src={`${process.env.PUBLIC_URL}/img/logo.png`}
            alt="ACME Fitness"
          />
        </a>
      </div>
      <List>
        <Link to="/" className={classes.link}>
          <ListItem button onClick={toggleDrawer}>
            <ListItemIcon className={classes.menuIcon}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
        </Link>
        <Link to="/search-food" className={classes.link}>
          <ListItem button onClick={toggleDrawer}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText>Search Food</ListItemText>
          </ListItem>
        </Link>
        <Link to="/statistics" className={classes.link}>
          <ListItem button onClick={toggleDrawer}>
            <ListItemIcon>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText>Statistics</ListItemText>
          </ListItem>
        </Link>
        <Link to="/gym-equipment" className={classes.link}>
          <ListItem button onClick={toggleDrawer}>
            <ListItemIcon>
              <FitnessCenterIcon />
            </ListItemIcon>
            <ListItemText>Gym Equipment</ListItemText>
          </ListItem>
        </Link>
        <Link to="/our-instructors" className={classes.link}>
          <ListItem button onClick={toggleDrawer}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText>Our Instructors</ListItemText>
          </ListItem>
        </Link>
        <Link to="/settings" className={classes.link}>
          <ListItem button onClick={toggleDrawer}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default Menu;
