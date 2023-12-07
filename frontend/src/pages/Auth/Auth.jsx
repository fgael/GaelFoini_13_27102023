import Header from "../../components/Header/Header";
import AuthCard from "../../components/AuthCard/AuthCard";
import Footer from "../../components/Footer/Footer";

const Index = () => {
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <AuthCard />
      </main>
      <Footer />
    </>
  );
};

export default Index;
