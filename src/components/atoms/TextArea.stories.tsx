/**
 * TextArea Stories
 * Version: 2.0 - Design System
 *
 * Storybook stories pour tous les variants du TextArea
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import TextArea from './TextArea';
import { colors } from '../../theme';

const meta = {
  title: 'Atoms/TextArea',
  component: TextArea,
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
      options: ['default', 'filled', 'outline'],
      description: 'Style variant du textarea',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Taille du textarea',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Largeur pleine',
    },
    showCharacterCount: {
      control: 'boolean',
      description: 'Afficher compteur de caractères',
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * TextArea par défaut
 */
export const Default: Story = {
  args: {
    placeholder: 'Entrez votre texte...',
  },
};

/**
 * TextArea avec label
 */
export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Décrivez votre beat...',
  },
};

/**
 * TextArea avec helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Biographie',
    placeholder: 'Parlez-nous de vous...',
    helperText: 'Cette information sera visible sur votre profil public',
  },
};

/**
 * TextArea avec erreur
 */
export const WithError: Story = {
  args: {
    label: 'Message',
    placeholder: 'Votre message...',
    error: 'Le message doit contenir au moins 10 caractères',
    value: 'Court',
  },
};

/**
 * TextArea variant filled
 */
export const Filled: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Ajoutez des notes...',
    variant: 'filled',
  },
};

/**
 * TextArea variant outline
 */
export const Outline: Story = {
  args: {
    label: 'Commentaire',
    placeholder: 'Laissez un commentaire...',
    variant: 'outline',
  },
};

/**
 * TextArea small
 */
export const Small: Story = {
  args: {
    label: 'Petit textarea',
    placeholder: 'Texte...',
    size: 'sm',
    rows: 3,
  },
};

/**
 * TextArea large
 */
export const Large: Story = {
  args: {
    label: 'Grand textarea',
    placeholder: 'Texte...',
    size: 'lg',
    rows: 6,
  },
};

/**
 * TextArea désactivé
 */
export const Disabled: Story = {
  args: {
    label: 'TextArea désactivé',
    placeholder: 'Non éditable',
    disabled: true,
    value: 'Ce texte ne peut pas être modifié',
  },
};

/**
 * TextArea pleine largeur
 */
export const FullWidth: Story = {
  args: {
    label: 'Description complète',
    placeholder: 'Décrivez votre projet en détail...',
    fullWidth: true,
    rows: 6,
  },
};

/**
 * TextArea avec compteur de caractères
 */
export const WithCharacterCount: Story = {
  args: {
    label: 'Titre du beat',
    placeholder: 'Entrez un titre...',
    showCharacterCount: true,
    maxLength: 100,
    value: 'Mon Super Beat Trap 2025',
  },
};

/**
 * TextArea avec limite de caractères
 */
export const WithMaxLength: Story = {
  args: {
    label: 'Bio courte',
    placeholder: 'Bio courte...',
    maxLength: 160,
    showCharacterCount: true,
    helperText: 'Maximum 160 caractères',
  },
};

/**
 * TextArea de description de produit
 */
export const ProductDescription: Story = {
  args: {
    label: 'Description du beat',
    placeholder: 'Décrivez les caractéristiques de votre beat...',
    helperText: "Mentionnez le style, l'ambiance, les instruments utilisés",
    rows: 6,
    fullWidth: true,
    showCharacterCount: true,
    maxLength: 500,
  },
};

/**
 * TextArea de message
 */
export const MessageBox: Story = {
  args: {
    label: 'Message au vendeur',
    placeholder: 'Posez vos questions...',
    variant: 'outline',
    rows: 4,
    fullWidth: true,
  },
};

/**
 * TextArea de feedback
 */
export const FeedbackBox: Story = {
  args: {
    label: 'Votre avis',
    placeholder: 'Partagez votre expérience...',
    variant: 'filled',
    rows: 5,
    showCharacterCount: true,
    maxLength: 300,
    helperText: "Votre avis aidera d'autres utilisateurs",
  },
};
