import React, { useEffect, useContext } from "react";
import { AppContext } from "../components/AppContext";
import { Container, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Instructor from "../components/Instructor";
import data from "../data/data.json";

const useStyles = makeStyles((theme) => ({
  listContainer: {
    backgroundColor: "#fff",
    borderRadius: "5px",
  },
}));

const OurInstructors = () => {
  const { setCurrPage } = useContext(AppContext);
  const classes = useStyles();
  const instructors = data.instructors;

  // Update Navbar title
  useEffect(() => {
    setCurrPage("Our Instructors");
  });

  const instructorsArray = instructors.map((instructor, i) => (
    <Instructor data={instructor} key={i} />
  ));

  return (
    <Container>
      <List className={classes.listContainer}>{instructorsArray}</List>
    </Container>
  );
};

export default OurInstructors;
