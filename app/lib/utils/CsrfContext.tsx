import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Créer le contexte
const CsrfContext = createContext<{ csrfToken: string | null }>({
  csrfToken: null,
});

// Fournisseur de contexte pour encapsuler l'application
export const CsrfProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  // Récupérer le CSRF token quand le composant est monté
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/api/csrf-token'); // Supposons que cette route te retourne le token
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
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
