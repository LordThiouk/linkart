import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ProfileTabs } from './ProfileTabs';
import { Music, Headphones, TrendingUp } from 'lucide-react-native';

const tabs = [
  { id: 'beats' as const, label: 'Beats', icon: Music },
  { id: 'services' as const, label: 'Services', icon: Headphones },
  { id: 'stats' as const, label: 'Stats', icon: TrendingUp },
];

const InteractiveWrapper: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'beats' | 'services' | 'stats'>('beats');

  return <ProfileTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />;
};

const meta: Meta<typeof ProfileTabs> = {
  title: 'Features/Profile/ProfileTabs',
  component: ProfileTabs,
  decorators: [
    Story => (
      <View style={{ padding: 16, backgroundColor: '#0A0A0A' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfileTabs>;

export const Default: Story = {
  render: () => <InteractiveWrapper />,
};

export const BeatsActive: Story = {
  args: {
    tabs,
    activeTab: 'beats',
    onTabChange: tab => console.log('Tab changed:', tab),
  },
};

export const ServicesActive: Story = {
  args: {
    tabs,
    activeTab: 'services',
    onTabChange: tab => console.log('Tab changed:', tab),
  },
};

export const StatsActive: Story = {
  args: {
    tabs,
    activeTab: 'stats',
    onTabChange: tab => console.log('Tab changed:', tab),
  },
};
