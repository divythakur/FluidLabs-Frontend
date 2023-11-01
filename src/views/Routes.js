/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Routes as Switch, Route, useNavigate } from "react-router-dom";
import SignUp from "./SignUp/Signup";
import LoginPage from "./SignUp/LoginPage";
import TableWrapper from "./List/TableWrapper";
import PaymentView from "./payment/payment";
import PaymentSuccess from "./payment/paymentSuccess";
import Error from "./payment/PaymentFailure";
import ExpiresSession from "./ExpiresSession";
import PageNotFound from "./PageNotFound";
import DoctorDetailsForm from "./doctor/DoctorDetailsForm";
import Specialization from "./patient/diseaseCategory";
import Onboarding from "./SignUp/Onboarding";
import AppointmentRequest from "./doctor/AppointmentRequest";
import ListOfDoctors from "./patient/ListOfDoctors";
import MyAppointments from "./patient/MyAppoitments";
import { UserContext } from "../components/ContextComp";

const Paths = [
  {
    path: "/signup",
    component: SignUp,
    exact: true,
  },
  {
    path: "/login",
    component: SignUp,
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
  {
    path: "/expiredsession",
    component: ExpiresSession,
    exact: true,
  },
  {
    path: "/doctorform",
    component: DoctorDetailsForm,
    exact: true,
  },
  {
    path: "/specialization",
    component: Specialization,
    exact: true,
  },
  {
    path: "/onboarding",
    component: Onboarding,
    exact: true,
  },
  {
    path: "/appointmentrequests",
    component: AppointmentRequest,
  },
  {
    path: "/doctorslist",
    component: ListOfDoctors,
  },
  {
    path: "/myappointments",
    component: MyAppointments,
  },

  {
    path: "*",
    component: PageNotFound,
    exact: true,
  },
];

function Routes() {
  const path = window.location.pathname;
  const context = React.useContext(UserContext);

   console.log({path})
  if (!context.userObj && path === "/") {
    console.log("I AM CKKKD")
    window.location.href= "https://fluidlabfrontend-e1ae64993b8c.herokuapp.com/signup"
  }
  if (context.userObj && path === "/") {
    window.location.href= "https://fluidlabfrontend-e1ae64993b8c.herokuapp.com/onboarding"
  }

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
