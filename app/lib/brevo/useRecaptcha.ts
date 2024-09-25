'use client'; // Ce fichier est un Client Component

import { useState } from 'react';
import axios from 'axios';

type UseRecaptchaReturn = {
  verifyRecaptcha: (token: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
};

export function useRecaptcha(): UseRecaptchaReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyRecaptcha = async (token: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await axios.post('/api/brevo/verifyRecaptcha', {
        token,
      });
      setLoading(false);
      return response.data.success;
    } catch (err) {
      console.error('Error verifying recaptcha:', err);
      setError('Failed to verify recaptcha.');
      setLoading(false);
      return false;
    }
  };

  return { verifyRecaptcha, loading, error };
}
