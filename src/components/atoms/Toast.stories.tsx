import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

// Composant Toast simplifié pour Storybook
const Toast = ({ visible, message, onDismiss }: { visible: boolean; message: string; onDismiss: () => void }) => {
  if (!visible) return null;

  const toastStyle = {
    position: 'fixed' as const,
    bottom: '20px',
    left: '20px',
    right: '20px',
    backgroundColor: '#333',
    color: 'white',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    zIndex: 1000,
  };

  const buttonStyle = {
    float: 'right' as const,
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '18px',
  };

  return (
    <div style={toastStyle}>
      {message}
      <button onClick={onDismiss} style={buttonStyle}>
        ×
      </button>
    </div>
  );
};

const meta: Meta<typeof Toast> = {
  title: 'Atoms/Toast',
  component: Toast,
  parameters: {
    docs: {
      description: {
        component: 'Composant Toast pour afficher des notifications temporaires.',
      },
    },
  },
  argTypes: {
    visible: {
      control: { type: 'boolean' },
    },
    message: {
      control: { type: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    visible: true,
    message: 'Message de notification',
    onDismiss: () => console.log('Toast dismissed'),
  },
};

export const Success: Story = {
  args: {
    visible: true,
    message: 'Opération réussie !',
    onDismiss: () => console.log('Toast dismissed'),
  },
};

export const Error: Story = {
  args: {
    visible: true,
    message: 'Une erreur est survenue',
    onDismiss: () => console.log('Toast dismissed'),
  },
};

export const WithAction: Story = {
  args: {
    visible: true,
    message: 'Fichier téléversé avec succès',
    onDismiss: () => console.log('Toast dismissed'),
  },
};

export const LongMessage: Story = {
  args: {
    visible: true,
    message:
      "Ceci est un message de notification très long qui peut s'étendre sur plusieurs lignes pour tester l'affichage",
    onDismiss: () => console.log('Toast dismissed'),
  },
};

export const Interactive: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <div>
        <button onClick={() => setVisible(true)}>Afficher Toast</button>
        <Toast visible={visible} message="Toast interactif" onDismiss={() => setVisible(false)} />
      </div>
    );
  },
};
