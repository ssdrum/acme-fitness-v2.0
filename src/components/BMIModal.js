import React, { useState, useContext } from "react";
import { AppContext } from "./AppContext";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: "300px",
    margin: "auto",
  },
  textField: {
    marginBottom: "20px",
  },
}));

const BMIDialog = ({ isOpen, handleDialog }) => {
  const { userData, setUserData, calcBMI } = useContext(AppContext);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const classes = useStyles();

  const handleWeight = (e) => {
    setWeight(Number(e.target.value));
  };

  const handleHeight = (e) => {
    setHeight(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update height and weight values in Context
    let state = { ...userData };
    state.height = height;
    state.weight = weight;
    setUserData(state);
    // Add BMI value
    calcBMI(weight, height);
    // Clear inputs
    setWeight("");
    setHeight("");
    handleDialog();
  };

  return (
    <Dialog open={isOpen} className={classes.dialog}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            fullWidth
            required
            placeholder="Weight (Kg)"
            type="number"
            className={classes.textField}
            onChange={handleWeight}
            value={weight}
          />
          <TextField
            fullWidth
            required
            placeholder="Height (Cm)"
            type="number"
            onChange={handleHeight}
            value={height}
          />
          <DialogActions>
            <Button onClick={handleDialog}>Cancel</Button>
            <Button type="submit" color="primary">
              OK
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BMIDialog;
