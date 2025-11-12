import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProductUploadForm } from './ProductUploadForm';

const meta: Meta<typeof ProductUploadForm> = {
  title: 'Features/Products/ProductUploadForm',
  component: ProductUploadForm,
  decorators: [Story => <Story />],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    loading: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductUploadForm>;

export const Default: Story = {
  args: {
    onSubmit: data => {
      console.log('Product form submitted:', data);
    },
    loading: false,
  },
};

export const WithLoading: Story = {
  args: {
    onSubmit: data => {
      console.log('Product form submitted:', data);
    },
    loading: true,
  },
};

export const WithArtworkPreview: Story = {
  args: {
    onSubmit: data => {
      console.log('Product form submitted:', data);
    },
    loading: false,
  },
  parameters: {
    mockData: {
      initialFormData: {
        title: 'Dark Trap Beat',
        description: 'Un beat trap sombre et énergique',
        genre: 'Trap',
        bpm: 140,
        tags: ['dark', 'trap', 'energetic'],
        artworkUrl: 'https://picsum.photos/400/400',
        licenses: [
          {
            type: 'basic',
            price: 15000,
            terms: 'Usage non-commercial uniquement',
            is_available: true,
          },
          {
            type: 'non_exclusive',
            price: 35000,
            terms: 'Usage commercial autorisé',
            is_available: true,
          },
        ],
      },
    },
  },
};

export const WithValidationErrors: Story = {
  args: {
    onSubmit: data => {
      console.log('Product form submitted:', data);
    },
    loading: false,
  },
  parameters: {
    mockData: {
      showValidationErrors: true,
    },
  },
};
