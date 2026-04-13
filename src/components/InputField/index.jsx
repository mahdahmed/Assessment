import React from 'react';
import styles from './inputField.module.css';

const InputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required = false,

  // style overrides
  containerClass = '',
  labelClass = '',
  inputClass = '',
  errorClass = '',
}) => {

  return (
    <div className={`${styles.container} ${containerClass}`}>
      {label && (
        <label
          className={`${styles.label} ${labelClass}`}
        >
          {label} {required && '*'}
        </label>
      )}

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder? placeholder:`${name} is required`}
        className={`${styles.input} ${
          error ? styles.inputError : ''
        } ${inputClass}`}
      />

      {error && (
        <p
          className={`${styles.error} ${errorClass}`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;