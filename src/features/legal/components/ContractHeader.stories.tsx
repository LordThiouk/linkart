import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ContractHeader } from './ContractHeader';

const meta: Meta<typeof ContractHeader> = {
  title: 'features/legal/ContractHeader',
  component: ContractHeader,
};

export default meta;
type Story = StoryObj<typeof ContractHeader>;

export const Default: Story = {
  args: {
    contractNumber: 'LKT-2024-001243',
    onBack: () => console.log('Back pressed'),
    onDownload: () => console.log('Download pressed'),
    onShare: () => console.log('Share pressed'),
  },
};
