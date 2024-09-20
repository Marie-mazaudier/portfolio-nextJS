// pages/api/csrf-token.js

import { v4 as uuidv4 } from 'uuid';
import { parseCookies, setCookie } from 'nookies';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parseCookies({ req });
  let csrfToken = cookies['csrfToken'];

  if (!csrfToken) {
    csrfToken = uuidv4();
    setCookie({ res }, 'csrfToken', csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
  }

  res.status(200).json({ csrfToken });
}
