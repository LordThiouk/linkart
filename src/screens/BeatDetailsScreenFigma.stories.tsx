/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BeatDetailsScreenFigma } from './BeatDetailsScreenFigma';

const meta: Meta<typeof BeatDetailsScreenFigma> = {
  title: 'Screens/BeatDetailsScreenFigma',
  component: BeatDetailsScreenFigma,
  decorators: [Story => <Story />],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    beatId: { control: 'text' },
    onBack: { action: 'back' },
    onBuyClick: { action: 'buy' },
    hasPurchased: { control: 'boolean' },
  },
  args: {
    beatId: '1',
    hasPurchased: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    beatId: '1',
    onBack: () => {},
    onBuyClick: () => {},
    hasPurchased: false,
  },
};

export const Purchased: Story = {
  args: {
    beatId: '1',
    onBack: () => {},
    onBuyClick: () => {},
    hasPurchased: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Écran de détail beat avec player, waveform, licences, avis et beats similaires.',
      },
    },
  },
};
