import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ className, text }) => {
  const buttonClassName = `${styles.button} ${className}`;
  return (
    <button className={buttonClassName} type="button">
      {text}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  text: PropTypes.string, // Nouvelle prop pour le contenu textuel du bouton
};

export default Button;
