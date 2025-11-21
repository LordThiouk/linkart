import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BookingFormNavigationButtons } from './BookingFormNavigationButtons';

const meta: Meta<typeof BookingFormNavigationButtons> = {
  title: 'Features/Bookings/BookingFormNavigationButtons',
  component: BookingFormNavigationButtons,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BookingFormNavigationButtons>;

export const DetailsStep: Story = {
  args: {
    currentStep: 'details',
    onBack: () => {},
    onNext: () => {},
    onSubmit: () => {},
    disabled: false,
  },
};

export const DetailsStepDisabled: Story = {
  args: {
    currentStep: 'details',
    onBack: () => {},
    onNext: () => {},
    onSubmit: () => {},
    disabled: true,
  },
};

export const FilesStep: Story = {
  args: {
    currentStep: 'files',
    onBack: () => {},
    onNext: () => {},
    onSubmit: () => {},
    disabled: false,
  },
};

export const ReviewStep: Story = {
  args: {
    currentStep: 'review',
    onBack: () => {},
    onNext: () => {},
    onSubmit: () => {},
    disabled: false,
  },
};
