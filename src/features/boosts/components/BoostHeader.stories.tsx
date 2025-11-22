import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BoostHeader } from './BoostHeader';

const meta: Meta<typeof BoostHeader> = {
  title: 'features/boosts/BoostHeader',
  component: BoostHeader,
};

export default meta;
type Story = StoryObj<typeof BoostHeader>;

export const Default: Story = {
  args: {
    title: 'Booster la visibilité',
    subtitle: '📦 Produit • Dark Trap Energy',
    onBack: () => console.log('Back pressed'),
  },
};

export const Profile: Story = {
  args: {
    title: 'Booster la visibilité',
    subtitle: '👤 Profil • BeatKing',
    onBack: () => console.log('Back pressed'),
  },
};
