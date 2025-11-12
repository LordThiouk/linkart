import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { TabBar } from './TabBar';
import { useState } from 'react';

const meta: Meta<typeof TabBar> = {
  title: 'Organisms/TabBar',
  component: TabBar,
  decorators: [
    Story => (
      <View style={{ width: '100%', height: 80, justifyContent: 'flex-end' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    // On ne contrôle plus les props via Storybook, mais via l'état local
  },
};

export default meta;

type Story = StoryObj<typeof TabBar>;

// On crée une Story qui gère son propre état, comme le ferait un vrai navigateur
export const Default: Story = {
  render: () => {
    const [index, setIndex] = useState(0);

    const routes = [
      { key: 'home', title: 'Accueil', icon: 'home' },
      { key: 'search', title: 'Recherche', icon: 'magnify' },
      { key: 'upload', title: 'Publier', icon: 'plus-circle' },
      { key: 'wallet', title: 'Portefeuille', icon: 'wallet' },
      { key: 'profile', title: 'Profil', icon: 'account' },
    ];

    return (
      <TabBar
        navigationState={{ index, routes }}
        onTabPress={route => {
          const newIndex = routes.findIndex(r => r.key === route.key);
          setIndex(newIndex);
        }}
      />
    );
  },
};
