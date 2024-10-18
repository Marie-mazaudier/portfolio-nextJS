import React, { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, ...props }, ref) => {
    return <input className={className} ref={ref} {...props} />;
  }
);

// Ajouter un nom d'affichage au composant pour éviter l'erreur ESLint
FormInput.displayName = "FormInput";

export default FormInput;
