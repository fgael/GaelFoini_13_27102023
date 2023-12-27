import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import styles from "../Error404/Error404.module.css";

const Error404 = () => {
  return (
    <>
      <Header />
      <main className={styles["main-container"]}>
        <h1>Error 404</h1>
      </main>
      <Footer />
    </>
  );
};

export default Error404;
