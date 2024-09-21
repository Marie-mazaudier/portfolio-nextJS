import { v4 as uuidv4 } from 'uuid';
import { parseCookies, setCookie } from 'nookies';
import { NextApiRequest, NextApiResponse } from 'next';

export function generateCsrfToken(req: NextApiRequest, res: NextApiResponse) {
  const csrfToken = uuidv4();
  setCookie({ res }, 'csrfToken', csrfToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
  return csrfToken;
}

export function verifyCsrfToken(req: NextApiRequest): void {
  const csrfToken = req.headers['x-csrf-token'];

  if (!csrfToken || csrfToken !== process.env.CSRF_SECRET) {
    throw new Error('Invalid CSRF token');
  }
}
