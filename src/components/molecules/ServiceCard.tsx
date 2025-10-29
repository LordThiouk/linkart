import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Avatar } from '../atoms/Avatar';
import { Button } from '../atoms/Button';
import { HeartIcon } from '../atoms/HeartIcon';
import { Badge } from '../atoms/Badge';

export interface ServiceCardProps {
  id: string;
  title: string;
  provider: {
    id: string;
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  description: string;
  price?: {
    amount: number;
    currency: string;
    type: 'fixed' | 'on_demand' | 'multi_tier';
  };
  category: string;
  rating?: number;
  reviewCount?: number;
  isFavorite?: boolean;
  onPress: (serviceId: string) => void;
  onToggleFavorite?: (serviceId: string, isFavorite: boolean) => void;
  onBook?: (serviceId: string) => void;
  testID?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  provider,
  description,
  price,
  category,
  rating,
  reviewCount,
  isFavorite = false,
  onPress,
  onToggleFavorite,
  onBook,
  testID,
}) => {
  const theme = useTheme();

  const handleCardPress = () => {
    onPress(id);
  };

  const handleBookPress = () => {
    if (onBook) {
      onBook(id);
    }
  };

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(id, !isFavorite);
    }
  };

  const formatPrice = () => {
    if (!price) return 'Prix à la demande';

    switch (price.type) {
      case 'fixed':
        return `${price.amount.toLocaleString()} ${price.currency}`;
      case 'on_demand':
        return 'Prix à la demande';
      case 'multi_tier':
        return `À partir de ${price.amount.toLocaleString()} ${price.currency}`;
      default:
        return 'Prix à la demande';
    }
  };

  const formatRating = () => {
    if (!rating || !reviewCount) return null;
    return `${rating.toFixed(1)} (${reviewCount})`;
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.surface }]}
      onPress={handleCardPress}
      testID={testID}
      activeOpacity={0.7}
    >
      {/* Header avec avatar et HeartIcon */}
      <View style={styles.header}>
        <View style={styles.providerInfo}>
          <Avatar uri={provider.avatar} size={32} name={provider.name} />
          <View style={styles.providerDetails}>
            <Text style={[styles.providerName, { color: theme.colors.onSurface }]}>{provider.name}</Text>
            {provider.verified && (
              <Badge variant="success" size="small">
                Vérifié
              </Badge>
            )}
          </View>
        </View>

        {onToggleFavorite ? (
          <TouchableOpacity
            onPress={handleToggleFavorite}
            accessibilityRole="button"
            accessibilityLabel="Basculer favori"
          >
            <HeartIcon productId={id} size="sm" testID={`${testID}-heart-icon`} />
          </TouchableOpacity>
        ) : (
          <HeartIcon productId={id} size="sm" testID={`${testID}-heart-icon`} />
        )}
      </View>

      {/* Contenu principal */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.onSurface }]} numberOfLines={2}>
          {title}
        </Text>

        <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]} numberOfLines={2}>
          {description}
        </Text>

        {/* Métadonnées */}
        <View style={styles.metadata}>
          <Badge variant="default" size="small">
            {category}
          </Badge>

          {rating && <Text style={[styles.rating, { color: theme.colors.onSurfaceVariant }]}>⭐ {formatRating()}</Text>}
        </View>

        {/* Prix et bouton */}
        <View style={styles.footer}>
          <Text style={[styles.price, { color: theme.colors.primary }]}>{formatPrice()}</Text>

          {onBook && (
            <Button variant="primary" size="small" onPress={handleBookPress} style={styles.bookButton}>
              Réserver
            </Button>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  providerDetails: {
    marginLeft: 12,
    flex: 1,
  },
  providerName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 22,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rating: {
    fontSize: 12,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  bookButton: {
    minWidth: 100,
  },
});
