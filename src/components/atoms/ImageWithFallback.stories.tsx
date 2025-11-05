/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ImageWithFallback } from './ImageWithFallback';
import { View } from 'react-native';
import React from 'react';

const meta: Meta<typeof ImageWithFallback> = {
  title: 'Atoms/ImageWithFallback',
  component: ImageWithFallback,
  decorators: [
    Story => (
      <View style={{ padding: 20, backgroundColor: '#0A0A0A', minHeight: 200 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    style: { control: 'object' },
  },
  args: {
    src: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    alt: 'Cover image',
  },
};

export default meta;

type Story = StoryObj<typeof ImageWithFallback>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    alt: 'Beat cover',
    style: { width: 200, height: 200, borderRadius: 16 },
  },
};

export const Square: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    alt: 'Square image',
    style: { width: 150, height: 150, borderRadius: 12 },
  },
};

export const Circle: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    alt: 'Avatar',
    style: { width: 80, height: 80, borderRadius: 40 },
  },
};

export const Fallback: Story = {
  args: {
    src: 'https://invalid-url-that-will-fail.com/image.jpg',
    alt: 'Fallback image',
    style: { width: 200, height: 200, borderRadius: 16 },
  },
};

export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400"
        alt="Small"
        style={{ width: 100, height: 100, borderRadius: 8 }}
      />
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400"
        alt="Medium"
        style={{ width: 200, height: 200, borderRadius: 16 }}
      />
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400"
        alt="Large"
        style={{ width: 300, height: 300, borderRadius: 24 }}
      />
    </View>
  ),
};
