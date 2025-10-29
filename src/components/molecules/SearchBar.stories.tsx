import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { SearchBar } from './SearchBar';
import { PaperProvider } from 'react-native-paper';
import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { theme } from '../../theme';

const meta: Meta<typeof SearchBar> = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
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
    placeholder: { control: 'text' },
    value: { control: 'text' },
    onChangeText: { action: 'text changed' },
    onSearch: { action: 'searched' },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' },
  },
  args: {
    placeholder: 'Rechercher beats, artistes, services...',
    value: '',
  },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

const InteractiveWrapper = ({ initialValue = '', ...args }: any) => {
  const [value, setValue] = useState(initialValue);

  return <SearchBar {...args} value={value} onChangeText={setValue} />;
};

export const Default: Story = {
  render: args => <InteractiveWrapper {...args} />,
  args: {
    value: '',
  },
};

export const WithValue: Story = {
  render: args => <InteractiveWrapper {...args} initialValue="Trap Beat" />,
  args: {
    value: 'Trap Beat',
  },
};

export const CustomPlaceholder: Story = {
  render: args => <InteractiveWrapper {...args} />,
  args: {
    placeholder: 'Rechercher des beats spécifiques...',
  },
};

export const Focused: Story = {
  render: args => <InteractiveWrapper {...args} />,
  args: {
    value: '',
  },
  play: async ({ canvasElement }) => {
    // Simulate focus
    const input = canvasElement.querySelector('[data-testid*="input"]') as any;
    if (input && typeof input.focus === 'function') {
      input.focus();
    }
  },
};

export const WithLongText: Story = {
  render: args => (
    <InteractiveWrapper {...args} initialValue="This is a very long search query that should be handled properly" />
  ),
  args: {
    value: 'This is a very long search query that should be handled properly',
  },
};

export const EmptyState: Story = {
  render: args => <InteractiveWrapper {...args} />,
  args: {
    value: '',
    placeholder: 'Commencez à taper pour rechercher...',
  },
};

export const SearchStates: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <SearchBar value="" onChangeText={() => {}} placeholder="Rechercher..." />
      <SearchBar value="Trap" onChangeText={() => {}} placeholder="Rechercher..." />
      <SearchBar value="Hip-Hop Beat" onChangeText={() => {}} placeholder="Rechercher..." />
    </View>
  ),
};

export const AllInteractions: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <View style={{ gap: 20 }}>
        <SearchBar
          value={value}
          onChangeText={setValue}
          onSearch={query => console.log('Search:', query)}
          onFocus={() => console.log('Focused')}
          onBlur={() => console.log('Blurred')}
          placeholder="Test all interactions..."
        />
        <View style={{ padding: 10, backgroundColor: theme.colors.surfaceVariant, borderRadius: 8 }}>
          <Text style={{ color: theme.colors.onSurfaceVariant }}>Current value: "{value}"</Text>
        </View>
      </View>
    );
  },
};
