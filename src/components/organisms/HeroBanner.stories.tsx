import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { HeroBanner } from './HeroBanner';

const meta: Meta<typeof HeroBanner> = {
  title: 'Organisms/HeroBanner',
  component: HeroBanner,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isPlaying: {
      control: { type: 'boolean' },
    },
    onPress: {
      action: 'pressed',
    },
    onPlay: {
      action: 'play pressed',
    },
    onBuy: {
      action: 'buy pressed',
    },
  },
  decorators: [Story => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    title: 'Dark Trap Beat',
    artist: 'Producer Name',
    duration: '3:24',
    backgroundGradient: ['#6366F1', '#4F46E5', '#7C3AED'],
    isPlaying: false,
    onPress: () => {},
    onPlay: () => {},
    onBuy: () => {},
  },
  // Note: Tests interactifs (@storybook/test) non disponibles dans Storybook 9.x
  // Pour tester l'interaction, utilisez @testing-library/react dans vos tests unitaires
};

export const WithImage: Story = {
  args: {
    id: '2',
    title: 'Afrobeat Fusion',
    artist: 'African Producer',
    duration: '4:12',
    backgroundImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    isPlaying: true,
    onPress: () => {},
    onPlay: () => {},
    onBuy: () => {},
  },
  // Note: Tests interactifs (@storybook/test) non disponibles dans Storybook 9.x
};

export const WithoutBuyButton: Story = {
  args: {
    id: '3',
    title: 'Chill Vibes',
    artist: 'Relax Producer',
    duration: '2:45',
    backgroundGradient: ['#10B981', '#059669', '#047857'],
    isPlaying: false,
    onPress: () => {},
    onPlay: () => {},
    // Pas de onBuy - le bouton ne s'affiche pas
  },
  // Note: Tests interactifs (@storybook/test) non disponibles dans Storybook 9.x
};

export const LongTitle: Story = {
  args: {
    id: '4',
    title: 'This is a Very Long Beat Title That Should Wrap Properly',
    artist: 'Producer with Long Name Too',
    duration: '5:30',
    backgroundGradient: ['#F59E0B', '#D97706', '#B45309'],
    isPlaying: false,
    onPress: () => {},
    onPlay: () => {},
    onBuy: () => {},
  },
};

export const AllStates: Story = {
  args: {
    id: '5',
    title: 'Complete Test Beat',
    artist: 'Test Artist',
    duration: '3:00',
    backgroundGradient: ['#EC4899', '#DB2777', '#BE185D'],
    isPlaying: true,
    onPress: () => {},
    onPlay: () => {},
    onBuy: () => {},
  },
};

export const StorybookFriendly: Story = {
  args: {
    id: '6',
    title: 'Storybook Compatible',
    artist: 'Test Producer',
    duration: '2:30',
    backgroundGradient: ['#8B5CF6', '#7C3AED', '#6D28D9'],
    isPlaying: false,
    onPress: () => {},
    onPlay: () => {},
    onBuy: () => {},
  },
};
