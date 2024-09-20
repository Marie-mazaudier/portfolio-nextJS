import axios, { AxiosError } from 'axios';

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
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Si c'est une erreur Axios, on peut accéder à response
        throw new Error(
          'Failed to send email: ' +
            (error.response?.data?.message || error.message)
        );
      } else if (error instanceof Error) {
        // Erreur générale
        throw new Error('Failed to send email: ' + error.message);
      } else {
        // Cas non prévu
        throw new Error('An unexpected error occurred');
      }
    }
  };

  return { sendEmailBrevo };
};
