import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

const InfoDialog = ({ isOpen, handleState }) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Information has been updated</DialogTitle>
      <DialogContent>
        <DialogActions>
          <Button onClick={handleState}>Ok</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
