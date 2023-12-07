import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import { useSelector } from "react-redux";
import { selectToken } from "../../state/auth/authSlice";
import { selectUserProfile } from "../../state/user/userSlice";

const Index = () => {
  const token = useSelector(selectToken);
  const userProfile = useSelector(selectUserProfile);
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {userProfile.firstName} {userProfile.lastName}!
          </h1>
          <p>Email: {userProfile.email}</p>
          <p>Token: {token}</p>
          <button className="edit-button">Edit Name</button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Index;
