import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

//redux
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuthenticated } from "../../state/auth/authSlice";
import {
  selectUserProfile,
  clearUserProfile,
} from "../../state/user/userSlice";
import { clearToken } from "../../state/auth/authSlice";

import Cookies from "js-cookie";

import styles from "./Header.module.css";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userProfile = useSelector(selectUserProfile);

  const handleLogout = () => {
    dispatch(clearToken());
    dispatch(clearUserProfile());
    Cookies.remove("jwtToken");
    navigate("/");
    console.log("User logged out");
  };

  return (
    <nav className={styles["main-nav"]}>
      <Link to="/" className={styles["main-nav-logo"]}>
        <img
          className={styles["main-nav-logo-image"]}
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <>
            <div className={styles["main-nav-log"]}>
              <Link to="/profile" className={styles["main-nav-item"]}>
                <i>
                  <FontAwesomeIcon icon={faUserCircle} />
                </i>
                {userProfile.firstName}
              </Link>
              <div onClick={handleLogout} className={styles["main-nav-item"]}>
                <i>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </i>
                Sign out
              </div>
            </div>
          </>
        ) : (
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
