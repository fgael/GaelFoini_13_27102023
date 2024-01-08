import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../state/auth/authSlice";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import Error404 from "../pages/Error404/Error404";

// PrivateRoute component to protect routes based on authentication status
const PrivateRoute = ({ element }) => {
  // Checking if the user is authenticated
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Redirecting to the home page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Rendering the protected route if authenticated
  return element;
};

// PropTypes for PrivateRoute component
PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

const AppRouter = () => {
  return (
    // BrowserRouter for handling navigation
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} />}
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
