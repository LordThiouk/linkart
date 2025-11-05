import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { SearchFiltersScreenFigma } from './SearchFiltersScreenFigma';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../../theme';

const meta: Meta<typeof SearchFiltersScreenFigma> = {
  title: 'Screens/Search/SearchFiltersScreenFigma',
  component: SearchFiltersScreenFigma,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <Story />
        </PaperProvider>
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SearchFiltersScreenFigma>;

export const Default: Story = {
  args: {
    onBack: () => console.log('Back pressed'),
    onBeatClick: (beatId: string) => console.log('Beat clicked:', beatId),
  },
};
