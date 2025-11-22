import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { SearchFiltersScreenFigma } from './SearchFiltersScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof SearchFiltersScreenFigma> = {
  title: 'features/search/SearchFiltersScreenFigma',
  component: SearchFiltersScreenFigma,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
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
    onBeatClick: beatId => console.log('Beat clicked:', beatId),
  },
};
