import PropTypes from "prop-types";

const Button = ({ onClick, label, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default Button;
