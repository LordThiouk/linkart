import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Features/Uploads/FileUpload',
  component: FileUpload,
  decorators: [
    Story => (
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    fileType: {
      control: 'radio',
      options: ['preview', 'full'],
    },
    onFileSelected: { action: 'file selected' },
    onUploadComplete: { action: 'upload complete' },
    onUploadError: { action: 'upload error' },
  },
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const PreviewUpload: Story = {
  args: {
    fileType: 'preview',
    allowedTypes: ['mp3', 'wav'],
    maxFileSize: 2 * 1024 * 1024, // 2MB
  },
};

export const FullUpload: Story = {
  args: {
    fileType: 'full',
    allowedTypes: ['zip', 'mp3', 'wav'],
    maxFileSize: 50 * 1024 * 1024, // 50MB
  },
};
