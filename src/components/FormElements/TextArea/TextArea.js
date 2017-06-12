import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ name, label, onChange, value, rows, resize, placeholder, error }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    <div className="field">
      <textarea
        className="form-input"
        name={name}
        rows={rows}
        style={{ width: '100%', border: '1px solid gray' }}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <div className="inline-field-error">{error}</div>}
    </div>
  </div>
);

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  resize: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default TextArea;
