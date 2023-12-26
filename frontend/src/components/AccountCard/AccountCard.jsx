import PropTypes from "prop-types";
import styles from "../AccountCard/AccountCard.module.css";
import Button from "../Button/Button";

const AccountCard = ({ title, amount, description }) => {
  return (
    <section className={styles["account"]}>
      <div className={styles["account-content-wrapper"]}>
        <h3 className={styles["account-title"]}>{title}</h3>
        <p className={styles["account-amount"]}>{amount}</p>
        <p className={styles["account-amount-description"]}>{description}</p>
      </div>
      <Button
        className={styles["transaction-button"]}
        label="View transactions"
      />
    </section>
  );
};

AccountCard.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default AccountCard;
