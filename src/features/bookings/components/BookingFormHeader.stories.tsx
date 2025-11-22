import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BookingFormHeader } from './BookingFormHeader';

const meta: Meta<typeof BookingFormHeader> = {
  title: 'Features/Bookings/BookingFormHeader',
  component: BookingFormHeader,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BookingFormHeader>;

export const Step1: Story = {
  args: {
    currentStep: 1,
    totalSteps: 3,
    onBack: () => {},
  },
};

export const Step2: Story = {
  args: {
    currentStep: 2,
    totalSteps: 3,
    onBack: () => {},
  },
};

export const Step3: Story = {
  args: {
    currentStep: 3,
    totalSteps: 3,
    onBack: () => {},
  },
};

export const WithoutBackButton: Story = {
  args: {
    currentStep: 1,
    totalSteps: 3,
  },
};
