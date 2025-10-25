import type { Meta, StoryObj } from '@storybook/react-vite';
import { RatingStars } from './RatingStars';

const meta: Meta<typeof RatingStars> = {
  title: 'Molecules/RatingStars',
  component: RatingStars,
  parameters: {
    docs: {
      description: {
        component: 'Système de notation avec étoiles (1-5 étoiles).',
      },
    },
  },
  argTypes: {
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    readonly: {
      control: { type: 'boolean' },
    },
    onRatingChange: {
      action: 'onRatingChange',
    },
  },
};

export default meta;

type Story = StoryObj<typeof RatingStars>;

export const Default: Story = {
  args: {
    rating: 3.5,
    size: 20,
    readonly: false,
    onRatingChange: (rating: number) => console.log('Rating:', rating),
  },
};

export const Readonly: Story = {
  args: {
    rating: 4.0,
    size: 20,
    readonly: true,
  },
};

export const Small: Story = {
  args: {
    rating: 2.5,
    size: 16,
    readonly: false,
    onRatingChange: (rating: number) => console.log('Rating:', rating),
  },
};

export const Large: Story = {
  args: {
    rating: 5.0,
    size: 32,
    readonly: false,
    onRatingChange: (rating: number) => console.log('Rating:', rating),
  },
};

export const NoRating: Story = {
  args: {
    rating: 0,
    size: 20,
    readonly: false,
    onRatingChange: (rating: number) => console.log('Rating:', rating),
  },
};

export const PerfectRating: Story = {
  args: {
    rating: 5.0,
    size: 20,
    readonly: true,
  },
};

export const PoorRating: Story = {
  args: {
    rating: 1.0,
    size: 20,
    readonly: true,
  },
};
