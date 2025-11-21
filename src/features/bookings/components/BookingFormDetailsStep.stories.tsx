import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BookingFormDetailsStep } from './BookingFormDetailsStep';

const meta: Meta<typeof BookingFormDetailsStep> = {
  title: 'Features/Bookings/BookingFormDetailsStep',
  component: BookingFormDetailsStep,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BookingFormDetailsStep>;

export const Default: Story = {
  args: {
    projectName: '',
    description: '',
    deadline: '',
    additionalNotes: '',
    onProjectNameChange: () => {},
    onDescriptionChange: () => {},
    onDeadlineChange: () => {},
    onAdditionalNotesChange: () => {},
  },
};

export const WithData: Story = {
  args: {
    projectName: 'Mon EP Afrobeat 2025',
    description: 'Je souhaite un mixage et mastering professionnel pour mon EP de 5 titres.',
    deadline: '2025-12-15',
    additionalNotes: 'Style souhaité : chaleureux et moderne avec une bonne présence des basses.',
    onProjectNameChange: () => {},
    onDescriptionChange: () => {},
    onDeadlineChange: () => {},
    onAdditionalNotesChange: () => {},
  },
};
