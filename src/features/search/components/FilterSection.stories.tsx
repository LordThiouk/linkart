import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { FilterSection } from './FilterSection';
import { CategoryChipFigma } from '@/components/atoms/CategoryChipFigma';
import { View } from 'react-native';
import { spacing } from '@/theme';

const meta: Meta<typeof FilterSection> = {
  title: 'features/search/FilterSection',
  component: FilterSection,
};

export default meta;
type Story = StoryObj<typeof FilterSection>;

const ChipsContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>{children}</View>
);

export const Default: Story = {
  args: {
    title: 'Genre',
    children: (
      <ChipsContainer>
        <CategoryChipFigma label="Trap" selected={false} onPress={() => {}} />
        <CategoryChipFigma label="Hip-Hop" selected={true} onPress={() => {}} />
        <CategoryChipFigma label="Lo-fi" selected={false} onPress={() => {}} />
      </ChipsContainer>
    ),
  },
};

export const WithClear: Story = {
  args: {
    title: 'Prix',
    showClear: true,
    onClear: () => console.log('Clear pressed'),
    children: (
      <ChipsContainer>
        <CategoryChipFigma label="< €20" selected={true} onPress={() => {}} />
        <CategoryChipFigma label="€20-€50" selected={false} onPress={() => {}} />
      </ChipsContainer>
    ),
  },
};
