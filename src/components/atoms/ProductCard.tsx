import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import { HeartIcon } from './HeartIcon';
import { PlayButton } from './PlayButton';
import { ProductMetrics } from '../molecules/ProductMetrics';

interface ProductCardProps {
  id: string;
  title: string;
  artist: string;
  price: number;
  imageUrl: string;
  viewCount: number;
  downloadCount: number;
  likeCount: number;
  onPress: (id: string) => void;
  onPlay?: (id: string) => void;
  testID?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  artist,
  price,
  imageUrl,
  viewCount,
  downloadCount,
  likeCount,
  onPress,
  onPlay,
  testID,
}) => {
  const theme = useTheme();

  const handlePress = () => {
    onPress(id);
  };

  const handlePlay = () => {
    if (onPlay) {
      onPlay(id);
    }
  };

  const formatPrice = () => {
    return `${(price / 100).toFixed(2)} €`;
  };

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.roundness,
        marginHorizontal: 4,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      }}
      onPress={handlePress}
      activeOpacity={0.7}
      testID={testID}
    >
      {/* Image Container avec HeartIcon */}
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: '100%',
            height: 120,
            borderTopLeftRadius: theme.roundness,
            borderTopRightRadius: theme.roundness,
          }}
          resizeMode="cover"
        />

        {/* HeartIcon en position absolue */}
        <View
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
          }}
        >
          <HeartIcon productId={id} size="md" testID={`${testID}-heart-icon`} />
        </View>

        {/* PlayButton overlay */}
        {onPlay && (
          <View
            style={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              zIndex: 1,
            }}
          >
            <PlayButton isPlaying={false} size="sm" onPress={handlePlay} testID={`${testID}-play-button`} />
          </View>
        )}
      </View>

      {/* Content */}
      <View style={{ padding: 16 }}>
        {/* Title */}
        <Text
          style={{
            fontSize: theme.fonts.titleMedium.fontSize,
            fontFamily: theme.fonts.titleMedium.fontFamily,
            color: theme.colors.onSurface,
            marginBottom: 4,
            fontWeight: 'bold',
          }}
          numberOfLines={1}
        >
          {title}
        </Text>

        {/* Artist */}
        <Text
          style={{
            fontSize: theme.fonts.bodySmall.fontSize,
            fontFamily: theme.fonts.bodySmall.fontFamily,
            color: theme.colors.onSurfaceVariant,
            marginBottom: 8,
          }}
          numberOfLines={1}
        >
          {artist}
        </Text>

        {/* Footer avec prix et métriques */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 8,
          }}
        >
          {/* Prix */}
          <View
            style={{
              backgroundColor: theme.colors.primary,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: theme.roundness / 2,
            }}
          >
            <Text
              style={{
                color: theme.colors.onPrimary,
                fontSize: theme.fonts.labelMedium.fontSize,
                fontFamily: theme.fonts.labelMedium.fontFamily,
                fontWeight: 'bold',
              }}
            >
              {formatPrice()}
            </Text>
          </View>

          {/* ProductMetrics */}
          <ProductMetrics
            viewCount={viewCount}
            downloadCount={downloadCount}
            likeCount={likeCount}
            size="sm"
            testID={`${testID}-metrics`}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
