import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { FormActions } from './FormActions';

const meta: Meta<typeof FormActions> = {
  title: 'features/auth/FormActions',
  component: FormActions,
};

export default meta;
type Story = StoryObj<typeof FormActions>;

export const Default: Story = {
  args: {
    canContinue: true,
    onContinue: () => console.log('Continue pressed'),
    onSkip: () => console.log('Skip pressed'),
  },
};

export const Disabled: Story = {
  args: {
    canContinue: false,
    onContinue: () => console.log('Continue pressed'),
    onSkip: () => console.log('Skip pressed'),
  },
};

export const WithoutSkip: Story = {
  args: {
    canContinue: true,
    onContinue: () => console.log('Continue pressed'),
  },
};
