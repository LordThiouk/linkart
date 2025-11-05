/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { MarketplaceScreenFigma } from './MarketplaceScreenFigma';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../theme';

const meta: Meta<typeof MarketplaceScreenFigma> = {
  title: 'Screens/MarketplaceScreenFigma',
  component: MarketplaceScreenFigma,
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
  argTypes: {
    onProductClick: { action: 'productClick' },
    onServiceClick: { action: 'serviceClick' },
    onSearch: { action: 'search' },
  },
};

export default meta;
type Story = StoryObj<typeof MarketplaceScreenFigma>;

export const Default: Story = {
  args: {
    onProductClick: () => {},
    onServiceClick: () => {},
    onSearch: () => {},
  },
};

export const ProductsTab: Story = {
  args: {
    onProductClick: () => {},
    onServiceClick: () => {},
    onSearch: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Marketplace avec onglet produits, filtres et grille de produits.',
      },
    },
  },
};

export const ServicesTab: Story = {
  args: {
    onProductClick: () => {},
    onServiceClick: () => {},
    onSearch: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Marketplace avec onglet services, catégories et liste de services.',
      },
    },
  },
};
