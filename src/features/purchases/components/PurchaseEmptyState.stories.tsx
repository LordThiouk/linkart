import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PurchaseEmptyState } from './PurchaseEmptyState';

const meta: Meta<typeof PurchaseEmptyState> = {
  title: 'Features/Purchases/PurchaseEmptyState',
  component: PurchaseEmptyState,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PurchaseEmptyState>;

export const Default: Story = {
  args: {},
};

export const Custom: Story = {
  args: {
    title: 'Aucun achat trouvé',
    subtitle: 'Commencez à acheter des beats pour les voir ici',
  },
};
