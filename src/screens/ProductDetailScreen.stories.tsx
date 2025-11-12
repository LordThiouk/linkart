import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProductDetailScreen } from './ProductDetailScreen';

const meta: Meta<typeof ProductDetailScreen> = {
  title: 'Screens/ProductDetailScreen',
  component: ProductDetailScreen,
  decorators: [Story => <Story />],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ProductDetailScreen>;

export const Default: Story = {
  args: {},
};

export const WithProduct: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Écran de détail produit avec player, métriques et options d'achat.",
      },
    },
  },
};

export const WithReviews: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Produit avec avis et évaluations des utilisateurs.',
      },
    },
  },
};
