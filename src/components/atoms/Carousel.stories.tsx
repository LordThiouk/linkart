/**
 * Carousel Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import Carousel from './Carousel';
import { colors, spacing, radii } from '../../theme';
import Card from './Card';

const meta: Meta<typeof Carousel> = {
  title: 'Atoms/Carousel',
  component: Carousel,
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

// Données de test
const beats = [
  { id: '1', title: 'Trap Beat 2024', artist: 'Producer X', price: 25000 },
  { id: '2', title: 'Afrobeat Kit', artist: 'Producer Y', price: 15000 },
  { id: '3', title: 'Drill Sample Pack', artist: 'Producer Z', price: 30000 },
  { id: '4', title: 'R&B Melody', artist: 'Producer A', price: 20000 },
  { id: '5', title: 'Hip-Hop Loop', artist: 'Producer B', price: 18000 },
];

/**
 * Carousel par défaut
 */
export const Default: Story = {
  render: () => (
    <Carousel
      data={beats}
      renderItem={item => (
        <View
          style={{
            backgroundColor: colors.surface,
            padding: spacing.lg,
            borderRadius: radii.lg,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.textPrimary, fontSize: 18, fontWeight: '600' }}>{item.title}</Text>
          <Text style={{ color: colors.textMuted, fontSize: 14, marginTop: spacing.xs }}>{item.artist}</Text>
          <Text style={{ color: colors.golden, fontSize: 16, fontWeight: '600', marginTop: spacing.sm }}>
            {item.price.toLocaleString('fr-FR')} F
          </Text>
        </View>
      )}
    />
  ),
};

/**
 * Carousel avec variant card
 */
export const CardVariant: Story = {
  render: () => (
    <Carousel
      data={beats}
      variant="card"
      renderItem={item => (
        <Card>
          <View style={{ padding: spacing.lg }}>
            <Text style={{ color: colors.textPrimary, fontSize: 18, fontWeight: '600' }}>{item.title}</Text>
            <Text style={{ color: colors.textMuted, fontSize: 14, marginTop: spacing.xs }}>{item.artist}</Text>
            <Text style={{ color: colors.golden, fontSize: 16, fontWeight: '600', marginTop: spacing.sm }}>
              {item.price.toLocaleString('fr-FR')} F
            </Text>
          </View>
        </Card>
      )}
    />
  ),
};

/**
 * Carousel avec auto-play
 */
export const Autoplay: Story = {
  render: () => (
    <Carousel
      data={beats}
      autoplay
      autoplayInterval={2000}
      renderItem={item => (
        <View
          style={{
            backgroundColor: colors.surface,
            padding: spacing.lg,
            borderRadius: radii.lg,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.textPrimary, fontSize: 18, fontWeight: '600' }}>{item.title}</Text>
          <Text style={{ color: colors.textMuted, fontSize: 14, marginTop: spacing.xs }}>{item.artist}</Text>
        </View>
      )}
    />
  ),
};

/**
 * Carousel sans indicateurs
 */
export const WithoutIndicators: Story = {
  render: () => (
    <Carousel
      data={beats}
      showIndicators={false}
      renderItem={item => (
        <View
          style={{
            backgroundColor: colors.surface,
            padding: spacing.lg,
            borderRadius: radii.lg,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.textPrimary, fontSize: 18, fontWeight: '600' }}>{item.title}</Text>
        </View>
      )}
    />
  ),
};

/**
 * Carousel avec hauteur fixe
 */
export const WithHeight: Story = {
  render: () => (
    <Carousel
      data={beats}
      height={250}
      renderItem={item => (
        <View
          style={{
            backgroundColor: colors.surface,
            padding: spacing.lg,
            borderRadius: radii.lg,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.textPrimary, fontSize: 18, fontWeight: '600' }}>{item.title}</Text>
          <Text style={{ color: colors.textMuted, fontSize: 14, marginTop: spacing.xs }}>{item.artist}</Text>
        </View>
      )}
    />
  ),
};

/**
 * Carousel avec items larges
 */
export const LargeItems: Story = {
  render: () => (
    <Carousel
      data={beats}
      itemWidth={300}
      itemSpacing={spacing.lg}
      renderItem={item => (
        <View
          style={{
            backgroundColor: colors.surface,
            padding: spacing.xl,
            borderRadius: radii.lg,
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.textPrimary, fontSize: 20, fontWeight: '600' }}>{item.title}</Text>
          <Text style={{ color: colors.textMuted, fontSize: 16, marginTop: spacing.sm }}>{item.artist}</Text>
          <Text style={{ color: colors.golden, fontSize: 18, fontWeight: '600', marginTop: spacing.md }}>
            {item.price.toLocaleString('fr-FR')} F
          </Text>
        </View>
      )}
    />
  ),
};
