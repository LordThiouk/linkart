import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { FilterPills } from './FilterPills';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../../theme';

const meta: Meta<typeof FilterPills> = {
  title: 'Organisms/FilterPills',
  component: FilterPills,
  decorators: [
    Story => (
      <PaperProvider theme={theme}>
        <Story />
      </PaperProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof FilterPills>;

export const Default: Story = {
  args: {
    filters: [
      { id: 'all', label: 'Tous' },
      { id: 'trap', label: 'Trap' },
      { id: 'afrobeat', label: 'Afrobeat' },
      { id: 'hip-hop', label: 'Hip Hop' },
      { id: 'r&b', label: 'R&B' },
      { id: 'pop', label: 'Pop' },
    ],
    onFilterPress: (filterId: string) => console.log('Filter pressed:', filterId),
  },
};

export const SmallSize: Story = {
  args: {
    filters: [
      { id: 'all', label: 'Tous' },
      { id: 'trap', label: 'Trap' },
      { id: 'afrobeat', label: 'Afrobeat' },
    ],
    onFilterPress: (filterId: string) => console.log('Filter pressed:', filterId),
  },
};

export const LargeSize: Story = {
  args: {
    filters: [
      { id: 'all', label: 'Tous' },
      { id: 'trap', label: 'Trap' },
      { id: 'afrobeat', label: 'Afrobeat' },
      { id: 'hip-hop', label: 'Hip Hop' },
      { id: 'r&b', label: 'R&B' },
      { id: 'pop', label: 'Pop' },
      { id: 'electronic', label: 'Electronic' },
      { id: 'jazz', label: 'Jazz' },
    ],
    onFilterPress: (filterId: string) => console.log('Filter pressed:', filterId),
  },
};

export const AllSizes: Story = {
  render: () => (
    <>
      <FilterPills
        filters={[
          { id: 'all', label: 'Tous' },
          { id: 'trap', label: 'Trap' },
          { id: 'afrobeat', label: 'Afrobeat' },
        ]}
        onFilterPress={(filterId: string) => console.log('Filter pressed:', filterId)}
      />
      <FilterPills
        filters={[
          { id: 'all', label: 'Tous' },
          { id: 'trap', label: 'Trap' },
          { id: 'afrobeat', label: 'Afrobeat' },
          { id: 'hip-hop', label: 'Hip Hop' },
        ]}
        onFilterPress={(filterId: string) => console.log('Filter pressed:', filterId)}
      />
      <FilterPills
        filters={[
          { id: 'all', label: 'Tous' },
          { id: 'trap', label: 'Trap' },
          { id: 'afrobeat', label: 'Afrobeat' },
          { id: 'hip-hop', label: 'Hip Hop' },
          { id: 'r&b', label: 'R&B' },
          { id: 'pop', label: 'Pop' },
        ]}
        onFilterPress={(filterId: string) => console.log('Filter pressed:', filterId)}
      />
    </>
  ),
};
