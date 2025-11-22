import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { SearchFiltersHeader } from './SearchFiltersHeader';

const meta: Meta<typeof SearchFiltersHeader> = {
  title: 'features/search/SearchFiltersHeader',
  component: SearchFiltersHeader,
};

export default meta;
type Story = StoryObj<typeof SearchFiltersHeader>;

export const Default: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    return (
      <SearchFiltersHeader
        searchQuery={query}
        onSearchChange={setQuery}
        showFilters={showFilters}
        activeFiltersCount={0}
        onToggleFilters={() => setShowFilters(!showFilters)}
        onBack={() => console.log('Back pressed')}
      />
    );
  },
};

export const WithActiveFilters: Story = {
  render: () => {
    const [query, setQuery] = useState('trap');
    const [showFilters, setShowFilters] = useState(true);
    return (
      <SearchFiltersHeader
        searchQuery={query}
        onSearchChange={setQuery}
        showFilters={showFilters}
        activeFiltersCount={3}
        onToggleFilters={() => setShowFilters(!showFilters)}
        onBack={() => console.log('Back pressed')}
      />
    );
  },
};
