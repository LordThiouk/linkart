import type { Meta, StoryObj } from '@storybook/react-vite';
import { RatingForm } from './RatingForm';

const meta: Meta<typeof RatingForm> = {
  title: 'Features/Ratings/RatingForm',
  component: RatingForm,
  parameters: {
    docs: {
      description: {
        component: 'Formulaire de notation pour évaluer un produit acheté.',
      },
    },
  },
  argTypes: {
    productTitle: {
      control: { type: 'text' },
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

type Story = StoryObj<typeof RatingForm>;

export const Default: Story = {
  args: {
    productTitle: 'Afrobeat Instrumental',
    loading: false,
    onSubmit: data => console.log('Rating submitted:', data),
  },
};

export const Loading: Story = {
  args: {
    productTitle: 'Trap Beat Premium',
    loading: true,
    onSubmit: data => console.log('Rating submitted:', data),
  },
};

export const Service: Story = {
  args: {
    productTitle: 'Service de Mixage',
    loading: false,
    onSubmit: data => console.log('Rating submitted:', data),
  },
};

export const LongTitle: Story = {
  args: {
    productTitle: 'Super Long Product Title That Might Wrap to Multiple Lines',
    loading: false,
    onSubmit: data => console.log('Rating submitted:', data),
  },
};
