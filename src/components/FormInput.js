import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const FormInput = props => {
  const {
    children,
    className,
    disabled,
    id,
    inputClass,
    label,
    maxlength,
    minLength,
    onChange,
    onKeyPress,
    placeholder,
    required,
    touched,
    type,
    value,
    error
  } = props;

  if (type === 'select') {
    return (
      <div className={classnames('form-group', className)}>
        {label && (
          <label className="form-label" htmlFor={id}>
            {label}
            {required && '*'}
          </label>
        )}
        <select
          type="text"
          className="form-control"
          id={id}
          name={id}
          value={value}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
        >
          <option value="" disabled defaultValue hidden>
            {placeholder}
          </option>
          {children}
        </select>
      </div>
    );
  }
  return (
    <div className={classnames('form-group', className)}>
      {label && (
        <label className="form-label" htmlFor={id}>
          {label}
          {required && '*'}
        </label>
      )}

      <input
        type={type || 'text'}
        className={classnames('form-control', inputClass, {
          'is-invalid': error
        })}
        id={id}
        name={id}
        value={value}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={onKeyPress}
        minLength={minLength}
        maxLength={maxlength}
      />

      {touched && error && <div className="error-text">{error}</div>}
    </div>
  );
};

FormInput.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  id: PropTypes.string,
  inputClass: PropTypes.string,
  label: PropTypes.string,
  maxlength: PropTypes.number,
  minLength: PropTypes.number,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  touched: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
