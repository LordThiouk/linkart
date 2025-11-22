import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BookingFormReviewStep } from './BookingFormReviewStep';

const meta: Meta<typeof BookingFormReviewStep> = {
  title: 'Features/Bookings/BookingFormReviewStep',
  component: BookingFormReviewStep,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BookingFormReviewStep>;

export const Default: Story = {
  args: {
    projectName: 'Mon EP Afrobeat 2025',
    description: 'Je souhaite un mixage et mastering professionnel pour mon EP de 5 titres.',
    deadline: '2025-12-15',
    packageName: 'Standard',
    price: 250.0,
    deliveryTime: '3-5 jours',
  },
};

export const WithoutDeadline: Story = {
  args: {
    projectName: 'Single Production',
    description: 'Production complète pour un single.',
    packageName: 'Premium',
    price: 500.0,
    deliveryTime: '7-10 jours',
  },
};
