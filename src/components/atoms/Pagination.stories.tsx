/**
 * Pagination Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import { useState } from 'react';
import Pagination from './Pagination';
import { colors, spacing } from '../../theme';

const meta: Meta<typeof Pagination> = {
  title: 'Atoms/Pagination',
  component: Pagination,
  decorators: [
    Story => (
      <View
        style={{
          flex: 1,
          padding: spacing.lg,
          backgroundColor: colors.background,
          justifyContent: 'center',
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Pagination par défaut
 */
export const Default: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <View>
        <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
        <Text style={{ color: colors.textSecondary, marginTop: spacing.md, textAlign: 'center' }}>
          Page {currentPage} sur 10
        </Text>
      </View>
    );
  },
};

/**
 * Pagination avec peu de pages
 */
export const FewPages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <View>
        <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
        <Text style={{ color: colors.textSecondary, marginTop: spacing.md, textAlign: 'center' }}>
          Page {currentPage} sur 5
        </Text>
      </View>
    );
  },
};

/**
 * Pagination avec beaucoup de pages
 */
export const ManyPages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(50);
    return (
      <View>
        <Pagination currentPage={currentPage} totalPages={100} onPageChange={setCurrentPage} />
        <Text style={{ color: colors.textSecondary, marginTop: spacing.md, textAlign: 'center' }}>
          Page {currentPage} sur 100
        </Text>
      </View>
    );
  },
};

/**
 * Pagination page 1
 */
export const FirstPage: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    return <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />;
  },
};

/**
 * Pagination dernière page
 */
export const LastPage: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(10);
    return <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />;
  },
};

/**
 * Pagination désactivée
 */
export const Disabled: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(5);
    return <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} disabled />;
  },
};

/**
 * Pagination avec siblingCount personnalisé
 */
export const CustomSiblingCount: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(50);
    return (
      <View>
        <Pagination currentPage={currentPage} totalPages={100} onPageChange={setCurrentPage} siblingCount={2} />
        <Text style={{ color: colors.textMuted, marginTop: spacing.md, fontSize: 12, textAlign: 'center' }}>
          siblingCount: 2 (affiche 2 pages de chaque côté)
        </Text>
      </View>
    );
  },
};
