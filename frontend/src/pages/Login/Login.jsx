import Header from "../../components/Header/Header";
import LoginCard from "../../components/LoginCard/LoginCard";
import Footer from "../../components/Footer/Footer";

const Login = () => {
  return (
    <>
      <Header />
      {/* global-css-style */}
      <main className="main bg-dark">
        <LoginCard />
      </main>
      <Footer />
    </>
  );
};

export default Login;
