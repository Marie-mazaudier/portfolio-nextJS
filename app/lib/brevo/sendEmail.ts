'use client'; // Ce fichier est un Client Component

import axios from 'axios';

export const useSendEmailBrevo = () => {
  const sendEmailBrevo = async (
    email: string,
    sender: string,
    email_admin: string,
    firm_name: string,
    htmlContent: string,
    textContent: string,
    subject: string,
    csrfToken: string // Passer le token CSRF en paramètre
  ) => {
    try {
      console.log(
        "Préparation de l'envoi de l'email via Brevo avec les paramètres :"
      );
      console.log({
        email,
        sender,
        email_admin,
        firm_name,
        subject,
        htmlContent,
        textContent,
      });

      console.log(
        "Token CSRF utilisé pour la requête d'envoi d'email :",
        csrfToken
      );

      const response = await axios.post(
        '/api/brevo/sendEmail',
        {
          email,
          sender,
          email_admin,
          firm_name,
          htmlContent,
          textContent,
          subject,
        },
        {
          headers: {
            'x-csrf-token': csrfToken, // Inclure le token CSRF dans les headers
          },
          withCredentials: true, // Assurez-vous que les cookies (incluant le token CSRF) sont inclus
        }
      );

      console.log("Réponse reçue de l'API interne:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erreur lors de l'envoi de l'email via Brevo :",
          error.response?.data
        );
        throw new Error(
          'Failed to send email: ' +
            (error.response?.data?.message || error.message)
        );
      } else if (error instanceof Error) {
        console.error('Erreur générale :', error.message);
        throw new Error('Failed to send email: ' + error.message);
      } else {
        console.error("Erreur inattendue lors de l'envoi de l'email.");
        throw new Error('An unexpected error occurred');
      }
    }
  };

  return { sendEmailBrevo };
};
