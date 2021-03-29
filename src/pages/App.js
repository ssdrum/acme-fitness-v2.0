import React, { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { useEasybase } from "easybase-react";
import { AppContext } from "../components/AppContext";
import Welcome from "./Welcome";
import theme from "../components/theme";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import Home from "./Home";
import SearchFood from "./SearchFood";
import Statistics from "./Statistics";
import GymEquipment from "./GymEquipment";
import OurInstructors from "./OurInstructors";
import Settings from "./Settings";
import Food from "./Food";
import NotFound from "./NotFound";

const App = () => {
  const { showMenu } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const { isUserSignedIn } = useEasybase(); // isUserSignedIn function returns true if user is signed in, false otherwise
  const toggleDrawer = (state) => {
    setMenuOpen(!menuOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router basename={process.env.PUBLIC_URL}>
        {/* Render navbar if user is authenticated */}
        {showMenu ? (
          <>
            <Navbar toggleDrawer={toggleDrawer} />
            <Menu toggleDrawer={toggleDrawer} menuOpen={menuOpen} />
          </>
        ) : null}
        <Switch>
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/sign-up" component={SignUp} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/welcome" component={Welcome} />
          <ProtectedRoute exact path="/search-food" component={SearchFood} />
          <ProtectedRoute
            exact
            path="/search-food/result/:id"
            component={Food}
          />
          <ProtectedRoute exact path="/statistics" component={Statistics} />
          <ProtectedRoute
            exact
            path="/gym-equipment"
            component={GymEquipment}
          />
          <ProtectedRoute
            exact
            path="/our-instructors"
            component={OurInstructors}
          />
          <ProtectedRoute exact path="/settings" component={Settings} />
          <Route path="/" component={NotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
