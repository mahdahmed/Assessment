// src/components/Button.tsx
import React from 'react';
import styles from './Button.module.css';



const Button = ({
  children,
  variant = 'transparent',
  icon,
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ...props
}) => {

  const handleClick = () => {
    if (loading || disabled) return;
    onClick();
  };

  return (
    <button
      className={`
        ${styles.button} 
        ${styles[variant]} 
        ${className}
      `.trim()}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading ? (
        <>
          <div className={styles.spinner} />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span className="flex items-center">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export default Button;