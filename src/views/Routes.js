/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Routes as Switch, Route } from "react-router-dom";
import SignUp from "./SignUp/Signup";
import LoginPage from "./SignUp/LoginPage";
import TableWrapper from "./List/TableWrapper";


const Paths = [
  {
    path: "/",
    component: SignUp,
    exact: true,
  },
  {
    path: "/signup",
    component: SignUp,
    exact: true,
  },
  {
    path: "/login",
    component: LoginPage,
    exact: true,
  },
  {
    path: "/listitems",
    component: TableWrapper,
    exact: true,
  },
];

function Routes() {
  return (
    <Switch>
      {Paths.map(({ path, component: Component, exact }) => {
        return (
          <Route
            exact={exact}
            path={path}
            element={<Component />}
            key={`${path}`}
          />
        );
      })}
    </Switch>
  );
}

Routes.propTypes = {};

export default Routes;
