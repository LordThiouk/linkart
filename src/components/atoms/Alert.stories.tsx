/**
 * Alert Stories
 * Version: 2.0 - Design System
 *
 * Storybook stories pour tous les variants de l'Alert
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import Alert from './Alert';
import { colors, spacing } from '../../theme';

const meta = {
  title: 'Atoms/Alert',
  component: Alert,
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
      options: ['default', 'destructive', 'success', 'warning', 'info'],
      description: "Style variant de l'alert",
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Alert par défaut
 */
export const Default: Story = {
  args: {
    title: 'Information',
    description: 'Ceci est un message informatif',
  },
};

/**
 * Alert destructive (erreur)
 */
export const Destructive: Story = {
  args: {
    title: 'Erreur',
    description: 'Une erreur est survenue lors du traitement',
    variant: 'destructive',
  },
};

/**
 * Alert success
 */
export const Success: Story = {
  args: {
    title: 'Succès',
    description: 'Votre beat a été publié avec succès',
    variant: 'success',
  },
};

/**
 * Alert warning
 */
export const Warning: Story = {
  args: {
    title: 'Attention',
    description: 'Vérifiez les informations avant de continuer',
    variant: 'warning',
  },
};

/**
 * Alert info
 */
export const Info: Story = {
  args: {
    title: 'Information',
    description: 'Une nouvelle version est disponible',
    variant: 'info',
  },
};

/**
 * Alert sans titre
 */
export const NoTitle: Story = {
  args: {
    description: 'Message sans titre',
    variant: 'default',
  },
};

/**
 * Alert avec icône
 */
export const WithIcon: Story = {
  args: {
    title: 'Avec icône',
    description: 'Alert avec une icône personnalisée',
    icon: <Text style={{ fontSize: 20 }}>✓</Text>,
    variant: 'success',
  },
};

/**
 * Alerts tous variants
 */
export const AllVariants: Story = {
  args: { title: '' },
  render: () => (
    <View style={{ gap: spacing.md }}>
      <Alert title="Default" description="Message par défaut" variant="default" />
      <Alert title="Succès" description="Opération réussie" variant="success" />
      <Alert title="Avertissement" description="Attention requise" variant="warning" />
      <Alert title="Erreur" description="Une erreur est survenue" variant="destructive" />
      <Alert title="Information" description="Information importante" variant="info" />
    </View>
  ),
};

/**
 * Alert paiement succès
 */
export const PaymentSuccess: Story = {
  args: {
    title: 'Paiement réussi',
    description: 'Votre achat a été confirmé. Vous pouvez maintenant télécharger le beat.',
    variant: 'success',
    icon: <Text style={{ fontSize: 20 }}>✓</Text>,
  },
};

/**
 * Alert upload erreur
 */
export const UploadError: Story = {
  args: {
    title: 'Échec du téléversement',
    description: 'Le fichier est trop volumineux. Taille maximale : 50 MB',
    variant: 'destructive',
    icon: <Text style={{ fontSize: 20 }}>✕</Text>,
  },
};

/**
 * Alert vérification compte
 */
export const AccountVerification: Story = {
  args: {
    title: 'Vérification requise',
    description: 'Veuillez vérifier votre email pour activer votre compte',
    variant: 'warning',
    icon: <Text style={{ fontSize: 20 }}>⚠️</Text>,
  },
};

/**
 * Alert nouveau beat
 */
export const NewBeatNotification: Story = {
  args: {
    title: 'Nouveau beat disponible',
    description: 'Un producteur que vous suivez a publié un nouveau beat',
    variant: 'info',
    icon: <Text style={{ fontSize: 20 }}>🔔</Text>,
  },
};
