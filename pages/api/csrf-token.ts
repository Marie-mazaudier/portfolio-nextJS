// pages/api/csrf-token.ts

import { v4 as uuidv4 } from "uuid";
import { parseCookies, setCookie } from "nookies";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parseCookies({ req });
  let csrfToken = cookies["csrfToken"];

  // Générer un nouveau token CSRF s'il n'existe pas encore
  if (!csrfToken) {
    csrfToken = uuidv4();
    setCookie({ res }, "csrfToken", csrfToken, {
      httpOnly: true, // Pour protéger le cookie côté serveur uniquement
      secure: process.env.NODE_ENV === "production", // True en production
      sameSite: "lax", // Protection contre les attaques CSRF cross-site
      path: "/",
    });
  }

  res.status(200).json({ csrfToken });
}
