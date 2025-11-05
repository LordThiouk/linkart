import { getStorybookUI } from '@storybook/react-native';
import './storybook.requires';

console.log('📚 [Storybook] Initialisation de Storybook React Native...');
console.log(
  '📚 [Storybook] Variables EXPO_PUBLIC_*:',
  Object.keys(process.env).filter(key => key.startsWith('EXPO_PUBLIC_'))
);
console.log('📚 [Storybook] EXPO_PUBLIC_SUPABASE_URL:', process.env.EXPO_PUBLIC_SUPABASE_URL ? 'défini' : 'undefined');
console.log(
  '📚 [Storybook] EXPO_PUBLIC_SUPABASE_ANON_KEY:',
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ? 'défini' : 'undefined'
);

// Refer to https://github.com/storybookjs/react-native/tree/main/app/react-native#getstorybookui-options
// for the list of options
console.log('📚 [Storybook] Création de StorybookUI...');
export const StorybookUIRoot = getStorybookUI({
  asyncStorage: require('@react-native-async-storage/async-storage').default,
});
console.log('✅ [Storybook] StorybookUI créé');

export default StorybookUIRoot;
