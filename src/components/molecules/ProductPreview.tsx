import React from 'react';
import { View, ViewStyle, TouchableOpacity, Text, Image } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { HeartIcon, PlayButton } from '../atoms';
import { ProductMetrics } from './ProductMetrics';
import { RatingStars } from './RatingStars';
import { UserProfile } from './UserProfile';
import { PriceDisplay } from './PriceDisplay';
import { ProductPreviewData } from '../../types';
import { tokens } from '../../theme';

export interface ProductPreviewProps extends ProductPreviewData {
  onPress?: () => void;
  onPlayPreview?: () => void;
  style?: ViewStyle;
  testID?: string;
  // Nouvelles props pour le design moderne
  viewCount?: number;
  downloadCount?: number;
  likeCount?: number;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
  imageUrl?: string;
}

export const ProductPreview: React.FC<ProductPreviewProps> = ({
  id,
  title,
  type,
  price,
  currency = 'FCFA',
  creator,
  tags = [],
  genre,
  bpm,
  license,
  previewUri,
  isBoosted = false,
  rating,
  onPress,
  onPlayPreview,
  style,
  testID,
  // Nouvelles props
  viewCount = 0,
  downloadCount = 0,
  likeCount = 0,
  isFavorite = false,
  onToggleFavorite,
  imageUrl,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} testID={testID}>
      <Card
        style={[
          {
            marginBottom: tokens.spacing.md,
            elevation: isBoosted ? 4 : 2,
            backgroundColor: theme.colors.surface,
            borderRadius: theme.roundness,
          },
          style,
        ]}
      >
        <Card.Content style={{ padding: tokens.spacing.md }}>
          {/* Image avec HeartIcon */}
          <View style={{ position: 'relative', marginBottom: tokens.spacing.md }}>
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                style={{
                  width: '100%',
                  height: 120,
                  borderRadius: theme.roundness,
                  backgroundColor: theme.colors.surfaceVariant,
                }}
                resizeMode="cover"
              />
            ) : (
              <View
                style={{
                  width: '100%',
                  height: 120,
                  borderRadius: theme.roundness,
                  backgroundColor: theme.colors.surfaceVariant,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 16 }}>{type?.toUpperCase()}</Text>
              </View>
            )}

            {/* HeartIcon en position absolue */}
            {onToggleFavorite && (
              <View
                style={{
                  position: 'absolute',
                  top: tokens.spacing.sm,
                  right: tokens.spacing.sm,
                }}
              >
                <HeartIcon productId={id} />
              </View>
            )}
          </View>

          {/* Titre et prix */}
          <View style={{ marginBottom: tokens.spacing.sm }}>
            <Text
              style={{
                fontSize: theme.fonts.titleMedium.fontSize,
                fontFamily: theme.fonts.titleMedium.fontFamily,
                color: theme.colors.onSurface,
                marginBottom: tokens.spacing.xs,
              }}
              numberOfLines={2}
            >
              {title}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <PriceDisplay amount={price} currency={currency} size="medium" />
              {license && (
                <Chip mode="outlined" compact>
                  {license}
                </Chip>
              )}
            </View>
          </View>

          {/* Métriques */}
          {(viewCount > 0 || downloadCount > 0 || likeCount > 0) && (
            <View style={{ marginBottom: tokens.spacing.sm }}>
              <ProductMetrics viewCount={viewCount} downloadCount={downloadCount} likeCount={likeCount} size="sm" />
            </View>
          )}

          {/* Créateur */}
          <UserProfile
            name={creator.name}
            avatarUri={creator.avatarUri}
            rating={creator.rating}
            isVerified={creator.isVerified}
            size="small"
            showRating={false}
            showLocation={false}
          />

          {/* Tags */}
          {(tags.length > 0 || genre || bpm) && (
            <View style={{ marginTop: tokens.spacing.sm }}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
                {[...(genre ? [genre] : []), ...(bpm ? [`${bpm} BPM`] : []), ...tags].map((tag, index) => (
                  <Chip key={index} mode="outlined" compact>
                    {tag}
                  </Chip>
                ))}
              </View>
            </View>
          )}

          {/* Rating */}
          {rating !== undefined && (
            <View style={{ marginTop: tokens.spacing.sm }}>
              <RatingStars rating={rating} size={16} readonly />
            </View>
          )}

          {/* Play Button */}
          {previewUri && (
            <View style={{ marginTop: tokens.spacing.sm }}>
              <PlayButton isPlaying={false} onPress={onPlayPreview || (() => console.log('Play preview'))} size="sm" />
            </View>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};
