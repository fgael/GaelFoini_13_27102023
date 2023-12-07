import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchApi from "../../services/fetchAPI";
import styles from "./AuthCard.module.css";

import { useDispatch } from "react-redux";
import { setToken } from "../../state/auth/authSlice";
import { setUserProfile } from "../../state/user/userSlice";

const AuthCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const result = await fetchApi.login(username, password);
      const profileResult = await fetchApi.getProfile(result.body.token);
      console.log(result);
      console.log(profileResult);
      dispatch(setToken(result.body.token));
      dispatch(setUserProfile(profileResult.body));
      navigate("/user");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <section className={styles["sign-in-content"]}>
      <i className={styles["sign-in-icon"]}>
        <FontAwesomeIcon icon={faUserCircle} />
      </i>
      <h1>Sign In</h1>
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
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className={styles["sign-in-button"]}>
          Sign In
        </button>
      </form>
    </section>
  );
};

export default AuthCard;
