import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useEasybase } from "easybase-react";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isUserSignedIn } = useEasybase();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isUserSignedIn()) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
