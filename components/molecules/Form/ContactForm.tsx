"use client";

import React from "react";
import FormInput from "@/components/atoms/form/FormInput";
import FormTextArea from "@/components/atoms/form/FormTextArea";
import { FormLoader } from "@/components/atoms/loaders/FormLoader";
import { useSendEmailBrevo } from "@/app/lib/brevo/sendEmail";
import { useForm } from "react-hook-form";
import { useCsrf } from "@/app/lib/utils/CsrfContext"; // Import du contexte CSRF
import ArrowBtn from "@/app/assets/icons/arrow-up.svg";

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
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const { sendEmailBrevo } = useSendEmailBrevo();
  const { csrfToken } = useCsrf(); // Récupérer le token CSRF depuis le contexte
  const [message, setMessage] = React.useState<string | null>(null);
  const [messageType, setMessageType] = React.useState<
    "success" | "error" | null
  >(null);

  const watchAllFields = watch(); // Surveille les champs du formulaire
  // console.log("Valeurs actuelles des champs : ", watchAllFields);

  const onSubmit = async (dataForm: any) => {
    console.log("Données du formulaire :", dataForm); // Afficher les données du formulaire

    // Vérifier que les champs sont bien remplis
    const { email, lastName, phone, informations } = dataForm;

    if (!email || !lastName || !phone || !informations) {
      console.error(
        "Un ou plusieurs champs sont vides, vérifiez la soumission du formulaire"
      );
      setMessage("Tous les champs doivent être remplis.");
      setMessageType("error");
      return;
    }

    if (!csrfToken) {
      console.log("Erreur : token CSRF manquant");
      setMessage("Le token CSRF est manquant. Veuillez réessayer.");
      setMessageType("error");
      return;
    }

    // Log des données à envoyer
    console.log("Données à envoyer :", {
      email,
      lastName,
      phone,
      informations,
    });

    const finalEmailAdmin = email_admin || "marie.esturgie@gmail.com";
    const finalFirmName = firm_name || "Marie Esturgie";
    const htmlContent = `
        <html>
            <body>
                <p>Nouvelle demande de contact</p>
                <p>Nom: ${lastName}</p>
                <p>Email: ${email}</p>
                <p>Téléphone: ${phone}</p>
                <p>Message: ${informations}</p>
            </body>
        </html>
    `;
    const textContent = `Nouvelle demande de contact\nNom: ${lastName}\nEmail: ${email}\nTéléphone: ${phone}\nInformations: ${informations}`;

    try {
      console.log("Envoi de l'email en cours...");

      // Passer le CSRF token dans les headers de la requête
      await sendEmailBrevo(
        finalEmailAdmin,
        ` ${lastName}`,
        finalEmailAdmin,
        finalFirmName,
        htmlContent,
        textContent,
        "Demande de contact",
        csrfToken
      );

      setMessage("Votre message a été envoyé avec succès.");
      setMessageType("success");
      console.log("Email envoyé avec succès");
      reset(); // Réinitialiser le formulaire après l'envoi réussi
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
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
          {/* <FormInput
            className={`${
              errors.firstName ? "text-red-400" : "texte_class"
            } form-contact placeholder-white box-border flex flex-col p-2.5 my-auto text-base  border-b border-solid bg-transparent border-secondary text-secondary w-full max-w-full`}
            type="text"
            placeholder="Prénom"
            id="firstName"
            {...register("firstName", {
              required: false,
            })}
          />*/}
          <FormInput
            className={`${
              errors.lastName ? "text-red-400" : "texte_class"
            } form-contact placeholder-white box-border flex flex-col p-2.5 my-auto text-base  border-b border-solid bg-transparent border-secondary text-secondary w-full max-w-full`}
            type="text"
            placeholder="Nom "
            id="lastName"
            {...register("lastName", {
              required: false,
            })}
          />

          <FormInput
            className={`form-contact  ${
              errors.email ? "text-red-400" : "texte_class"
            } placeholder-white box-border flex flex-col p-2.5 my-auto text-base  border-b border-solid bg-transparent border-secondary text-secondary w-full max-w-full`}
            type="email"
            placeholder="Email"
            id="email"
            {...register("email", {
              required: false,
            })}
          />
          {errors.email && typeof errors.email.message === "string" && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
          <FormInput
            className={`${
              errors.phone ? "text-red-400" : "texte_class"
            } form-contact placeholder-white box-border flex flex-col p-2.5 my-auto text-base  border-b border-solid bg-transparent border-secondary text-secondary w-full max-w-full`}
            type="tel"
            placeholder="Téléphone"
            id="phone"
            {...register("phone", {
              required: false,
            })}
          />
        </div>
      </div>
      {/* Champ Honeypot invisible */}
      <input type="hidden" {...register("honeypot")} />
      <div className="box-border flex flex-col mt-5 w-full">
        <div className="flex gap-5 max-md:flex-col w-full">
          <div className="flex flex-col w-full">
            <FormTextArea
              className="form-message placeholder-white box-border flex flex-col p-2.5 text-base  rounded border border-solid bg-transparent border-secondary text-secondary min-h-[150px] w-full max-w-full"
              placeholder="Message"
              defaultValue=""
              required={false}
              {...register("informations")}
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
                <p className="h-[25px] group text-secondary flex flex-row hover:text-accent transition font-textMedium text-[0.9rem] uppercase  w-[97%]">
                  <span className="border-b border-secondary group-hover:border-accent  py-0">
                    Envoyer
                  </span>
                  <ArrowBtn
                    width="15px"
                    height="15px"
                    className="mt-1 m-[10px] group-hover:stroke-accent"
                    stroke="var(--secondary-color)"
                  />
                </p>
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
