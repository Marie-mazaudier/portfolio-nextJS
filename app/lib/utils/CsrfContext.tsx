'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Création du contexte
const CsrfContext = createContext<{ csrfToken: string | null }>({
  csrfToken: null,
});

// Fournisseur du contexte pour encapsuler l'application côté client
export const CsrfProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  // Récupérer le token CSRF lors du montage du composant
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/api/csrf-token', {
          withCredentials: true, // Permet de récupérer le cookie
        });
        setCsrfToken(response.data.csrfToken);
        console.log('Token CSRF récupéré :', response.data.csrfToken);
      } catch (error) {
        console.error('Erreur lors de la récupération du token CSRF :', error);
      }
    };

    fetchCsrfToken();
  }, []);

  return (
    <CsrfContext.Provider value={{ csrfToken }}>
      {children}
    </CsrfContext.Provider>
  );
};

// Hook pour accéder au contexte CSRF
export const useCsrf = () => useContext(CsrfContext);
