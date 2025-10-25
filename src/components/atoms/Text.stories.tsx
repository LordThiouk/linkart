import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    docs: {
      description: {
        component: 'Composant Text pour afficher du texte avec différentes variantes et styles.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['body1', 'body2', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    color: {
      control: { type: 'color' },
    },
    style: {
      control: { type: 'object' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: 'Texte par défaut',
    variant: 'bodyMedium',
  },
};

export const Heading1: Story = {
  args: {
    children: 'Titre Principal',
    variant: 'headlineLarge',
  },
};

export const Heading2: Story = {
  args: {
    children: 'Sous-titre',
    variant: 'headlineMedium',
  },
};

export const Body1: Story = {
  args: {
    children: 'Texte de corps principal',
    variant: 'bodyMedium',
  },
};

export const Body2: Story = {
  args: {
    children: 'Texte de corps secondaire',
    variant: 'body2',
  },
};

export const Caption: Story = {
  args: {
    children: 'Texte de légende',
    variant: 'caption',
  },
};

export const Colored: Story = {
  args: {
    children: 'Texte coloré',
    variant: 'bodyMedium',
    color: '#1E40AF',
  },
};

export const Bold: Story = {
  args: {
    children: 'Texte en gras',
    variant: 'bodyMedium',
    style: { fontWeight: 'bold' },
  },
};

export const Italic: Story = {
  args: {
    children: 'Texte en italique',
    variant: 'bodyMedium',
    style: { fontStyle: 'italic' },
  },
};
