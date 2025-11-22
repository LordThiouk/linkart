import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { AvatarUpload } from './AvatarUpload';

const meta: Meta<typeof AvatarUpload> = {
  title: 'features/auth/AvatarUpload',
  component: AvatarUpload,
};

export default meta;
type Story = StoryObj<typeof AvatarUpload>;

export const Default: Story = {
  args: {
    imageUri: null,
    onUpload: () => console.log('Upload pressed'),
  },
};

export const WithImage: Story = {
  args: {
    imageUri: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=200',
    onUpload: () => console.log('Upload pressed'),
  },
};
