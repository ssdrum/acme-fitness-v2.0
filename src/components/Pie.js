import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContext";
import { makeStyles } from "@material-ui/core/styles";
import { ResponsivePie } from "@nivo/pie";

const useStyles = makeStyles({
  pieContainer: {
    height: "300px",
    width: "350px",
    margin: "auto",
    marginBottom: "30px",
  },
});

const pieColors = ["#E7F69D", "#64C2A6", "#FEAE65", "#F66D43"];

const placeholderData = [
  {
    id: "legend",
    label: "Legend",
    value: 1,
  },
];

const placeholderColor = ["#E7F69D"];

const Pie = () => {
  const { listData } = useContext(AppContext);
  const [pieData, setPieData] = useState([
    // Temporarely handling pie data with state, but I will move the data to a JSON file later
    { id: "protein", label: "Protein", value: 0 },
    { id: "fat", label: "Fat", value: 0 },
    { id: "carbohydrate", label: "Carbohydrate", value: 0 },
  ]);
  const classes = useStyles();

  // Update Pie data
  useEffect(() => {
    let newState = [...pieData]; // Copy state
    newState[0].value = 0; // Reset values
    newState[1].value = 0;
    newState[2].value = 0;

    listData.forEach((item) => {
      // Sum values in copied state
      for (const n in item.data.foodNutrients) {
        if (item.data.foodNutrients[n].nutrientId === 1003) {
          newState[0].value += Math.round(
            item.quantity * (item.data.foodNutrients[n].value / 100)
          );
        } else if (item.data.foodNutrients[n].nutrientId === 1004) {
          let newState = [...pieData];
          newState[1].value += Math.round(
            item.quantity * (item.data.foodNutrients[n].value / 100)
          );
        } else if (item.data.foodNutrients[n].nutrientId === 1005) {
          let newState = [...pieData];
          newState[2].value += Math.round(
            item.quantity * (item.data.foodNutrients[n].value / 100)
          );
        }
      }
      setPieData(newState); // Set state to updated copy
    });
  }, [listData]);

  return (
    <div className={classes.pieContainer}>
      <ResponsivePie
        data={listData.length > 0 ? pieData : placeholderData}
        margin={{ top: 20, right: 20, bottom: 70, left: 20 }}
        padAngle={0.7}
        cornerRadius={3}
        colors={listData.length > 0 ? pieColors : placeholderColor}
        enableRadialLabels={false}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        isInteractive={true}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemWidth: 80,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default Pie;
