import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:54321';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  async config => {
    try {
      // Utiliser le client Supabase centralisé
      const { supabase } = await import('../utils/supabase/client');

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du token:", error);
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token expiré, rediriger vers la connexion
      console.log('Token expiré, redirection vers la connexion');
    }

    return Promise.reject(error);
  }
);

export default api;
