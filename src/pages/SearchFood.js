import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../components/AppContext";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  resultsContainer: {
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#fff",
  },
  form: {
    marginBottom: "30px",
  },
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

const SearchFood = () => {
  const { setCurrPage } = useContext(AppContext);
  const [input, setInput] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [results, setResults] = useState([]);

  const classes = useStyles();

  // Update Navbar title
  useEffect(() => {
    setCurrPage("Search Food");
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsFetching(true);
      const formattedQuery = input.replaceAll(" ", "%20");
      const response = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=kpgGjnKQtqTdZY5sRaJjPbAbfTCaHymb8l327r9d&query=${formattedQuery}`
      );
      const json = await response.json();
      setResults(json.foods);
    } catch (e) {
      console.log(e);
    }
    setIsFetching(false);
  };

  return (
    <Container>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          fullWidth
          placeholder={"Type food here"}
          onChange={handleChange}
          value={input}
          autoFocus
        />
      </form>

      {isFetching ? (
        <div className={classes.spinnerContainer}>
          <CircularProgress />
        </div>
      ) : null}

      {results.length > 0 ? (
        <List className={classes.resultsContainer}>
          {results.map((item, i) => {
            return (
              <Link
                to={{
                  pathname: `/search-food/result/${item.fdcId}`,
                  state: item,
                }}
                key={item.fdcId}
              >
                <ListItem button>
                  <ListItemText>{item.lowercaseDescription}</ListItemText>
                  <ArrowForwardIosIcon
                    style={{ fontSize: "small", color: "#333" }}
                    edge="end"
                  />
                </ListItem>
              </Link>
            );
          })}
        </List>
      ) : null}
    </Container>
  );
};

export default SearchFood;
