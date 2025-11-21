import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { HomeHeroCarousel } from './HomeHeroCarousel';

const meta: Meta<typeof HomeHeroCarousel> = {
  title: 'Features/Home/HomeHeroCarousel',
  component: HomeHeroCarousel,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof HomeHeroCarousel>;

export const Default: Story = {
  args: {
    onExploreDeals: () => {},
    onDiscoverKits: () => {},
    onBoost: () => {},
  },
};
