import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  parameters: {
    docs: {
      description: {
        component: 'Barre de recherche avec filtres pour les produits.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: { type: 'text' },
    },
    onSearch: {
      action: 'onSearch',
    },
    onFilterChange: {
      action: 'onFilterChange',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: 'Rechercher des beats...',
    onSearch: (query: string) => console.log('Search:', query),
    onFilterChange: (filters: any) => console.log('Filters:', filters),
  },
};

export const WithInitialValue: Story = {
  args: {
    placeholder: 'Rechercher des beats...',
    value: 'Afrobeat',
    onChangeText: (text: string) => console.log('Text changed:', text),
    onSearch: (query: string) => console.log('Search:', query),
    onFilterChange: (filters: any) => console.log('Filters:', filters),
  },
};

export const WithFilters: Story = {
  args: {
    placeholder: 'Rechercher des beats...',
    value: '',
    onChangeText: (text: string) => console.log('Text changed:', text),
    filters: [
      { label: 'Hip-Hop', value: 'hip-hop', selected: false },
      { label: 'Afrobeat', value: 'afrobeat', selected: true },
      { label: 'Trap', value: 'trap', selected: false },
    ],
    onSearch: (query: string) => console.log('Search:', query),
    onFilterChange: (filter: string) => console.log('Filter changed:', filter),
  },
};

export const Loading: Story = {
  args: {
    placeholder: 'Rechercher des beats...',
    value: '',
    onChangeText: (text: string) => console.log('Text changed:', text),
    onSearch: (query: string) => console.log('Search:', query),
    onFilterChange: (filters: any) => console.log('Filters:', filters),
  },
};
