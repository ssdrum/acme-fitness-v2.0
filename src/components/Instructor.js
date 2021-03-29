import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@material-ui/core";

const Instructor = ({ data }) => {
  const name = data.name;
  const description = data.description;
  const img = data.img;

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt="Instructor" src={`${process.env.PUBLIC_URL}${img}`} />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={description} />
      </ListItem>
      <Divider />
    </>
  );
};

export default Instructor;
