import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../components/AppContext";
import { makeStyles } from "@material-ui/core/styles";
import { Tab, Tabs, Container } from "@material-ui/core";
import Cardiovascular from "./Cardiovascular";
import Strength from "./Strength";
import data from "../data/data.json";

const useStyles = makeStyles((theme) => ({
  tabsContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px",
  },
  tab: {
    backgroundColor: "#fff",
  },
}));

const GymEquipment = () => {
  const { setCurrPage } = useContext(AppContext);
  const [currTab, setCurrTab] = useState(0); // 0 for cardio, 1 for strength

  const handleChange = (e, newTab) => {
    setCurrTab(newTab);
  };

  const classes = useStyles();

  // Update Navbar title
  useEffect(() => {
    setCurrPage("Gym Equipment");
  });

  return (
    <Container>
      <div className={classes.tabsContainer}>
        <Tabs
          value={currTab}
          onChange={handleChange}
          indicatorColor="secondary"
        >
          <Tab label="Cardio" className={classes.tab} />
          <Tab label="Strength" className={classes.tab} />
        </Tabs>
      </div>
      {currTab === 0 ? (
        <Cardiovascular products={data.products.cardio} />
      ) : (
        <Strength products={data.products.strength} />
      )}
    </Container>
  );
};

export default GymEquipment;
