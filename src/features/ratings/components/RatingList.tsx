import React from 'react';
import { View, ViewStyle, FlatList } from 'react-native';
import { Card, Avatar, Chip } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { Text, LoadingSpinner } from '../../../components/atoms';
import { RatingStars } from '../../../components/molecules';
import { RatingData } from '../hooks/useRatings';

export interface RatingListProps {
  ratings: RatingData[];
  loading?: boolean;
  onRatingPress?: (rating: RatingData) => void;
  onLoadMore?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export const RatingList: React.FC<RatingListProps> = ({
  ratings,
  loading = false,
  onRatingPress,
  onLoadMore,
  style,
  testID,
}) => {
  const theme = useTheme();

  const renderRating = ({ item }: { item: RatingData }) => (
    <Card style={{ marginBottom: 12 }}>
      <Card.Content>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          {item.buyer?.avatar_url ? (
            <Avatar.Image size={40} source={{ uri: item.buyer.avatar_url }} style={{ marginRight: 12 }} />
          ) : (
            <Avatar.Text size={40} label={item.buyer?.name?.charAt(0) || 'U'} style={{ marginRight: 12 }} />
          )}
          <View>
            <Text variant="bodyMedium" style={{ fontWeight: '600' }}>
              {item.buyer?.name || 'Utilisateur anonyme'}
            </Text>
            <Text variant="caption" style={{ color: theme.colors.onSurfaceVariant }}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <Chip
            mode="outlined"
            compact
            style={{
              backgroundColor:
                item.status === 'visible'
                  ? (theme.colors as any).success || '#22C55E'
                  : (theme.colors as any).warning || '#F59E0B',
            }}
          >
            {item.status}
          </Chip>
        </View>

        <View style={{ marginBottom: 12 }}>
          <RatingStars rating={item.rating} size={16} readonly />
        </View>

        {item.comment && (
          <Text variant="body2" style={{ marginBottom: 8 }}>
            "{item.comment}"
          </Text>
        )}

        <Text variant="caption" style={{ color: theme.colors.onSurfaceVariant }}>
          Achat: {item.product.title}
        </Text>
      </Card.Content>
    </Card>
  );

  const renderEmpty = () => (
    <View style={{ alignItems: 'center', padding: 32 }}>
      <Text variant="bodyMedium" style={{ textAlign: 'center', color: theme.colors.onSurfaceVariant }}>
        Aucune note pour le moment
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (loading && ratings.length > 0) {
      return <LoadingSpinner size="small" />;
    }
    return null;
  };

  return (
    <View style={[{ flex: 1 }, style]} testID={testID}>
      <FlatList
        data={ratings}
        renderItem={renderRating}
        keyExtractor={item => item.id}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={ratings.length === 0 ? renderEmpty : null}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 32,
        }}
      />
    </View>
  );
};
