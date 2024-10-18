import React, { forwardRef } from "react";

interface FormTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className: string;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ className, ...props }, ref) => {
    return <textarea className={className} ref={ref} {...props} />;
  }
);

// Ajouter un nom d'affichage au composant pour éviter l'erreur ESLint
FormTextArea.displayName = "FormTextArea";

export default FormTextArea;
