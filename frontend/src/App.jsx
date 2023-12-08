import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "./state/auth/authSlice";
import { setUserProfile } from "./state/user/userSlice";
import fetchApi from "./services/fetchAPI";
import Cookies from "js-cookie";
import AppRouter from "./router/index";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = Cookies.get("jwtToken");

      if (authToken) {
        try {
          dispatch(setToken(authToken));
          const profileResult = await fetchApi.getProfile(authToken);
          dispatch(setUserProfile(profileResult.body));
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AppRouter />;
};

export default App;
