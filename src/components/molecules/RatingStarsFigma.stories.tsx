/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { RatingStarsFigma } from './RatingStarsFigma';
import { View } from 'react-native';
import React from 'react';

const meta: Meta<typeof RatingStarsFigma> = {
  title: 'Molecules/RatingStarsFigma',
  component: RatingStarsFigma,
  decorators: [
    Story => (
      <View style={{ padding: 20, backgroundColor: '#0A0A0A', minHeight: 200 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    rating: { control: { type: 'range', min: 0, max: 5, step: 0.1 } },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showNumber: { control: 'boolean' },
    reviewCount: { control: 'number' },
  },
  args: {
    rating: 4.8,
    size: 'md',
    showNumber: false,
    reviewCount: 87,
  },
};

export default meta;

type Story = StoryObj<typeof RatingStarsFigma>;

export const Default: Story = {
  args: {},
};

export const WithNumber: Story = {
  args: {
    showNumber: true,
    reviewCount: 87,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    rating: 4.5,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    rating: 5.0,
    showNumber: true,
  },
};

export const AllRatings: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <RatingStarsFigma rating={5.0} size="md" showNumber={true} reviewCount={100} />
      <RatingStarsFigma rating={4.5} size="md" showNumber={true} reviewCount={50} />
      <RatingStarsFigma rating={4.0} size="md" showNumber={true} reviewCount={25} />
      <RatingStarsFigma rating={3.5} size="md" showNumber={true} reviewCount={10} />
      <RatingStarsFigma rating={3.0} size="md" showNumber={true} reviewCount={5} />
      <RatingStarsFigma rating={2.5} size="md" showNumber={true} />
      <RatingStarsFigma rating={2.0} size="md" showNumber={true} />
      <RatingStarsFigma rating={1.5} size="md" showNumber={true} />
      <RatingStarsFigma rating={1.0} size="md" showNumber={true} />
    </View>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <RatingStarsFigma rating={4.8} size="sm" showNumber={true} />
      <RatingStarsFigma rating={4.8} size="md" showNumber={true} />
      <RatingStarsFigma rating={4.8} size="lg" showNumber={true} />
    </View>
  ),
};
