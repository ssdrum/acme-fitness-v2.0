import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "./AppContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@material-ui/core";

const ResetDialog = ({ isOpen, handleState }) => {
  const { setUserData, setIsAuthenticated, setListData } = useContext(
    AppContext
  );
  const history = useHistory();

  const handleReset = () => {
    setUserData({
      age: null,
      sex: null,
      weight: null,
      height: null,
      activity: null,
    });
    setListData([]);
    setIsAuthenticated(false);
    history.push("/welcome");
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleState}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle>Warning</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This will erease all your customization and data, returning everything
          to default
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleState}>Cancel</Button>
          <Button color="secondary" onClick={handleReset}>
            Ok
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ResetDialog;
