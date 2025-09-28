import React from "react";
import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className={`${styles.input} df fdc`}>
      {label && <label>{label}:</label>}
      <input {...props} />
    </div>
  );
};

export default Input;
