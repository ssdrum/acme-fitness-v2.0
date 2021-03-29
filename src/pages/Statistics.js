import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../components/AppContext";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button } from "@material-ui/core";
import BMILine from "../components/BMILine";
import BMIModal from "../components/BMIModal";

import Pie from "../components/Pie";

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: "5px",
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  statContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "20px",
    marginBottom: "20px",
    textAlign: "center",
    padding: "10px",
  },
  BMIGreen: {
    color: "green",
  },
  BMIRed: {
    color: "red",
  },
  BMIBtn: {
    width: "100%",
    marginBottom: "20px",
  },
}));

const Statistics = () => {
  const { setCurrPage, userData, BMIData } = useContext(AppContext);
  const [BMIDialogState, setBMIDialogState] = useState(false);
  const currBMI = BMIData[0].data[BMIData[0].data.length - 1].y;

  const handleBMIDialog = () => {
    setBMIDialogState(!BMIDialogState);
  };

  const classes = useStyles();

  // Update Navbar title
  useEffect(() => {
    setCurrPage("Statistics");
  });

  return (
    <Container>
      <div className={classes.statsContainer}>
        <div className={classes.stat}>
          <Typography variant="h6" className={classes.header}>
            Current BMI
          </Typography>
          <div className={classes.statContent}>
            <Typography
              variant="h4"
              className={
                currBMI < 25 && currBMI >= 18.5
                  ? classes.BMIGreen
                  : classes.BMIRed
              }
            >
              {currBMI}
            </Typography>
          </div>
        </div>
        <div className={classes.stat}>
          <Typography variant="h6" className={classes.header}>
            Current Weight
          </Typography>
          <div className={classes.statContent}>
            <Typography variant="h4" className={classes.BMI}>
              {userData.weight}
            </Typography>
            <Typography variant="h6">Kg</Typography>
          </div>
        </div>
      </div>
      <Typography variant="h5" className={classes.header}>
        All Time Macro Intake
      </Typography>
      <Pie />
      <Typography variant="h5" className={classes.header}>
        BMI Progress
      </Typography>
      <BMILine />
      <Button
        variant="contained"
        className={classes.BMIBtn}
        color="primary"
        onClick={handleBMIDialog}
      >
        Take BMI
      </Button>
      <BMIModal isOpen={BMIDialogState} handleDialog={handleBMIDialog} />
    </Container>
  );
};

export default Statistics;
