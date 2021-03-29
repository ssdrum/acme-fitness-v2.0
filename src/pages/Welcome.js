import React, { useState, useContext } from "react";
import { AppContext } from "../components/AppContext";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import Home from "./Home";

const useStyles = makeStyles((theme) => ({
  logoContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingTop: "20px",
  },
  logo: {
    width: "200px",
  },
  heading: {
    marginTop: "30px",
    textAlign: "center",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "80%",
    margin: "auto",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
  },
  formItem: {
    marginBottom: "10px",
  },
  submitBtn: {
    marginTop: "50px",
    color: "#fff",
  },
}));

const Welcome = () => {
  const {
    setUserData,
    isAuthenticated,
    setIsAuthenticated,
    calcBMI,
  } = useContext(AppContext);
  const [values, setValues] = useState({
    age: "",
    sex: "",
    weight: "",
    height: "",
    activity: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  // Handles form state
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Handles submit
  const handleSubmit = (e) => {
    e.preventDefault();
    handleDialog();
  };

  const handleLogin = (e) => {
    setIsAuthenticated(true);
    setUserData({
      age: Number(values.age),
      sex: values.sex,
      weight: Number(values.weight),
      height: Number(values.height),
      activity: values.activity,
    });
    calcBMI(Number(values.weight), Number(values.height));
    history.push("/");
  };

  // Handles dialog state
  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  if (isAuthenticated) {
    return <Home />;
  } else {
    return (
      <Container className={classes.container}>
        <div className={classes.logoContainer}>
          <img
            src={`${process.env.PUBLIC_URL}/img/logo.png`}
            alt="ACME Fitness"
            className={classes.logo}
          />
        </div>
        <Typography variant="h4" className={classes.heading}>
          Welcome
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            type="number"
            name="age"
            label="Age"
            required
            className={classes.formItem}
            onChange={handleChange}
            value={values.age}
          ></TextField>
          <TextField
            select
            name="sex"
            label="Sex"
            required
            className={classes.formItem}
            onChange={handleChange}
            value={values.sex}
          >
            <MenuItem key={"male"} value={"Male"}>
              Male
            </MenuItem>
            <MenuItem key={"female"} value={"Female"}>
              Female
            </MenuItem>
          </TextField>
          <TextField
            type="number"
            name="weight"
            label="Weight"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Kg</InputAdornment>
              ),
            }}
            className={classes.formItem}
            required
            onChange={handleChange}
            value={values.weight}
          ></TextField>
          <TextField
            type="number"
            name="height"
            label="Height"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Cm</InputAdornment>
              ),
            }}
            className={classes.formItem}
            required
            onChange={handleChange}
            value={values.height}
          ></TextField>
          <TextField
            select
            label="Activity"
            name="activity"
            required
            className={classes.formItem}
            onChange={handleChange}
            value={values.activity}
          >
            <MenuItem key={"none"} value={"none"}>
              Little/no exercise
            </MenuItem>
            <MenuItem key={"light"} value={"light"}>
              Light exercise
            </MenuItem>
            <MenuItem key={"moderate"} value={"moderate"}>
              Moderate exercise (3-5 days/wk)
            </MenuItem>
            <MenuItem key={"very active"} value={"very active"}>
              Very active (6-7 days/wk)
            </MenuItem>
            <MenuItem key={"extra active"} value={"extra active"}>
              Extra active (very active & physical job)
            </MenuItem>
          </TextField>
          <Button
            type="submit"
            className={classes.submitBtn}
            variant="contained"
            color="primary"
          >
            Next
          </Button>
        </form>

        {/* Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleDialog}
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle>You're all set!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              We will personalize your experience based on your information
            </DialogContentText>
            <DialogActions>
              <Button onClick={handleLogin} color="primary">
                Ok
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Container>
    );
  }
};

export default Welcome;
