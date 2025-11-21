import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BookingFormFilesStep } from './BookingFormFilesStep';

const meta: Meta<typeof BookingFormFilesStep> = {
  title: 'Features/Bookings/BookingFormFilesStep',
  component: BookingFormFilesStep,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BookingFormFilesStep>;

export const Empty: Story = {
  args: {
    uploadedFiles: [],
    onFileUpload: () => {},
  },
};

export const WithFiles: Story = {
  args: {
    uploadedFiles: [
      { name: 'track1.mp3', size: '3.2 MB' },
      { name: 'reference.m4a', size: '2.1 MB' },
      { name: 'notes.pdf', size: '150 KB' },
    ],
    onFileUpload: () => {},
  },
};
