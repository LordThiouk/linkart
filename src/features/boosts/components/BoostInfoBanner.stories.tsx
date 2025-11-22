import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BoostInfoBanner } from './BoostInfoBanner';

const meta: Meta<typeof BoostInfoBanner> = {
  title: 'features/boosts/BoostInfoBanner',
  component: BoostInfoBanner,
};

export default meta;
type Story = StoryObj<typeof BoostInfoBanner>;

export const Default: Story = {
  args: {
    title: '💡 Astuce',
    message: 'Les boosts de 7 jours offrent le meilleur rapport qualité-prix et permettent une exposition continue',
  },
};
