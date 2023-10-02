/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Routes as Switch, Route } from "react-router-dom";
import SignUp from "./SignUp/Signup";
import LoginPage from "./SignUp/LoginPage";
import TableWrapper from "./List/TableWrapper";
import PaymentView from "./payment/payment";
import PaymentSuccess from "./payment/paymentSuccess";
import Error from "./payment/PaymentFailure";

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

  {
    path: "/payment",
    component: PaymentView,
    exact: true,
  },
  {
    path: "/paymentsuccess",
    component: PaymentSuccess,
    exact: true,
  },
  {
    path: "/paymentfailure",
    component: Error,
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
