import { v4 as uuidv4 } from 'uuid';
import { parseCookies, setCookie } from 'nookies';
import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';

// Génération du token CSRF et stockage dans un cookie
export function generateCsrfToken(req: NextApiRequest, res: NextApiResponse) {
  const csrfToken = uuidv4();
  setCookie({ res }, 'csrfToken', csrfToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
  return csrfToken;
}

// Vérification du token CSRF
export function verifyCsrfToken(req: NextApiRequest): void {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const csrfCookie = cookies['csrfToken'];
  const csrfHeader = req.headers['x-csrf-token'];

  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    throw new Error('Invalid CSRF token');
  }
}
