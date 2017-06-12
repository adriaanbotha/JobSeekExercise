import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({name, label, value, placeholder, onChange, error}) => (
  <div className="form-group">
    <label className="form-label" htmlFor={name}>{label}</label>
    <div className="field">
      <input
        className={`form-control ${error ? 'has-error' : ''}`}
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className="inline-field-error">{error}</div>}
    </div>
  </div>
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TextInput;
