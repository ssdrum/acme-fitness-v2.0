import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Change to true for testing

  const [userData, setUserData] = useState({
    age: null,
    sex: null,
    weight: null,
    height: null,
    activity: null,
  });
  const [currPage, setCurrPage] = useState(null);
  const [caloricGoal, setCaloricGoal] = useState(null);
  const [BMIData, setBMIData] = useState([
    {
      id: "BMI",
      color: "hsl(327, 70%, 50%)",
      data: [],
    },
    // data: [{ x: "03/19/2021", y: 22 }] Insert this line for testing purposes
  ]);
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [listData, setListData] = useState([]);

  const calcCaloricGoal = () => {
    // Calc BMR (Basal Metabolic Rate)
    let BMR = 0;

    if (userData.sex === "male") {
      BMR =
        66.47 +
        13.75 * userData.weight +
        5.003 * userData.height -
        6.755 * userData.age;
    } else {
      BMR =
        655.1 +
        9.563 * userData.weight +
        1.85 * userData.height -
        4.676 * userData.age;
    }
    if (userData.activity === "none") {
      setCaloricGoal(BMR * 1.2);
    } else if (userData.activity === "light") {
      setCaloricGoal(BMR * 1.375);
    } else if (userData.activity === "moderate") {
      setCaloricGoal(BMR * 1.55);
    } else if (userData.activity === "very active") {
      setCaloricGoal(BMR * 1.725);
    } else {
      setCaloricGoal(BMR * 1.9);
    }
  };

  // Keeps track of the amount of calories consumed in total today. Is updated when an entry is added or removed from listData[]
  // The nutrientID that is associated with Energy (Kcal) in the USDA API is 1008
  useEffect(() => {
    let totCalories = 0;

    listData.forEach((item) => {
      for (const n in item.data.foodNutrients) {
        if (item.data.foodNutrients[n].nutrientId === 1008) {
          totCalories +=
            (item.data.foodNutrients[n].value / 100) * item.quantity;
        }
      }
    });
    setConsumedCalories(totCalories);
  }, [listData]);

  // Calculates the daily caloric intake and the BMI when the user data is updated.
  useEffect(() => {
    calcCaloricGoal();
  }, [userData]);

  // // Add items from listData
  const addItem = (item) => {
    setListData((prevListData) => {
      return [item, ...prevListData];
    });
  };

  // // Remove items from listData
  const removeItem = (key) => {
    setListData(
      listData.filter((item, i) => {
        return key !== i;
      })
    );
  };

  const calcBMI = (weight, height) => {
    let state = [...BMIData];
    let date = new Date();
    let BMI;

    // Extract Date as a string
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = date.getFullYear();
    date = mm + "/" + dd + "/" + yyyy;
    // Calculate BMI
    BMI = Math.round((weight / height / height) * 10000);

    state[0].data.push({
      x: date,
      y: BMI,
    });

    setBMIData(state);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        currPage: currPage,
        userData: userData,
        listData: listData,
        consumedCalories: consumedCalories,
        caloricGoal: caloricGoal,
        BMIData: BMIData,
        setIsAuthenticated: setIsAuthenticated,
        addItem: addItem,
        removeItem: removeItem,
        setUserData: setUserData,
        setCaloricGoal: setCaloricGoal,
        setListData: setListData,
        setConsumedCalories: setConsumedCalories,
        setCurrPage: setCurrPage,
        calcBMI: calcBMI,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
