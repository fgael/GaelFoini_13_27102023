import iconChat from "../../assets/img/icon-chat.png";
import iconMoney from "../../assets/img/icon-money.png";
import iconSecurity from "../../assets/img/icon-security.png";

import styles from "./Features.module.css";

const Features = () => {
  return (
    <section className={styles["features"]}>
      <h2 className="sr-only">Features</h2>
      <div className={styles["feature-item"]}>
        <img
          className={styles["feature-icon"]}
          src={iconChat}
          alt="Chat Icon"
        />
        <h3 className={styles["feature-item-title"]}>
          You are our #1 priority
        </h3>
        <p>
          Need to talk to a representative? You can get in touch through our
          24/7 chat or through a phone call in less than 5 minutes.
        </p>
      </div>
      <div className={styles["feature-item"]}>
        <img
          className={styles["feature-icon"]}
          src={iconMoney}
          alt="Money Icon"
        />
        <h3 className="feature-item-title">More savings means higher rates</h3>
        <p>The more you save with us, the higher your interest rate will be!</p>
      </div>
      <div className={styles["feature-item"]}>
        <img
          className={styles["feature-icon"]}
          src={iconSecurity}
          alt="Chat Icon"
        />
        <h3 className={styles["feature-item-title"]}>Security you can trust</h3>
        <p>
          We use top of the line encryption to make sure your data and money is
          always safe.
        </p>
      </div>
    </section>
  );
};

export default Features;
