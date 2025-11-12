import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProductsScreen } from './ProductsScreen';

const meta: Meta<typeof ProductsScreen> = {
  title: 'Screens/ProductsScreen',
  component: ProductsScreen,
  decorators: [Story => <Story />],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithProducts: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Écran de liste des produits avec filtres et recherche.',
      },
    },
  },
};

export const Empty: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "État vide quand aucun produit n'est trouvé.",
      },
    },
  },
};
