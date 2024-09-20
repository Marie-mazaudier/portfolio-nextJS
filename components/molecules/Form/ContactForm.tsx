"use client";

import React from "react";
import FormInput from "@/components/atoms/form/FormInput";
import FormTextArea from "@/components/atoms/form/FormTextArea";
import { FormLoader } from "@/components/atoms/loaders/FormLoader";
import { useSendEmailBrevo } from "@/app/lib/brevo/sendEmail";
import { useForm } from "react-hook-form";
import { useCsrf } from "@/app/lib/utils/CsrfContext"; // Import du contexte CSRF

interface ContactFormProps {
  email_admin?: string;
  firm_name?: string;
  formLoader?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  email_admin,
  firm_name,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const { sendEmailBrevo } = useSendEmailBrevo();
  const { csrfToken } = useCsrf(); // Récupérer le token CSRF depuis le contexte
  const [message, setMessage] = React.useState<string | null>(null);
  const [messageType, setMessageType] = React.useState<
    "success" | "error" | null
  >(null);

  const onSubmit = async (dataForm: any) => {
    if (!csrfToken) {
      setMessage("Le token CSRF est manquant. Veuillez réessayer.");
      setMessageType("error");
      return;
    }

    // Vérifie si le champ honeypot est rempli
    if (dataForm.honeypot) {
      console.log("Potentiel spam détecté");
      return; // Arrête la soumission si c'est un spam
    }

    const { email, firstName, lastName, phone, informations, newsletter } =
      dataForm;

    // Appliquer des valeurs par défaut si email_admin ou firm_name sont null
    const finalEmailAdmin = email_admin || "marie.esturgie@gmail.com";
    const finalFirmName = firm_name || "";
    const htmlContent = `
        <html>
            <body>
                <p>Nouvelle demande de contact</p>
                <p>Nom: ${lastName}</p>
                <p>Prénom: ${firstName}</p>
                <p>Email: ${email}</p>
                <p>Téléphone: ${phone}</p>
                <p>Informations: ${informations}</p>
                <p>Abonnement newsletter: ${newsletter ? "Oui" : "Non"}</p>
            </body>
        </html>
    `;

    const textContent = `Nouvelle demande de contact\nNom: ${lastName}\nPrénom: ${firstName}\nEmail: ${email}\nTéléphone: ${phone}\nInformations: ${informations}\nAbonnement newsletter: ${
      newsletter ? "Oui" : "Non"
    }`;

    try {
      // Passer le CSRF token dans les headers de la requête
      await sendEmailBrevo(
        email,
        `${firstName} ${lastName}`,
        finalEmailAdmin,
        finalFirmName,
        htmlContent,
        textContent,
        "Demande de contact",
        csrfToken // Ajout du token CSRF ici
      );
      setMessage("Votre message a été envoyé avec succès.");
      setMessageType("success");
      reset(); // Réinitialiser le formulaire après l'envoi réussi
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email : ", error);
      setMessage("Erreur lors de l'envoi du message. Veuillez réessayer.");
      setMessageType("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="box-border flex flex-col w-full max-w-[100%] h-auto">
      <div className="box-border flex flex-col mt-5">
        <div className="box-border flex gap-5 max-md:flex-col w-full">
          <FormInput
            className={`${
              errors.lastName ? "text-red-400" : "texte_class"
            } form-contact placeholder-white box-border flex flex-col p-2.5 my-auto text-base uppercase border-b border-solid bg-transparent border-secondary text-secondary w-full max-w-full`}
            type="text"
            placeholder="Nom"
            id="firstName"
            {...register("firstName", {
              required: "First Name is required",
            })}
          />
          <FormInput
            className={`form-contact  ${
              errors.email ? "text-red-400" : "texte_class"
            } placeholder-white box-border flex flex-col p-2.5 my-auto text-base uppercase border-b border-solid bg-transparent border-secondary text-secondary w-full max-w-full`}
            type="email"
            placeholder="Email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
          />
          {errors.email && typeof errors.email.message === "string" && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
          <FormInput
            className={`${
              errors.phone ? "text-red-400" : "texte_class"
            } form-contact placeholder-white box-border flex flex-col p-2.5 my-auto text-base uppercase border-b border-solid bg-transparent border-secondary text-secondary w-full max-w-full`}
            type="tel"
            placeholder="Téléphone"
            id="phone"
            {...register("phone", {
              required: "Phone is required",
            })}
          />
        </div>
      </div>
      <div className="box-border flex flex-col mt-5 w-full">
        <div className="flex gap-5 max-md:flex-col w-full">
          <div className="flex flex-col w-full">
            <FormTextArea
              className="form-message placeholder-white box-border flex flex-col p-2.5 text-base uppercase rounded border border-solid bg-transparent border-secondary text-primary min-h-[150px] w-full max-w-full"
              placeholder="Message"
              name="message"
              defaultValue=""
              required={false}
            />
            <button
              type="submit"
              className={`box-border transition-all duration-300 ease-in-out relative shrink-0 mt-10 mr-auto h-auto text-sm text-secondary uppercase ${
                isSubmitting
                  ? "bg-gray-800 shadow-md text-white cursor-not-allowed opacity-50"
                  : "bg-principal shadow-4xl text-white hover:opacity-70 cursor-pointer"
              }`}
              disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  Chargement...
                  <FormLoader color="text-white" />
                </>
              ) : (
                <>
                  Contactez-moi
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon-arrow inline-block ml-2"
                    width="20px"
                    height="20px"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Message de résultat de la soumission */}
      {message && (
        <div
          className={`mt-4 text-center py-2 px-4 rounded ${
            messageType === "success"
              ? "text-green-700 bg-green-100"
              : "text-red-700 bg-red-100"
          }`}>
          {message}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
