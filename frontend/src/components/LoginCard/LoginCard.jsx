import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import fetchAPI from "../../services/fetchAPI";

import Button from "../../components/Button/Button";

import { useDispatch } from "react-redux";
import { setToken } from "../../state/auth/authSlice";
import { setUserProfile } from "../../state/user/userSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./LoginCard.module.css";

const LoginCard = () => {
  // State variables for managing form input and state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  // Redux hooks for dispatching actions
  const dispatch = useDispatch();
  // React Router hook for navigation
  const navigate = useNavigate();

  // Function to handle the sign-in process
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Making a login request to the API
      const result = await fetchAPI.login(username, password);

      if (result.status === 200) {
        setError(null);

        // Fetching user profile information using the obtained token
        const profileResult = await fetchAPI.getProfile(result.body.token);

        if (rememberMe) {
          // Setting a cookie for the JWT token if "Remember me" is checked
          Cookies.set("jwtToken", result.body.token, {
            expires: 1,
            secure: true,
            sameSite: "Strict",
          });
        }

        // Dispatching actions to update authentication and user profile state
        dispatch(setToken(result.body.token));
        dispatch(setUserProfile(profileResult.body));

        // Navigating to the user profile page
        navigate("/profile");
      } else {
        // Handling errors during sign-in
        console.error("Error during sign-in:", result);
        setError(result.message);
      }
    } catch (error) {
      // Handling unexpected errors during sign-in
      console.error("Error during sign-in:", error);
    }
  };

  // Rendering the login form
  return (
    <section className={styles["sign-in-content"]}>
      {/* User icon */}
      <i className={styles["sign-in-icon"]}>
        <FontAwesomeIcon icon={faUserCircle} />
      </i>
      {/* Title */}
      <h1>Sign In</h1>
      {/* Sign-in form */}
      <form onSubmit={handleSignIn}>
        <div className={styles["input-wrapper"]}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles["input-wrapper"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles["input-remember"]}>
          {/* Checkbox for "Remember me" */}
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        {/* Sign-in button */}
        <Button
          type="submit"
          label="Sign In"
          className={styles["sign-in-button"]}
        />
        {/* Displaying error message if any */}
        {error && <p className={styles["error-message"]}>{error}</p>}
      </form>
    </section>
  );
};

export default LoginCard;
