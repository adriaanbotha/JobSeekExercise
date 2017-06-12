import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';

const Select = ({ name, label, value, options, multi, allowCreate, onChange }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    <div className="field">
      <ReactSelect className="select-label"
              name={name}
              value={value}
              options={options}
              multi={multi}
              allowCreate={allowCreate}
              onChange={onChange}/>
    </div>
  </div>
);

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  multi: PropTypes.bool.isRequired,
  allowCreate: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
