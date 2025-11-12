/**
 * Table Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Table pour afficher des données tabulaires avec FlatList
 * Optimisé pour mobile avec scroll horizontal et vertical
 */

import React from 'react';
import { View, Text, FlatList, StyleSheet, ViewProps, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export interface TableColumn<T = any> {
  /** Clé unique de la colonne */
  key: string;
  /** Titre de la colonne */
  title: string;
  /** Largeur de la colonne (en pixels ou pourcentage) */
  width?: number | string;
  /** Fonction pour rendre le contenu de la cellule */
  render?: (item: T, index: number) => React.ReactNode;
  /** Alignement du texte */
  align?: 'left' | 'center' | 'right';
  /** Colonne sticky (reste visible au scroll horizontal) */
  sticky?: boolean;
}

export interface TableProps<T = any> extends ViewProps {
  /** Colonnes de la table */
  columns: TableColumn<T>[];
  /** Données à afficher */
  data: T[];
  /** Variant de la table */
  variant?: 'default' | 'outline' | 'ghost';
  /** Avec bordures */
  withBorders?: boolean;
  /** Hauteur fixe (pour scroll vertical) */
  height?: number;
  /** Callback quand une ligne est pressée */
  onRowPress?: (item: T, index: number) => void;
  /** Key extractor pour FlatList */
  keyExtractor?: (item: T, index: number) => string;
  /** Empty component */
  emptyComponent?: React.ReactNode;
}

/**
 * Table - Composant principal
 */
export default function Table<T = any>({
  columns,
  data,
  variant = 'default',
  withBorders = true,
  height,
  onRowPress,
  keyExtractor,
  emptyComponent,
  style,
  ...props
}: TableProps<T>) {
  const renderHeader = () => (
    <View style={[styles.header, styles[`header_${variant}`], withBorders && styles.header_bordered]}>
      {columns.map(column => {
        const widthStyle = column.width
          ? typeof column.width === 'string'
            ? { flex: parseFloat(column.width.replace('%', '')) / 100 }
            : { width: column.width, flex: 0 }
          : { flex: 1 };
        return (
          <View
            key={column.key}
            style={[
              styles.headerCell,
              widthStyle,
              column.align && styles[`align_${column.align}`],
              column.sticky && styles.sticky,
            ]}
          >
            <Text style={styles.headerText}>{column.title}</Text>
          </View>
        );
      })}
    </View>
  );

  const renderRow = ({ item, index }: { item: T; index: number }) => (
    <View
      style={[
        styles.row,
        styles[`row_${variant}`],
        withBorders && styles.row_bordered,
        index % 2 === 0 && styles.row_even,
      ]}
    >
      {columns.map(column => {
        const content = column.render
          ? column.render(item, index)
          : (item as any)[column.key] != null
            ? String((item as any)[column.key])
            : '';
        const widthStyle = column.width
          ? typeof column.width === 'string'
            ? { flex: parseFloat(column.width.replace('%', '')) / 100 }
            : { width: column.width, flex: 0 }
          : { flex: 1 };

        return (
          <View
            key={column.key}
            style={[
              styles.cell,
              widthStyle,
              column.align && styles[`align_${column.align}`],
              column.sticky && styles.sticky,
            ]}
          >
            {typeof content === 'string' ? (
              <Text style={styles.cellText} numberOfLines={1}>
                {content}
              </Text>
            ) : (
              content
            )}
          </View>
        );
      })}
    </View>
  );

  return (
    <View style={[styles.container, style]} {...props}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.tableWrapper}>
          {renderHeader()}
          {data.length === 0 ? (
            emptyComponent || (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>Aucune donnée</Text>
              </View>
            )
          ) : (
            <FlatList
              data={data}
              renderItem={renderRow}
              keyExtractor={keyExtractor || ((item, index) => `row-${index}`)}
              scrollEnabled={!!height}
              style={height ? { maxHeight: height } : undefined}
              nestedScrollEnabled
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

Table.displayName = 'Table';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
  },
  tableWrapper: {
    width: '100%',
    minWidth: '100%',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceElevated,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  header_default: {
    backgroundColor: colors.surfaceElevated,
  },
  header_outline: {
    backgroundColor: colors.transparent,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  header_ghost: {
    backgroundColor: colors.transparent,
  },
  header_bordered: {
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  headerCell: {
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    minHeight: 48,
  },
  row_default: {
    backgroundColor: colors.surface,
  },
  row_outline: {
    backgroundColor: colors.transparent,
  },
  row_ghost: {
    backgroundColor: colors.transparent,
  },
  row_bordered: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  row_even: {
    backgroundColor: colors.surfaceElevated,
  },
  cell: {
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
  },
  cellText: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textPrimary,
  },
  align_left: {
    alignItems: 'flex-start',
  },
  align_center: {
    alignItems: 'center',
  },
  align_right: {
    alignItems: 'flex-end',
  },
  sticky: {
    position: 'sticky',
    left: 0,
    backgroundColor: colors.surface,
    zIndex: 10,
  },
  empty: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textMuted,
  },
});
