import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className: string;
}

const FormInput: React.FC<FormInputProps> = ({ className, ...props }) => {
  return <input className={className} {...props} />;
};

export default FormInput;