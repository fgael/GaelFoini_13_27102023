import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import Error404 from "../pages/Error404/Error404";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../state/auth/authSlice";
import PropTypes from "prop-types";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return element;
};

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

const AppRouter = () => {
  return (
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
