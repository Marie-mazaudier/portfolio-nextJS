import React from "react";

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className: string;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({ className, ...props }) => {
  return <textarea className={className}  {...props} />;
};

export default FormTextArea;