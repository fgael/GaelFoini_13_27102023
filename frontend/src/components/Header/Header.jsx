import { Link, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import { useSelector, useDispatch } from "react-redux";
import { selectIsAuthenticated } from "../../state/auth/authSlice";
import {
  selectUserProfile,
  clearUserProfile,
} from "../../state/user/userSlice";
import { clearToken } from "../../state/auth/authSlice";

import Logo from "../../assets/img/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import styles from "./Header.module.css";

const Nav = () => {
  // Redux hooks for dispatching actions
  const dispatch = useDispatch();
  // React Router hook for navigation
  const navigate = useNavigate();

  // Selecting authentication state and user profile from Redux store
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userProfile = useSelector(selectUserProfile);

  // Function to handle user logout
  const handleLogout = () => {
    // Dispatching actions to clear authentication and user profile state
    dispatch(clearToken());
    dispatch(clearUserProfile());
    // Removing JWT token from cookies
    Cookies.remove("jwtToken");
    // Navigating to the home page after logout
    navigate("/");
    console.log("User logged out");
  };

  return (
    <nav className={styles["main-nav"]}>
      {/* Link to the home page with the Argent Bank logo */}
      <Link to="/" className={styles["main-nav-logo"]}>
        <img
          className={styles["main-nav-logo-image"]}
          src={Logo}
          alt="Argent Bank Logo"
        />
        {/* Accessible heading for screen readers */}
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {/* Conditional rendering based on authentication status */}
        {isAuthenticated ? (
          <>
            {/* Logged-in user actions */}
            <div className={styles["main-nav-log"]}>
              <Link to="/profile" className={styles["main-nav-item"]}>
                {/* User profile icon and name */}
                <i>
                  <FontAwesomeIcon icon={faUserCircle} />
                </i>
                {userProfile.firstName}
              </Link>
              {/* Logout action */}
              <div onClick={handleLogout} className={styles["main-nav-item"]}>
                <i>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </i>
                Sign out
              </div>
            </div>
          </>
        ) : (
          // Sign-in link for non-authenticated users
          <Link to="/login" className={styles["main-nav-item"]}>
            <i>
              <FontAwesomeIcon icon={faUserCircle} />
            </i>
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
