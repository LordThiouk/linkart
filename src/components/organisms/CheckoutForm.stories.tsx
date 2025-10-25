import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckoutForm } from './CheckoutForm';

const meta: Meta<typeof CheckoutForm> = {
  title: 'Organisms/CheckoutForm',
  component: CheckoutForm,
  parameters: {
    docs: {
      description: {
        component: 'Formulaire de checkout avec sélection de méthode de paiement.',
      },
    },
  },
  argTypes: {
    productName: {
      control: { type: 'text' },
    },
    price: {
      control: { type: 'number' },
    },
    currency: {
      control: { type: 'text' },
    },
    paymentMethods: {
      control: { type: 'object' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    onSubmit: {
      action: 'onSubmit',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CheckoutForm>;

const mockPaymentMethods = [
  {
    id: 'wave',
    name: 'Wave',
    type: 'wave' as const,
    icon: '🌊',
    fee: 0,
  },
  {
    id: 'orange_money',
    name: 'Orange Money',
    type: 'orange_money' as const,
    icon: '🍊',
    fee: 0,
  },
];

export const Default: Story = {
  args: {
    productName: 'Afrobeat Instrumental',
    price: 15000,
    currency: 'FCFA',
    paymentMethods: mockPaymentMethods,
    loading: false,
    onSubmit: () => console.log('Checkout submitted'),
  },
};

export const HighPrice: Story = {
  args: {
    productName: 'Service de Mixage Premium',
    price: 100000,
    currency: 'FCFA',
    paymentMethods: mockPaymentMethods,
    loading: false,
    onSubmit: () => console.log('Checkout submitted'),
  },
};

export const Loading: Story = {
  args: {
    productName: 'Trap Beat',
    price: 25000,
    currency: 'FCFA',
    paymentMethods: mockPaymentMethods,
    loading: true,
    onSubmit: () => console.log('Checkout submitted'),
  },
};

export const Service: Story = {
  args: {
    productName: 'Service de Mastering',
    price: 75000,
    currency: 'FCFA',
    paymentMethods: mockPaymentMethods,
    loading: false,
    onSubmit: () => console.log('Checkout submitted'),
  },
};

export const LowPrice: Story = {
  args: {
    productName: 'Sample Pack',
    price: 5000,
    currency: 'FCFA',
    paymentMethods: mockPaymentMethods,
    loading: false,
    onSubmit: () => console.log('Checkout submitted'),
  },
};
