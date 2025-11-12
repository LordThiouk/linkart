/**
 * Table Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import Table, { TableColumn } from './Table';
import { colors, spacing } from '../../theme';
import Badge from './Badge';

const meta: Meta<typeof Table> = {
  title: 'Atoms/Table',
  component: Table,
  decorators: [
    Story => (
      <View
        style={{
          flex: 1,
          padding: spacing.lg,
          backgroundColor: colors.background,
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Données de test
interface Product {
  id: string;
  name: string;
  price: number;
  status: 'active' | 'pending' | 'sold';
  sales: number;
}

const products: Product[] = [
  { id: '1', name: 'Trap Beat 2024', price: 25000, status: 'active', sales: 15 },
  { id: '2', name: 'Afrobeat Kit', price: 15000, status: 'active', sales: 8 },
  { id: '3', name: 'Drill Sample Pack', price: 30000, status: 'pending', sales: 0 },
  { id: '4', name: 'R&B Melody', price: 20000, status: 'sold', sales: 3 },
  { id: '5', name: 'Hip-Hop Loop', price: 18000, status: 'active', sales: 12 },
];

const columns: TableColumn<Product>[] = [
  {
    key: 'name',
    title: 'Produit',
    width: '40%',
    render: item => <Text style={{ color: colors.textPrimary, fontWeight: '500' }}>{item.name}</Text>,
  },
  {
    key: 'price',
    title: 'Prix',
    width: '20%',
    align: 'right',
    render: item => (
      <Text style={{ color: colors.golden, fontWeight: '600' }}>{item.price.toLocaleString('fr-FR')} F</Text>
    ),
  },
  {
    key: 'status',
    title: 'Statut',
    width: '20%',
    align: 'center',
    render: item => {
      const variantMap = {
        active: 'default' as const,
        pending: 'secondary' as const,
        sold: 'outline' as const,
      };
      const labelMap = {
        active: 'Actif',
        pending: 'En attente',
        sold: 'Vendu',
      };
      return <Badge variant={variantMap[item.status]}>{labelMap[item.status]}</Badge>;
    },
  },
  {
    key: 'sales',
    title: 'Ventes',
    width: '20%',
    align: 'center',
    render: item => <Text style={{ color: colors.textSecondary }}>{item.sales}</Text>,
  },
];

/**
 * Table par défaut
 */
export const Default: Story = {
  render: () => <Table columns={columns} data={products} />,
};

/**
 * Table avec variant outline
 */
export const Outline: Story = {
  render: () => <Table columns={columns} data={products} variant="outline" />,
};

/**
 * Table avec variant ghost
 */
export const Ghost: Story = {
  render: () => <Table columns={columns} data={products} variant="ghost" />,
};

/**
 * Table sans bordures
 */
export const WithoutBorders: Story = {
  render: () => <Table columns={columns} data={products} withBorders={false} />,
};

/**
 * Table avec hauteur fixe (scroll vertical)
 */
export const WithHeight: Story = {
  render: () => <Table columns={columns} data={products} height={300} />,
};

/**
 * Table vide
 */
export const Empty: Story = {
  render: () => (
    <Table
      columns={columns}
      data={[]}
      emptyComponent={
        <View style={{ padding: spacing.xl, alignItems: 'center' }}>
          <Text style={{ color: colors.textMuted, fontSize: 16 }}>Aucun produit disponible</Text>
        </View>
      }
    />
  ),
};

/**
 * Table avec colonnes larges (scroll horizontal)
 */
export const WideColumns: Story = {
  render: () => {
    const wideColumns: TableColumn<Product>[] = [
      {
        key: 'name',
        title: 'Nom du Produit',
        width: 200,
      },
      {
        key: 'price',
        title: 'Prix (FCFA)',
        width: 150,
        align: 'right',
        render: item => (
          <Text style={{ color: colors.golden, fontWeight: '600' }}>{item.price.toLocaleString('fr-FR')} F</Text>
        ),
      },
      {
        key: 'status',
        title: 'Statut de Publication',
        width: 180,
        align: 'center',
        render: item => {
          const variantMap = {
            active: 'default' as const,
            pending: 'secondary' as const,
            sold: 'outline' as const,
          };
          const labelMap = {
            active: 'Actif',
            pending: 'En attente',
            sold: 'Vendu',
          };
          return <Badge variant={variantMap[item.status]}>{labelMap[item.status]}</Badge>;
        },
      },
      {
        key: 'sales',
        title: 'Nombre de Ventes',
        width: 150,
        align: 'center',
        render: item => (
          <Text style={{ color: colors.textSecondary, fontWeight: '500' }}>
            {item.sales} vente{item.sales > 1 ? 's' : ''}
          </Text>
        ),
      },
      {
        key: 'id',
        title: 'ID',
        width: 100,
        align: 'center',
        render: item => <Text style={{ color: colors.textMuted, fontSize: 12 }}>#{item.id}</Text>,
      },
    ];

    return <Table columns={wideColumns} data={products} />;
  },
};

/**
 * Table avec colonne sticky
 */
export const StickyColumn: Story = {
  render: () => {
    const stickyColumns: TableColumn<Product>[] = [
      {
        key: 'name',
        title: 'Produit',
        width: 150,
        sticky: true,
        render: item => <Text style={{ color: colors.textPrimary, fontWeight: '500' }}>{item.name}</Text>,
      },
      ...columns.slice(1),
    ];

    return <Table columns={stickyColumns} data={products} height={300} />;
  },
};
