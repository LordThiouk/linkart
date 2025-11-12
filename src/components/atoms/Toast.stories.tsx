/**
 * Toast Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { useState } from 'react';
import Toast from './Toast';
import { colors, spacing } from '../../theme';
import Button from './Button';

const meta: Meta<typeof Toast> = {
  title: 'Atoms/Toast',
  component: Toast,
  decorators: [
    Story => (
      <View
        style={{
          flex: 1,
          padding: spacing.lg,
          backgroundColor: colors.background,
          justifyContent: 'center',
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
 * Toast Success
 */
export const Success: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <View>
        <Button title="Afficher Toast Success" onPress={() => setVisible(true)} />
        {visible && (
          <Toast
            message="Votre produit a été publié avec succès !"
            variant="success"
            onDismiss={() => setVisible(false)}
          />
        )}
      </View>
    );
  },
};

/**
 * Toast Error
 */
export const Error: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <View>
        <Button title="Afficher Toast Error" onPress={() => setVisible(true)} />
        {visible && (
          <Toast
            message="Une erreur est survenue lors de l'upload"
            variant="error"
            onDismiss={() => setVisible(false)}
          />
        )}
      </View>
    );
  },
};

/**
 * Toast Warning
 */
export const Warning: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <View>
        <Button title="Afficher Toast Warning" onPress={() => setVisible(true)} />
        {visible && (
          <Toast message="Votre session expire dans 5 minutes" variant="warning" onDismiss={() => setVisible(false)} />
        )}
      </View>
    );
  },
};

/**
 * Toast Info
 */
export const Info: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <View>
        <Button title="Afficher Toast Info" onPress={() => setVisible(true)} />
        {visible && <Toast message="Nouveau message reçu" variant="info" onDismiss={() => setVisible(false)} />}
      </View>
    );
  },
};

/**
 * Toast Default
 */
export const Default: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <View>
        <Button title="Afficher Toast Default" onPress={() => setVisible(true)} />
        {visible && <Toast message="Notification par défaut" variant="default" onDismiss={() => setVisible(false)} />}
      </View>
    );
  },
};

/**
 * Toast avec Action
 */
export const WithAction: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <View>
        <Button title="Afficher Toast avec Action" onPress={() => setVisible(true)} />
        {visible && (
          <Toast
            message="Fichier téléchargé avec succès"
            variant="success"
            action={{
              label: 'Ouvrir',
              onPress: () => {
                console.log('Action pressed');
                setVisible(false);
              },
            }}
            onDismiss={() => setVisible(false)}
          />
        )}
      </View>
    );
  },
};

/**
 * Toast Position Top
 */
export const PositionTop: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <View>
        <Button title="Afficher Toast en haut" onPress={() => setVisible(true)} />
        {visible && (
          <Toast message="Toast en position haute" variant="info" position="top" onDismiss={() => setVisible(false)} />
        )}
      </View>
    );
  },
};

/**
 * Toast sans Icône
 */
export const WithoutIcon: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <View>
        <Button title="Afficher Toast sans Icône" onPress={() => setVisible(true)} />
        {visible && (
          <Toast message="Toast sans icône" variant="default" showIcon={false} onDismiss={() => setVisible(false)} />
        )}
      </View>
    );
  },
};

/**
 * Toast Persistant (duration = 0)
 */
export const Persistent: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <View>
        <Button title="Afficher Toast Persistant" onPress={() => setVisible(true)} />
        {visible && (
          <Toast
            message="Ce toast ne se ferme pas automatiquement"
            variant="warning"
            duration={0}
            onDismiss={() => setVisible(false)}
          />
        )}
      </View>
    );
  },
};
