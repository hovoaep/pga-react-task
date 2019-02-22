import React from "react";
import PropTypes from "prop-types";

export const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  onFocus,
  onBlur,
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={`form-control form-control-lg ${error && "is-invalid"}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.string,
};

TextFieldGroup.defaultProps = {
  type: "text",
};
