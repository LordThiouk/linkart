import type { Preview } from '@storybook/react-native-web-vite';
import { Decorator } from '@storybook/react';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../src/theme';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const decorators: Decorator[] = [
  Story => (
    <SafeAreaProvider>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <Story />
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  ),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
