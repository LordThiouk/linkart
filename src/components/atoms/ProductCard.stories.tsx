/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProductCard } from './ProductCard';
import { PaperProvider } from 'react-native-paper';
import { View } from 'react-native';
import React from 'react';
import { theme } from '../../theme';

const meta: Meta<typeof ProductCard> = {
  title: 'Atoms/ProductCard',
  component: ProductCard,
  decorators: [
    Story => (
      <PaperProvider theme={theme}>
        <View style={{ padding: 20, backgroundColor: theme.colors.background }}>
          <Story />
        </View>
      </PaperProvider>
    ),
  ],
  argTypes: {
    id: { control: 'text' },
    title: { control: 'text' },
    artist: { control: 'text' },
    price: { control: 'number' },
    imageUrl: { control: 'text' },
    viewCount: { control: 'number' },
    downloadCount: { control: 'number' },
    likeCount: { control: 'number' },
    onPress: { action: 'pressed' },
    onPlay: { action: 'played' },
  },
  args: {
    id: 'product-123',
    title: 'Trap Beat 2025',
    artist: 'BeatMaster',
    price: 25000,
    imageUrl: 'https://i.pravatar.cc/300?img=68',
    viewCount: 1250,
    downloadCount: 42,
    likeCount: 89,
  },
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

const InteractiveWrapper = ({ ...args }: any) => {
  return <ProductCard {...args} onPress={() => {}} onPlay={() => {}} />;
};

export const Default: Story = {
  render: args => <InteractiveWrapper {...args} />,
};

export const Favorited: Story = {
  render: args => <InteractiveWrapper {...args} />,
};

export const WithPlayButton: Story = {
  render: args => <InteractiveWrapper {...args} />,
};

export const HighMetrics: Story = {
  render: args => <InteractiveWrapper {...args} />,
};

export const ZeroMetrics: Story = {
  render: args => <InteractiveWrapper {...args} />,
};

export const ExpensiveBeat: Story = {
  render: args => <InteractiveWrapper {...args} />,
};

export const LongTitle: Story = {
  render: args => <InteractiveWrapper {...args} />,
};

export const GridLayout: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
      <View style={{ flex: 1, minWidth: 150 }}>
        <ProductCard
          id="1"
          title="Trap Beat"
          artist="Producer 1"
          price={25000}
          imageUrl="https://i.pravatar.cc/300?img=1"
          viewCount={1250}
          downloadCount={42}
          likeCount={89}
          onPress={() => {}}
        />
      </View>
      <View style={{ flex: 1, minWidth: 150 }}>
        <ProductCard
          id="2"
          title="Hip-Hop Beat"
          artist="Producer 2"
          price={30000}
          imageUrl="https://i.pravatar.cc/300?img=2"
          viewCount={2500}
          downloadCount={75}
          likeCount={150}
          onPress={() => {}}
        />
      </View>
    </View>
  ),
};

export const AllStates: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <ProductCard
        id="1"
        title="New Beat"
        artist="New Producer"
        price={20000}
        imageUrl="https://i.pravatar.cc/300?img=3"
        viewCount={0}
        downloadCount={0}
        likeCount={0}
        onPress={() => {}}
      />
      <ProductCard
        id="2"
        title="Popular Beat"
        artist="Popular Producer"
        price={50000}
        imageUrl="https://i.pravatar.cc/300?img=4"
        viewCount={100000}
        downloadCount={500}
        likeCount={2000}
        onPress={() => {}}
        onPlay={() => {}}
      />
    </View>
  ),
};
