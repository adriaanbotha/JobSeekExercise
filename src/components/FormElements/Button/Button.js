import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ name, label, value, onClick }) => (
  <div className="form-button-primary">
    {/*<label className="form-label" htmlFor={name}>{label}</label>*/}
      <input
        className={`input-button`}
        type="button"
        name={name}
        value={value}
        onClick={onClick}
      />
  </div>
);

Button.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
