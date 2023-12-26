import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchAPI from "../../services/fetchAPI";
import styles from "./LoginCard.module.css";

import Button from "../../components/Button/Button";

import Cookies from "js-cookie";

import { useDispatch } from "react-redux";
import { setToken } from "../../state/auth/authSlice";
import { setUserProfile } from "../../state/user/userSlice";

const LoginCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const result = await fetchAPI.login(username, password);

      if (result.status === 200) {
        setError(null);
        const profileResult = await fetchAPI.getProfile(result.body.token);
        console.log(result);
        console.log(profileResult);

        if (rememberMe) {
          Cookies.set("jwtToken", result.body.token, {
            expires: 1,
            secure: true,
            sameSite: "Strict",
          });
        }

        dispatch(setToken(result.body.token));
        dispatch(setUserProfile(profileResult.body));
        navigate("/profile");
      } else {
        console.error("Error during sign-in:", result);
        setError(result.message);
      }
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
        <Button
          type="submit"
          label="Sign In"
          className={styles["sign-in-button"]}
        />
        {error && <p className={styles["error-message"]}>{error}</p>}
      </form>
    </section>
  );
};

export default LoginCard;
