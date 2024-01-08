import PropTypes from "prop-types";

const Button = ({ onClick, label, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

// PropTypes to define the expected types for each prop
Button.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default Button;
