import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AppContext } from "../components/AppContext";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  description: {
    marginBottom: "10px",
  },
  eatBtn: {
    width: "100%",
    padding: "8px 0",
    marginBottom: "20px",
    color: "#fff",
  },
  tableContainer: {
    marginBottom: "30px",
    backgroundColor: "#fff",
    borderRadius: "5px",
  },
  tableHead: {
    fontWeight: 600,
  },
}));

const Food = () => {
  const { setCurrPage, addItem } = useContext(AppContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [quantity, setQuantity] = useState(null);
  const data = useLocation().state;
  let history = useHistory();
  const classes = useStyles();

  // Update Navbar title capitalizing the first letter
  useEffect(() => {
    setCurrPage(data.lowercaseDescription);
  });

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = () => {
    handleDialog(); // Close modal
    addItem({ data: data, quantity: Number(quantity) }); // Update list
    history.push("/"); // Redirect to Home
  };

  return (
    <Container>
      <Typography variant="h5" className={classes.description}>
        Values per 100g
      </Typography>
      <TableContainer className={classes.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>Name</TableCell>
              <TableCell className={classes.tableHead}>Amount</TableCell>
              <TableCell className={classes.tableHead}>Unit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.foodNutrients.map((nutrient, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{nutrient.nutrientName}</TableCell>
                  <TableCell>{nutrient.value}</TableCell>
                  <TableCell>{nutrient.unitName.toLowerCase()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        onClick={handleDialog}
        className={classes.eatBtn}
      >
        Eat
      </Button>

      <Dialog open={openDialog} onClose={handleDialog}>
        <DialogTitle>Enter Quantity</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              fullWidth
              required
              placeholder="g"
              type="number"
              onChange={handleChange}
              value={quantity}
            />
            <DialogActions>
              <Button onClick={handleDialog}>Cancel</Button>
              <Button type="submit" color="primary" onClick={handleSubmit}>
                Ok
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Food;
