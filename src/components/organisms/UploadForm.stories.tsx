import type { Meta, StoryObj } from '@storybook/react-vite';
import { UploadForm } from './UploadForm';
import { useState } from 'react';

const meta: Meta<typeof UploadForm> = {
  title: 'Organisms/UploadForm',
  component: UploadForm,
  parameters: {
    docs: {
      description: {
        component: 'Formulaire de téléversement de produit avec tous les champs requis.',
      },
    },
  },
  argTypes: {
    loading: {
      control: { type: 'boolean' },
    },
    onSubmit: {
      action: 'onSubmit',
    },
  },
};

export default meta;

type Story = StoryObj<typeof UploadForm>;

export const Default: Story = {
  args: {
    loading: false,
    onSubmit: data => console.log('Upload data:', data),
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    onSubmit: data => console.log('Upload data:', data),
  },
};

export const Interactive: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: any) => {
      setLoading(true);
      console.log('Upload data:', data);
      // Simulate upload
      setTimeout(() => setLoading(false), 2000);
    };

    return <UploadForm loading={loading} onSubmit={handleSubmit} />;
  },
};
