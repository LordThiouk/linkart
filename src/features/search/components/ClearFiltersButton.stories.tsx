import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ClearFiltersButton } from './ClearFiltersButton';

const meta: Meta<typeof ClearFiltersButton> = {
  title: 'features/search/ClearFiltersButton',
  component: ClearFiltersButton,
};

export default meta;
type Story = StoryObj<typeof ClearFiltersButton>;

export const Default: Story = {
  args: {
    onPress: () => console.log('Clear filters pressed'),
  },
};
