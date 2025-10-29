import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { expect, fn, userEvent, within } from '@storybook/test';
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
    onPress: fn(),
    onPlay: fn(),
    onBuy: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Test 1: Vérifier que le titre s'affiche
    expect(canvas.getByText('Dark Trap Beat')).toBeTruthy();

    // Test 2: Vérifier que l'artiste s'affiche
    expect(canvas.getByText(/Producer Name/i)).toBeTruthy();

    // Test 3: Click sur le banner
    const banner = canvas.getByTestId('hero-banner');
    await userEvent.click(banner);
    expect(args.onPress).toHaveBeenCalledWith('1');
  },
};

export const WithImage: Story = {
  args: {
    id: '2',
    title: 'Afrobeat Fusion',
    artist: 'African Producer',
    duration: '4:12',
    backgroundImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    isPlaying: true,
    onPress: fn(),
    onPlay: fn(),
    onBuy: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Test 1: Vérifier que le titre s'affiche
    expect(canvas.getByText('Afrobeat Fusion')).toBeTruthy();

    // Test 2: Vérifier que isPlaying est true
    expect(args.isPlaying).toBe(true);
  },
};

export const WithoutBuyButton: Story = {
  args: {
    id: '3',
    title: 'Chill Vibes',
    artist: 'Relax Producer',
    duration: '2:45',
    backgroundGradient: ['#10B981', '#059669', '#047857'],
    isPlaying: false,
    onPress: fn(),
    onPlay: fn(),
    // Pas de onBuy - le bouton ne s'affiche pas
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Test: Vérifier que le bouton "Acheter" n'existe pas
    const buyButtons = canvas.queryAllByText(/Acheter/i);
    expect(buyButtons.length).toBe(0);
  },
};

export const LongTitle: Story = {
  args: {
    id: '4',
    title: 'This is a Very Long Beat Title That Should Wrap Properly',
    artist: 'Producer with Long Name Too',
    duration: '5:30',
    backgroundGradient: ['#F59E0B', '#D97706', '#B45309'],
    isPlaying: false,
    onPress: fn(),
    onPlay: fn(),
    onBuy: fn(),
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
    onPress: fn(),
    onPlay: fn(),
    onBuy: fn(),
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
    onPress: fn(),
    onPlay: fn(),
    onBuy: fn(),
  },
};
