// pages/api/sendEmail.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyCsrfToken } from '@/app/lib/utils/csrf';
import validator from 'validator';
import sanitizeHtml from 'sanitize-html';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    verifyCsrfToken(req);
  } catch (error) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
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

  // Validation
  if (!validator.isEmail(email) || !validator.isEmail(email_admin)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  if (!subject || !textContent || !htmlContent) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  // Configuration for sanitizeHtml
  const cleanHtml = sanitizeHtml(htmlContent, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt'],
    },
  });

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'api-key': process.env.NEXT_PUBLIC_BREVO_API_KEY || '',
  };

  const requestOptions = {
    method: 'POST',
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
      'https://api.brevo.com/v3/smtp/email',
      requestOptions
    );
    const data = await response.json();

    if (!response.ok) {
      console.error('Brevo API Error:', data);
      return res
        .status(response.status)
        .json({ message: `Failed to send email. Status: ${response.status}` });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Failed to send email.' });
  }
}
