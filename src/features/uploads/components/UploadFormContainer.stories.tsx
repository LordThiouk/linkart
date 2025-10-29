import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { UploadFormContainer } from './UploadFormContainer';

const meta: Meta<typeof UploadFormContainer> = {
  title: 'Features/Uploads/UploadFormContainer',
  component: UploadFormContainer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithProductCapability: Story = {
  parameters: {
    mockData: {
      user: {
        capabilities: {
          can_sell: true,
          can_offer_services: false,
        },
      },
    },
  },
};

export const WithServiceCapability: Story = {
  parameters: {
    mockData: {
      user: {
        capabilities: {
          can_sell: false,
          can_offer_services: true,
        },
      },
    },
  },
};

export const WithBothCapabilities: Story = {
  parameters: {
    mockData: {
      user: {
        capabilities: {
          can_sell: true,
          can_offer_services: true,
        },
      },
    },
  },
};

export const NoCapabilities: Story = {
  parameters: {
    mockData: {
      user: {
        capabilities: {
          can_sell: false,
          can_offer_services: false,
        },
      },
    },
  },
};
