import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { ChipFilterGroup } from './ChipFilterGroup';

const meta: Meta<typeof ChipFilterGroup> = {
  title: 'features/search/ChipFilterGroup',
  component: ChipFilterGroup,
};

export default meta;
type Story = StoryObj<typeof ChipFilterGroup>;

export const MultipleSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    const toggle = (value: string) => {
      setSelected(prev => (prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]));
    };
    return (
      <ChipFilterGroup
        options={['Trap', 'Hip-Hop', 'Lo-fi', 'EDM', 'R&B']}
        selectedValues={selected}
        onToggle={toggle}
        multiple={true}
      />
    );
  },
};

export const SingleSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    const toggle = (value: string) => {
      setSelected(prev => (prev.includes(value) ? [] : [value]));
    };
    return (
      <ChipFilterGroup
        options={['< €20', '€20-€50', '> €50']}
        selectedValues={selected}
        onToggle={toggle}
        multiple={false}
      />
    );
  },
};
