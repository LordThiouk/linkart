import React from 'react';
import { View, ViewStyle, TouchableOpacity } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { ProductIcon, ProductTitle, ProductTags, Badge } from '../atoms';
import { AudioPlayer } from './AudioPlayer';
import { RatingStars } from './RatingStars';
import { UserProfile } from './UserProfile';
import { PriceDisplay } from './PriceDisplay';
import { ProductPreviewData } from '../../types';
import { tokens } from '../../theme';

const iconMap = {
  beat: 'music-note',
  kit: 'archive-music-outline',
  sample: 'waveform',
  service: 'headphones',
};

export interface ProductPreviewProps extends ProductPreviewData {
  onPress?: () => void;
  onPlayPreview?: () => void;
  style?: ViewStyle;
  testID?: string;
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
          },
          style,
        ]}
      >
        <Card.Content>
          {isBoosted && (
            <View style={{ marginBottom: tokens.spacing.sm }}>
              <Badge variant="warning" size="small">
                Boosté
              </Badge>
            </View>
          )}

          <View style={{ flexDirection: 'row', marginBottom: tokens.spacing.md }}>
            <ProductIcon size={64} iconName={iconMap[(type as keyof typeof iconMap) || 'beat']} />

            <View style={{ flex: 1, marginLeft: tokens.spacing.md }}>
              <ProductTitle>{title}</ProductTitle>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: tokens.spacing.xs }}>
                <PriceDisplay amount={price} currency={currency} size="medium" />
                {license && (
                  <Chip mode="outlined" compact style={{ marginLeft: tokens.spacing.sm }}>
                    {license}
                  </Chip>
                )}
              </View>

              {rating !== undefined && (
                <View style={{ marginTop: tokens.spacing.xs }}>
                  <RatingStars rating={rating} size={16} readonly />
                </View>
              )}
            </View>
          </View>

          <UserProfile
            name={creator.name}
            avatarUri={creator.avatarUri}
            rating={creator.rating}
            isVerified={creator.isVerified}
            size="small"
            showRating={false}
            showLocation={false}
          />

          {(tags.length > 0 || genre || bpm) && (
            <View style={{ marginTop: tokens.spacing.md }}>
              <ProductTags>{[...(genre ? [genre] : []), ...(bpm ? [`${bpm} BPM`] : []), ...tags]}</ProductTags>
            </View>
          )}

          {previewUri && (
            <View style={{ marginTop: tokens.spacing.md }}>
              <AudioPlayer uri={previewUri} onPlay={onPlayPreview} />
            </View>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};
