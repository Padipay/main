import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

function ProtectedRoutes({ children: Component }) {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  return token ? Component : <Navigate to="/login" />;
}

ProtectedRoutes.defaultProps = {
  children: {},
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoutes;
