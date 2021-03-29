import React, { useContext } from "react";
import { AppContext } from "./AppContext";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  list: {
    borderRadius: "5px",
    backgroundColor: "#fff",
    marginBottom: "20px",
  },
  listItem: {
    display: "flex",
  },
  title: {
    width: "45%",
    "&:first-letter": {
      textTransform: "capitalize",
    },
  },
  quantity: {
    width: "15%",
  },
  calories: {
    width: "35%",
  },
  remove: {
    width: "5%",
  },
  placeholderText: {
    textAlign: "center",
  },
});

const TodayFoodList = () => {
  const { listData, removeItem } = useContext(AppContext);
  const classes = useStyles();

  const items = listData.map((item, key) => {
    // Find Energy per 1g of the item and multiply by quantity
    let totCalories = 0;
    for (const n in item.data.foodNutrients) {
      if (item.data.foodNutrients[n].nutrientId === 1008) {
        totCalories = Math.round(
          (item.data.foodNutrients[n].value / 100) * item.quantity
        );
      }
    }

    return (
      <>
        <ListItem key={key} className={classes.listItem} e>
          <ListItemText className={classes.title}>
            {item.data.lowercaseDescription}
          </ListItemText>
          <ListItemText className={classes.quantity}>
            {item.quantity}g
          </ListItemText>
          <ListItemText className={classes.calories}>
            {totCalories}Kcal
          </ListItemText>
          <IconButton edge="end" onClick={() => removeItem(key)} size="small">
            <DeleteIcon color="secondary" j />
          </IconButton>
        </ListItem>

        {key < listData.length - 1 ? <Divider /> : null}
      </>
    );
  });

  return (
    <List className={classes.list}>
      {listData.length > 0 ? (
        items
      ) : (
        <ListItem>
          <ListItemText className={classes.placeholderText}>
            You didn't eat any food yet!
          </ListItemText>
        </ListItem>
      )}
    </List>
  );
};

export default TodayFoodList;
