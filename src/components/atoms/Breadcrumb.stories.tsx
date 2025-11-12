/**
 * Breadcrumb Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import Breadcrumb, { BreadcrumbSeparator } from './Breadcrumb';
import { colors, spacing } from '../../theme';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Atoms/Breadcrumb',
  component: Breadcrumb,
  decorators: [
    Story => (
      <View
        style={{
          flex: 1,
          padding: spacing.lg,
          backgroundColor: colors.background,
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Breadcrumb par défaut
 */
export const Default: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Accueil', onPress: () => console.log('Accueil') },
        { label: 'Marketplace', onPress: () => console.log('Marketplace') },
        { label: 'Beats', onPress: () => console.log('Beats') },
        { label: 'Trap Beat 2024', isActive: true },
      ]}
    />
  ),
};

/**
 * Breadcrumb compact
 */
export const Compact: Story = {
  render: () => (
    <Breadcrumb
      variant="compact"
      items={[
        { label: 'Accueil', onPress: () => console.log('Accueil') },
        { label: 'Profil', onPress: () => console.log('Profil') },
        { label: 'Paramètres', isActive: true },
      ]}
    />
  ),
};

/**
 * Breadcrumb avec beaucoup d'items
 */
export const ManyItems: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Accueil', onPress: () => console.log('Accueil') },
        { label: 'Marketplace', onPress: () => console.log('Marketplace') },
        { label: 'Beats', onPress: () => console.log('Beats') },
        { label: 'Trap', onPress: () => console.log('Trap') },
        { label: 'Trap Beat 2024', onPress: () => console.log('Trap Beat 2024') },
        { label: 'Détails', isActive: true },
      ]}
    />
  ),
};

/**
 * Breadcrumb avec maxItems (ellipsis)
 */
export const WithMaxItems: Story = {
  render: () => (
    <Breadcrumb
      maxItems={4}
      items={[
        { label: 'Accueil', onPress: () => console.log('Accueil') },
        { label: 'Marketplace', onPress: () => console.log('Marketplace') },
        { label: 'Beats', onPress: () => console.log('Beats') },
        { label: 'Trap', onPress: () => console.log('Trap') },
        { label: 'Trap Beat 2024', onPress: () => console.log('Trap Beat 2024') },
        { label: 'Détails', isActive: true },
      ]}
    />
  ),
};

/**
 * Breadcrumb avec séparateur personnalisé
 */
export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb
      separator={
        <BreadcrumbSeparator>
          <Text style={{ color: colors.primary }}>/</Text>
        </BreadcrumbSeparator>
      }
      items={[
        { label: 'Accueil', onPress: () => console.log('Accueil') },
        { label: 'Marketplace', onPress: () => console.log('Marketplace') },
        { label: 'Beats', isActive: true },
      ]}
    />
  ),
};

/**
 * Breadcrumb simple (2 items)
 */
export const Simple: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Accueil', onPress: () => console.log('Accueil') },
        { label: 'Profil', isActive: true },
      ]}
    />
  ),
};

/**
 * Breadcrumb avec items non-cliquables
 */
export const NonClickable: Story = {
  render: () => (
    <Breadcrumb items={[{ label: 'Accueil' }, { label: 'Marketplace' }, { label: 'Beats', isActive: true }]} />
  ),
};
