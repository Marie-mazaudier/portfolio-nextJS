import type { NextApiRequest, NextApiResponse } from "next";
import { verifyCsrfToken } from "@/app/lib/utils/csrf"; // Utilisation de l'import nommé
import validator from "validator";
import sanitizeHtml from "sanitize-html";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Vérifier le token CSRF
  try {
    console.log(
      "Token CSRF reçu dans les headers :",
      req.headers["x-csrf-token"]
    );
    verifyCsrfToken(req); // Appel à la fonction pour vérifier le token CSRF
    console.log("Token CSRF vérifié avec succès.");
  } catch (error) {
    console.error("Erreur lors de la vérification du token CSRF :", error);
    return res.status(403).json({ error: "Invalid CSRF token" });
  }

  const {
    email,
    sender,
    email_admin,
    firm_name,
    htmlContent,
    textContent,
    subject,
  } = req.body;

  // Validation des champs requis
  if (!validator.isEmail(email) || !validator.isEmail(email_admin)) {
    console.error("Format d'email invalide.");
    return res.status(400).json({ message: "Invalid email format" });
  }
  if (!subject || !textContent || !htmlContent) {
    console.error("Certains champs sont manquants.");
    return res.status(400).json({ message: "Missing fields" });
  }

  // Sanitize HTML pour éviter les XSS
  const cleanHtml = sanitizeHtml(htmlContent, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt"],
    },
  });
  // Log pour vérifier la clé d'API Brevo
  console.log(
    "Clé API Brevo récupérée depuis l'environnement :",
    process.env.BREVO_API_KEY
  );
  // Préparer les en-têtes et les options de la requête
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "api-key": process.env.BREVO_API_KEY || "",
  };

  const requestOptions = {
    method: "POST",
    headers,
    body: JSON.stringify({
      sender: { name: sender, email },
      replyTo: { email },
      to: [{ email: email_admin, name: firm_name }],
      htmlContent: cleanHtml,
      textContent,
      subject,
    }),
  };

  try {
    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      requestOptions
    );
    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur de l'API Brevo :", data);
      return res
        .status(response.status)
        .json({ message: `Failed to send email. Status: ${response.status}` });
    }

    console.log("Email envoyé avec succès via Brevo.");
    return res.status(200).json(data);
  } catch (error) {
    console.error("Erreur lors de la requête vers Brevo :", error);
    return res.status(500).json({ message: "Failed to send email." });
  }
}
