import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { AutoPlaylistBadge } from './AutoPlaylistBadge';

const meta: Meta<typeof AutoPlaylistBadge> = {
  title: 'features/featured-artists/AutoPlaylistBadge',
  component: AutoPlaylistBadge,
};

export default meta;
type Story = StoryObj<typeof AutoPlaylistBadge>;

export const Boosted: Story = {
  args: {
    type: 'boosted',
  },
};

export const Top: Story = {
  args: {
    type: 'top',
  },
};

export const New: Story = {
  args: {
    type: 'new',
  },
};

export const CustomLabel: Story = {
  args: {
    type: 'top',
    label: 'Top Beatmaker',
  },
};
