/**
 * Card Stories
 * Version: 2.0 - Design System
 *
 * Storybook stories pour tous les variants du Card
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from './Card';
import Button from './Button';
import { colors } from '../../theme';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  decorators: [
    Story => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          padding: 20,
          backgroundColor: colors.background,
        }}
      >
        <View style={{ width: '100%', maxWidth: 400 }}>
          <Story />
        </View>
      </View>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outline'],
      description: 'Style variant du card',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du padding',
    },
    withShadow: {
      control: 'boolean',
      description: 'Avec ombre portée',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Card par défaut
 */
export const Default: Story = {
  args: {
    children: <Text style={{ color: colors.textPrimary }}>Contenu de la card</Text>,
  },
};

/**
 * Card avec header et footer
 */
export const WithHeaderFooter: Story = {
  args: {
    children: <Text style={{ color: colors.textPrimary }}>Contenu de la card</Text>,
  },
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Beat Premium</CardTitle>
        <CardDescription>Un beat trap moderne avec des 808 percutants</CardDescription>
      </CardHeader>
      <CardContent>
        <Text style={{ color: colors.textSecondary }}>BPM: 140 • Genre: Trap • Durée: 3:45</Text>
      </CardContent>
      <CardFooter>
        <Button title="Écouter" variant="primary" size="sm" onPress={() => {}} />
      </CardFooter>
    </Card>
  ),
};

/**
 * Card variant elevated
 */
export const Elevated: Story = {
  args: {
    children: <Text style={{ color: colors.textPrimary }}>Contenu de la card</Text>,
  },
  render: () => (
    <Card variant="elevated" withShadow>
      <CardHeader>
        <CardTitle>Studio Session</CardTitle>
        <CardDescription>Réservez votre session d'enregistrement</CardDescription>
      </CardHeader>
      <CardContent>
        <Text style={{ color: colors.textSecondary }}>Disponible: Lundi - Vendredi</Text>
      </CardContent>
    </Card>
  ),
};

/**
 * Card variant outline
 */
export const Outline: Story = {
  args: {
    children: <Text style={{ color: colors.textPrimary }}>Contenu de la card</Text>,
  },
  render: () => (
    <Card variant="outline">
      <CardHeader>
        <CardTitle>Promo Limitée</CardTitle>
      </CardHeader>
      <CardContent>
        <Text style={{ color: colors.textSecondary }}>-30% sur tous les beats cette semaine !</Text>
      </CardContent>
    </Card>
  ),
};

/**
 * Card small
 */
export const Small: Story = {
  args: {
    size: 'sm',
    children: (
      <>
        <CardTitle>Petit Card</CardTitle>
        <Text style={{ color: colors.textSecondary }}>Padding réduit</Text>
      </>
    ),
  },
};

/**
 * Card large
 */
export const Large: Story = {
  args: {
    size: 'lg',
    children: (
      <>
        <CardTitle>Grand Card</CardTitle>
        <Text style={{ color: colors.textSecondary }}>Padding généreux</Text>
      </>
    ),
  },
};

/**
 * Card avec shadow
 */
export const WithShadow: Story = {
  args: {
    withShadow: true,
    children: (
      <>
        <CardTitle>Card avec ombre</CardTitle>
        <Text style={{ color: colors.textSecondary }}>Effet de profondeur visuel</Text>
      </>
    ),
  },
};

/**
 * Card produit (exemple complet)
 */
export const ProductCard: Story = {
  args: {
    children: <Text style={{ color: colors.textPrimary }}>Contenu de la card</Text>,
  },
  render: () => (
    <Card variant="elevated" withShadow>
      <CardHeader>
        <CardTitle>Trap Beat - "Night Rider"</CardTitle>
        <CardDescription>Un beat trap sombre et atmosphérique avec des mélodies captivantes</CardDescription>
      </CardHeader>
      <CardContent>
        <View style={{ gap: 8 }}>
          <Text style={{ color: colors.textSecondary }}>BPM: 140</Text>
          <Text style={{ color: colors.textSecondary }}>Genre: Trap</Text>
          <Text style={{ color: colors.textSecondary }}>Durée: 3:45</Text>
          <Text style={{ color: colors.golden, fontWeight: '600', fontSize: 20 }}>25,000 FCFA</Text>
        </View>
      </CardContent>
      <CardFooter>
        <Button title="Acheter" variant="primary" size="default" onPress={() => {}} fullWidth />
      </CardFooter>
    </Card>
  ),
};

/**
 * Card service (exemple)
 */
export const ServiceCard: Story = {
  args: {
    children: <Text style={{ color: colors.textPrimary }}>Contenu de la card</Text>,
  },
  render: () => (
    <Card variant="default">
      <CardHeader>
        <CardTitle>Mixage & Mastering</CardTitle>
        <CardDescription>Service professionnel de mixage et mastering pour vos morceaux</CardDescription>
      </CardHeader>
      <CardContent>
        <View style={{ gap: 8 }}>
          <Text style={{ color: colors.textSecondary }}>⏱️ Délai: 48h</Text>
          <Text style={{ color: colors.textSecondary }}>✨ Révisions illimitées</Text>
          <Text style={{ color: colors.golden, fontWeight: '600', fontSize: 18 }}>À partir de 15,000 FCFA</Text>
        </View>
      </CardContent>
      <CardFooter>
        <Button title="Réserver" variant="secondary" size="default" onPress={() => {}} fullWidth />
      </CardFooter>
    </Card>
  ),
};

/**
 * Card avec CardAction (menu/boutons en haut à droite)
 */
export const WithCardAction: Story = {
  args: {
    children: <Text style={{ color: colors.textPrimary }}>Contenu de la card</Text>,
  },
  render: () => (
    <Card variant="elevated" withShadow>
      <CardAction>
        <Button title="•••" variant="ghost" size="icon" onPress={() => console.log('Menu')} />
      </CardAction>
      <CardHeader>
        <CardTitle>Beat Premium</CardTitle>
        <CardDescription>Avec menu d'actions en haut à droite</CardDescription>
      </CardHeader>
      <CardContent>
        <Text style={{ color: colors.textSecondary }}>
          CardAction permet d'ajouter des boutons ou un menu en haut à droite de la card.
        </Text>
      </CardContent>
      <CardFooter>
        <Button title="Acheter" variant="primary" size="default" onPress={() => {}} fullWidth />
      </CardFooter>
    </Card>
  ),
};
