import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { ProfileQuickActions } from './ProfileQuickActions';
import { Package, Heart, Zap, Calendar } from 'lucide-react-native';
import { colors } from '@/theme';

const actions = [
  {
    id: 'purchases',
    icon: Package,
    title: 'Mes Achats',
    subtitle: 'Licences & Téléchargements',
    colors: [colors.primaryDark, colors.primary] as [string, string],
    onPress: () => console.log('Purchases pressed'),
  },
  {
    id: 'favorites',
    icon: Heart,
    title: 'Favoris',
    subtitle: 'Beats sauvegardés',
    colors: [colors.accent, colors.secondary] as [string, string],
    onPress: () => console.log('Favorites pressed'),
  },
  {
    id: 'boost',
    icon: Zap,
    title: 'Booster',
    subtitle: 'Augmenter la visibilité',
    colors: [colors.secondary, colors.warning] as [string, string],
    onPress: () => console.log('Boost pressed'),
  },
  {
    id: 'bookings',
    icon: Calendar,
    title: 'Réservations',
    subtitle: 'Services demandés',
    colors: [colors.primaryDark, colors.cyan] as [string, string],
    onPress: () => console.log('Bookings pressed'),
  },
];

const meta: Meta<typeof ProfileQuickActions> = {
  title: 'Features/Profile/ProfileQuickActions',
  component: ProfileQuickActions,
  decorators: [
    Story => (
      <View style={{ padding: 16, backgroundColor: '#0A0A0A', minHeight: 400 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfileQuickActions>;

export const Default: Story = {
  args: {
    actions,
  },
};

export const TwoActions: Story = {
  args: {
    actions: actions.slice(0, 2),
  },
};
