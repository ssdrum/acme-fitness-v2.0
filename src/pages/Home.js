import React, { useEffect, useContext } from "react";
import { AppContext } from "../components/AppContext";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button } from "@material-ui/core";

import Pie from "../components/Pie";
import TodayFoodList from "../components/TodayFoodList";

const useStyles = makeStyles((theme) => ({
  caloricGoalContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "10px 5px",
  },
  header: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  caloricGoal: {
    fontSize: "16px",
  },
  eatSomething: {
    width: "100%",
    padding: "8px 0",
    marginBottom: "20px",
    color: "#fff",
  },
  calorieGreen: {
    color: "green",
  },
  calorieRed: {
    color: "red",
  },
}));

const Home = () => {
  const { caloricGoal, setCurrPage, consumedCalories } = useContext(AppContext);
  const classes = useStyles();

  // Update Navbar title
  useEffect(() => {
    setCurrPage("Home");
  });

  return (
    <Container>
      <Typography variant="h3" className={classes.header}>
        Today
      </Typography>
      <div className={classes.caloricGoalContainer}>
        <Typography variant="h6" className={classes.caloricGoal}>
          Caloric Goal:
        </Typography>
        <Typography
          variant="h4"
          className={
            consumedCalories <= caloricGoal
              ? classes.calorieGreen
              : classes.calorieRed
          }
        >
          {Math.round(consumedCalories)}/{Math.round(caloricGoal)}
        </Typography>
      </div>
      <Pie />
      <Link to="/search-food" className={classes.link}>
        <Button
          variant="contained"
          className={classes.eatSomething}
          color="primary"
        >
          Eat Something
        </Button>
      </Link>
      <Typography variant="h6">Today's Food</Typography>
      <TodayFoodList />
    </Container>
  );
};

export default Home;
