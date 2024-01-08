import PropTypes from "prop-types";

import Button from "../Button/Button";

import styles from "../AccountCard/AccountCard.module.css";

const AccountCard = ({ title, amount, description }) => {
  return (
    // Section containing account information and transaction button
    <section className={styles["account"]}>
      <div className={styles["account-content-wrapper"]}>
        <h3 className={styles["account-title"]}>{title}</h3>
        <p className={styles["account-amount"]}>{amount}</p>
        <p className={styles["account-amount-description"]}>{description}</p>
      </div>
      {/* Button to view transactions related to the account */}
      <Button
        className={styles["transaction-button"]}
        label="View transactions"
      />
    </section>
  );
};

// PropTypes to define the expected types for each prop
AccountCard.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default AccountCard;
