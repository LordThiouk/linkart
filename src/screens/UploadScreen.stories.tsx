import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { UploadScreen } from './UploadScreen';

const meta: Meta<typeof UploadScreen> = {
  title: 'Screens/UploadScreen',
  component: UploadScreen,
  decorators: [Story => <Story />],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof UploadScreen>;

export const Default: Story = {
  args: {},
};

export const WithNavigation: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Écran d'upload avec navigation entre formulaires Produit et Service.",
      },
    },
  },
};
