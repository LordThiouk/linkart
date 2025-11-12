import React, { useCallback } from 'react';
import { View, FlatList, ViewStyle, RefreshControl } from 'react-native';
import { useTheme } from 'react-native-paper';
import { ProductPreview } from '../molecules';
import { LoadingSpinner, Text } from '../atoms';
import { Product } from '../../types';
import { spacing } from '../../theme';

export interface ProductListProps {
  products: Product[];
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  onProductPress?: (product: Product) => void;
  onPlayPreview?: (product: Product) => void;
  emptyMessage?: string;
  style?: ViewStyle;
  testID?: string;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  loading = false,
  refreshing = false,
  onRefresh,
  onLoadMore,
  onProductPress,
  onPlayPreview,
  emptyMessage = 'Aucun produit trouvé',
  style,
  testID,
}) => {
  const theme = useTheme();

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <ProductPreview
        {...item}
        type={item.type as 'beat' | 'kit' | 'sample' | 'service' | undefined}
        license={item.license || undefined}
        creator={{
          name: 'Artiste inconnu',
          avatarUri: undefined,
          rating: undefined,
          isVerified: false,
        }}
        onPress={() => onProductPress?.(item)}
        onPlayPreview={() => onPlayPreview?.(item)}
      />
    ),
    [onProductPress, onPlayPreview]
  );

  const renderEmpty = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text variant="body2" style={{ textAlign: 'center', color: theme.colors.onSurfaceVariant }}>
        Aucun produit trouvé.
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (loading && products.length > 0) {
      return <LoadingSpinner size="small" />;
    }
    return null;
  };

  return (
    <View style={[{ flex: 1 }, style]} testID={testID}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />
          ) : undefined
        }
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={products.length === 0 ? renderEmpty : null}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: spacing.md,
          paddingBottom: spacing.lg,
        }}
      />
    </View>
  );
};
