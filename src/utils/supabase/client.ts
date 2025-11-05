import { createClient, SupabaseClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

/**
 * Récupère la configuration Supabase depuis les variables d'environnement
 * Expo charge les variables EXPO_PUBLIC_* au build time, donc process.env est disponible
 */
function getSupabaseConfig() {
  console.log('🔍 [Supabase Config] Début du chargement de la configuration...');

  // Log toutes les variables EXPO_PUBLIC_* disponibles
  const allEnvVars = Object.keys(process.env).filter(key => key.startsWith('EXPO_PUBLIC_'));
  console.log('📋 [Supabase Config] Variables EXPO_PUBLIC_* disponibles:', allEnvVars);

  // Log Constants.expoConfig?.extra si disponible
  if (Constants.expoConfig?.extra) {
    console.log('📋 [Supabase Config] Constants.expoConfig.extra:', Object.keys(Constants.expoConfig.extra));
  }

  // Essayer process.env d'abord
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  console.log(
    '🔍 [Supabase Config] process.env.EXPO_PUBLIC_SUPABASE_URL:',
    supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'undefined'
  );
  console.log(
    '🔍 [Supabase Config] process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY:',
    supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'undefined'
  );

  // Essayer Constants.expoConfig?.extra en fallback
  const extraUrl = Constants.expoConfig?.extra?.supabaseUrl;
  const extraKey = Constants.expoConfig?.extra?.supabaseAnonKey;

  console.log(
    '🔍 [Supabase Config] Constants.expoConfig.extra.supabaseUrl:',
    extraUrl ? `${extraUrl.substring(0, 30)}...` : 'undefined'
  );
  console.log(
    '🔍 [Supabase Config] Constants.expoConfig.extra.supabaseAnonKey:',
    extraKey ? `${extraKey.substring(0, 20)}...` : 'undefined'
  );

  // Utiliser la première valeur disponible
  const finalUrl = supabaseUrl || extraUrl;
  const finalKey = supabaseAnonKey || extraKey;

  console.log('✅ [Supabase Config] URL finale:', finalUrl ? `${finalUrl.substring(0, 30)}...` : 'undefined');
  console.log('✅ [Supabase Config] Key finale:', finalKey ? `${finalKey.substring(0, 20)}...` : 'undefined');

  if (!finalUrl || !finalKey) {
    console.error("❌ [Supabase Config] Variables d'environnement manquantes");
    console.error('❌ [Supabase Config] finalUrl:', finalUrl);
    console.error('❌ [Supabase Config] finalKey:', finalKey ? '***' : 'undefined');
    console.error('❌ [Supabase Config] Toutes les variables process.env:', process.env);
    throw new Error('Supabase environment variables are not set');
  }

  // Valider que l'URL est valide
  if (typeof finalUrl !== 'string' || (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://'))) {
    console.error('❌ [Supabase Config] URL invalide:', finalUrl);
    console.error('❌ [Supabase Config] Type:', typeof finalUrl);
    throw new Error(`Invalid Supabase URL: ${finalUrl}`);
  }

  console.log('✅ [Supabase Config] Configuration chargée avec succès');
  return { supabaseUrl: finalUrl, supabaseAnonKey: finalKey };
}

/**
 * Crée un client Supabase avec gestion d'erreur
 * Si la création échoue, retourne un client avec des valeurs par défaut pour éviter le crash
 */
export function createSupabaseClient(): SupabaseClient {
  console.log('🚀 [Supabase Client] Création du client Supabase...');

  try {
    const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();

    console.log('✅ [Supabase Client] Configuration récupérée, création du client...');
    console.log('🔍 [Supabase Client] URL type:', typeof supabaseUrl);
    console.log('🔍 [Supabase Client] URL length:', supabaseUrl?.length);
    console.log('🔍 [Supabase Client] Key type:', typeof supabaseAnonKey);
    console.log('🔍 [Supabase Client] Key length:', supabaseAnonKey?.length);

    // Vérifier que les valeurs sont bien définies avant de créer le client
    console.log('🔍 [Supabase Client] Vérification finale avant createClient...');
    console.log(
      '🔍 [Supabase Client] supabaseUrl type:',
      typeof supabaseUrl,
      'value:',
      supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'undefined'
    );
    console.log(
      '🔍 [Supabase Client] supabaseAnonKey type:',
      typeof supabaseAnonKey,
      'value:',
      supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'undefined'
    );

    if (!supabaseUrl || typeof supabaseUrl !== 'string') {
      throw new Error(`Invalid supabaseUrl: ${typeof supabaseUrl} - ${supabaseUrl}`);
    }
    if (!supabaseAnonKey || typeof supabaseAnonKey !== 'string') {
      throw new Error(
        `Invalid supabaseAnonKey: ${typeof supabaseAnonKey} - ${supabaseAnonKey ? 'defined' : 'undefined'}`
      );
    }

    // Vérifier que l'URL est valide avant de passer à createClient
    if (supabaseUrl.indexOf('http') !== 0 && supabaseUrl.indexOf('https') !== 0) {
      throw new Error(`Invalid URL format: ${supabaseUrl}`);
    }

    console.log('✅ [Supabase Client] Validation OK, création du client...');
    const client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });

    console.log('✅ [Supabase Client] Client créé avec succès');
    return client;
  } catch (error) {
    console.error('❌ [Supabase Client] Erreur lors de la création du client:', error);
    if (error instanceof Error) {
      console.error('❌ [Supabase Client] Error type:', error.constructor.name);
      console.error('❌ [Supabase Client] Error message:', error.message);
      console.error('❌ [Supabase Client] Error stack:', error.stack);
    } else {
      console.error('❌ [Supabase Client] Error (unknown type):', JSON.stringify(error));
    }

    // Retourner un client avec des valeurs par défaut pour éviter le crash
    // Ce client ne fonctionnera pas pour les vraies requêtes, mais évitera l'erreur indexOf
    console.warn("⚠️ [Supabase Client] Création d'un client dummy pour éviter le crash");
    return createClient('https://dummy.supabase.co', 'dummy-key', {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    });
  }
}

/**
 * Client Supabase exporté par défaut
 * Utilise createSupabaseClient() pour créer le client avec gestion d'erreur
 */
console.log('📦 [Supabase Client] Initialisation du module Supabase client...');
console.log('📦 [Supabase Client] Contexte:', typeof window !== 'undefined' ? 'web' : 'react-native');
console.log('📦 [Supabase Client] Storybook activé?:', process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true');

let supabase: SupabaseClient;
try {
  supabase = createSupabaseClient();
  console.log('✅ [Supabase Client] Module Supabase client initialisé');
} catch (error) {
  console.error("❌ [Supabase Client] Erreur lors de l'initialisation du module:", error);
  // Créer un client dummy pour éviter le crash
  supabase = createClient('https://dummy.supabase.co', 'dummy-key', {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
  console.warn('⚠️ [Supabase Client] Client dummy créé pour éviter le crash');
}

export { supabase };
