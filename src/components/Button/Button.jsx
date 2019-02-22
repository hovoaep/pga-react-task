import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ text, type, onClick, disabled, buttonType }) => (
  <button
    disabled={disabled}
    type={buttonType}
    onClick={onClick}
    className={`btn ${type} `}
  >
    {text}
  </button>
);

Button.defaultProps = {
  type: "fill",
  buttonType: "button",
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  buttonType: PropTypes.string,
  disabled: PropTypes.bool,
};
export { Button };
