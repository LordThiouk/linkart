/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { WaveformVisualizer } from './WaveformVisualizer';
import { View } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';

const meta: Meta<typeof WaveformVisualizer> = {
  title: 'Molecules/WaveformVisualizer',
  component: WaveformVisualizer,
  decorators: [
    Story => (
      <View style={{ padding: 20, backgroundColor: '#0A0A0A', minHeight: 200 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    isPlaying: { control: 'boolean' },
    bars: { control: 'number' },
    height: { control: 'number' },
    compact: { control: 'boolean' },
  },
  args: {
    isPlaying: false,
    bars: 60,
    height: 60,
    compact: false,
  },
};

export default meta;

type Story = StoryObj<typeof WaveformVisualizer>;

const InteractiveWaveform = ({
  bars = 60,
  height = 60,
  compact = false,
}: {
  bars?: number;
  height?: number;
  compact?: boolean;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <View style={{ gap: 16 }}>
      <TouchableOpacity
        onPress={() => setIsPlaying(!isPlaying)}
        style={{
          padding: 12,
          backgroundColor: '#6366F1',
          borderRadius: 8,
          alignSelf: 'flex-start',
        }}
      >
        <Text style={{ color: '#F5F5F5' }}>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
      <WaveformVisualizer isPlaying={isPlaying} bars={bars} height={height} compact={compact} />
    </View>
  );
};

export const Default: Story = {
  render: args => <InteractiveWaveform {...args} />,
};

export const Playing: Story = {
  args: {
    isPlaying: true,
  },
};

export const Compact: Story = {
  args: {
    compact: true,
    bars: 40,
    height: 40,
  },
};

export const MoreBars: Story = {
  args: {
    bars: 80,
    height: 80,
  },
};

export const Tall: Story = {
  args: {
    bars: 60,
    height: 120,
  },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View>
        <Text style={{ color: '#F5F5F5', marginBottom: 8 }}>Default (60 bars, 60px)</Text>
        <WaveformVisualizer isPlaying={false} bars={60} height={60} />
      </View>
      <View>
        <Text style={{ color: '#F5F5F5', marginBottom: 8 }}>Playing (60 bars, 60px)</Text>
        <WaveformVisualizer isPlaying={true} bars={60} height={60} />
      </View>
      <View>
        <Text style={{ color: '#F5F5F5', marginBottom: 8 }}>Compact (40 bars, 40px)</Text>
        <WaveformVisualizer isPlaying={false} bars={40} height={40} compact={true} />
      </View>
      <View>
        <Text style={{ color: '#F5F5F5', marginBottom: 8 }}>More bars (80 bars, 60px)</Text>
        <WaveformVisualizer isPlaying={true} bars={80} height={60} />
      </View>
    </View>
  ),
};
