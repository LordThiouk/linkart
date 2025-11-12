import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ServiceCard } from './ServiceCard';

const meta: Meta<typeof ServiceCard> = {
  title: 'Molecules/ServiceCard',
  component: ServiceCard,
  decorators: [Story => <Story />],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    id: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    category: { control: 'text' },
    rating: { control: 'number' },
    reviewCount: { control: 'number' },
    isFavorite: { control: 'boolean' },
    onPress: { action: 'pressed' },
    onToggleFavorite: { action: 'favorite toggled' },
    onBook: { action: 'booked' },
  },
};

export default meta;
type Story = StoryObj<typeof ServiceCard>;

export const Default: Story = {
  args: {
    id: '1',
    title: 'Mixage Professionnel',
    provider: {
      id: '1',
      name: 'Studio Alpha',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      verified: true,
    },
    category: 'mixage',
    price: {
      amount: 15000,
      currency: 'EUR',
      type: 'fixed',
    },
    rating: 4.5,
    reviewCount: 12,
    onPress: () => console.log('Service pressed'),
    onToggleFavorite: () => console.log('Favorite toggled'),
    onBook: () => console.log('Service booked'),
  },
};

export const OnDemand: Story = {
  args: {
    id: '2',
    title: 'Mastering Audio',
    provider: {
      id: '2',
      name: 'Sound Master',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      verified: false,
    },
    category: 'mastering',
    onPress: () => console.log('Service pressed'),
    onToggleFavorite: () => console.log('Favorite toggled'),
    onBook: () => console.log('Service booked'),
  },
};

export const Tiered: Story = {
  args: {
    id: '3',
    title: 'Production Complète',
    provider: {
      id: '3',
      name: 'Beat Factory',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      verified: true,
    },
    category: 'production',
    price: {
      amount: 30000,
      currency: 'FCFA',
      type: 'multi_tier',
    },
    onPress: () => console.log('Service pressed'),
    onToggleFavorite: () => console.log('Favorite toggled'),
    onBook: () => console.log('Service booked'),
  },
};

export const SmallSize: Story = {
  args: {
    id: '4',
    title: 'Coaching Vocal',
    provider: {
      id: '4',
      name: 'Vocal Coach',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      verified: true,
    },
    category: 'coaching',
    price: {
      amount: 10000,
      currency: 'FCFA',
      type: 'fixed',
    },
    rating: 4.8,
    reviewCount: 8,
    onPress: () => console.log('Service pressed'),
    onToggleFavorite: () => console.log('Favorite toggled'),
    onBook: () => console.log('Service booked'),
  },
};

export const LargeSize: Story = {
  args: {
    id: '5',
    title: 'Enregistrement Studio',
    provider: {
      id: '5',
      name: 'Studio Pro',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      verified: true,
    },
    category: 'recording',
    price: {
      amount: 25000,
      currency: 'FCFA',
      type: 'fixed',
    },
    rating: 4.9,
    reviewCount: 25,
    onPress: () => console.log('Service pressed'),
    onToggleFavorite: () => console.log('Favorite toggled'),
    onBook: () => console.log('Service booked'),
  },
};

export const AllSizes: Story = {
  render: () => (
    <>
      <ServiceCard
        id="1"
        title="Mixage"
        provider={{
          id: '1',
          name: 'Studio Alpha',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          verified: true,
        }}
        category="mixage"
        price={{
          amount: 15000,
          currency: 'FCFA',
          type: 'fixed',
        }}
        rating={4.5}
        reviewCount={12}
        onPress={() => {}}
        onToggleFavorite={() => {}}
        onBook={() => {}}
        description={'Mixage professionnel pour vos productions musicales.'}
      />
      <ServiceCard
        id="2"
        title="Mastering"
        provider={{
          id: '2',
          name: 'Sound Master',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          verified: false,
        }}
        category="mastering"
        price={{
          amount: 20000,
          currency: 'FCFA',
          type: 'fixed',
        }}
        rating={4.8}
        reviewCount={8}
        onPress={() => {}}
        onToggleFavorite={() => {}}
        onBook={() => {}}
        description={'Mastering final pour optimiser votre mixage.'}
      />
      <ServiceCard
        id="3"
        title="Production"
        provider={{
          id: '3',
          name: 'Beat Factory',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          verified: true,
        }}
        category="production"
        price={{
          amount: 30000,
          currency: 'FCFA',
          type: 'multi_tier',
        }}
        rating={4.9}
        reviewCount={25}
        onPress={() => {}}
        onToggleFavorite={() => {}}
        onBook={() => {}}
        description={"Production complète de votre projet musical de l'idée initiale au produit final."}
      />
    </>
  ),
};
