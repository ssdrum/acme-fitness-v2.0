import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    marginBottom: "15px",
    display: "flex",
    border: "1px solid #f6f6f6",
    height: "200px",
  },
  img: {
    width: "40%",
  },
  content: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  rating: {
    marginTop: "auto",
    marginBottom: "5px",
    marginLeft: "auto",
  },
  viewDetails: {
    marginTop: "auto",
    marginLeft: "auto",
  },
}));

const Product = ({ data }) => {
  const img = data.img;
  const title = data.title;
  const link = data.link;
  const rating = data.rating;

  const classes = useStyles();

  return (
    <Card className={classes.cardContainer}>
      <CardMedia
        image={`${process.env.PUBLIC_URL}${img}`}
        title="Treadmill"
        component="img"
        className={classes.img}
      />
      <CardContent className={classes.content}>
        <Typography variant="h6">{title}</Typography>
        <Rating
          name="read-only"
          value={rating}
          readOnly
          className={classes.rating}
        />
        <a
          rel="noreferrer"
          target="_blank"
          href={link}
          className={classes.viewDetails}
        >
          <Button variant="contained" color="primary">
            View Details
          </Button>
        </a>
      </CardContent>
    </Card>
  );
};

export default Product;
