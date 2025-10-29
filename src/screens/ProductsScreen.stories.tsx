import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProductsScreen } from './ProductsScreen';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../theme';

const meta: Meta<typeof ProductsScreen> = {
  title: 'Screens/ProductsScreen',
  component: ProductsScreen,
  decorators: [
    Story => (
      <PaperProvider theme={theme}>
        <Story />
      </PaperProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ProductsScreen>;

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
