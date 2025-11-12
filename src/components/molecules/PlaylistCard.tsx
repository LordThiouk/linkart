import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useTheme } from 'react-native-paper';
import { PlayButton } from '../atoms/PlayButton';
import Badge from '../atoms/Badge';

export interface PlaylistCardProps {
  id: string;
  title: string;
  description?: string;
  typebeat?: string;
  ambiance?: string;
  beatCount: number;
  duration?: string;
  coverImage?: string;
  isPlaying?: boolean;
  onPress: (playlistId: string) => void;
  onPlay?: (playlistId: string) => void;
  testID?: string;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({
  id,
  title,
  description,
  typebeat,
  ambiance,
  beatCount,
  duration,
  coverImage,
  isPlaying = false,
  onPress,
  onPlay,
  testID,
}) => {
  const theme = useTheme();

  const handleCardPress = () => {
    onPress(id);
  };

  const handlePlayPress = () => {
    if (onPlay) {
      onPlay(id);
    }
  };

  const formatBeatCount = () => {
    return `${beatCount} beat${beatCount > 1 ? 's' : ''}`;
  };

  const formatMetadata = () => {
    const parts = [];
    if (typebeat) parts.push(typebeat);
    if (ambiance) parts.push(ambiance);
    return parts.join(' • ');
  };

  const renderCoverImage = () => {
    if (coverImage) {
      return (
        <ImageBackground source={{ uri: coverImage }} style={styles.coverImage} imageStyle={styles.coverImageStyle}>
          <View style={styles.imageOverlay} />
        </ImageBackground>
      );
    }

    // Fallback gradient background
    return (
      <View style={[styles.coverImage, styles.gradientBackground]}>
        <View style={styles.imageOverlay} />
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.surface }]}
      onPress={handleCardPress}
      testID={testID}
      activeOpacity={0.7}
    >
      {/* Image de couverture */}
      <View style={styles.imageContainer}>
        {renderCoverImage()}

        {/* PlayButton overlay */}
        <View style={styles.playButtonContainer}>
          <PlayButton isPlaying={isPlaying} size="lg" onPress={handlePlayPress} testID={`${testID}-play-button`} />
        </View>

        {/* Badge durée */}
        {duration && (
          <View style={styles.durationBadge}>
            <Badge variant="default" size="sm">
              {duration}
            </Badge>
          </View>
        )}
      </View>

      {/* Contenu */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.onSurface }]} numberOfLines={2}>
          {title}
        </Text>

        {description && (
          <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]} numberOfLines={2}>
            {description}
          </Text>
        )}

        {/* Métadonnées */}
        <View style={styles.metadata}>
          {formatMetadata() && (
            <Text style={[styles.metadataText, { color: theme.colors.onSurfaceVariant }]}>{formatMetadata()}</Text>
          )}

          <Text style={[styles.beatCount, { color: theme.colors.onSurfaceVariant }]}>{formatBeatCount()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
    height: 160,
    width: '100%',
  },
  coverImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  coverImageStyle: {
    borderRadius: 0,
  },
  gradientBackground: {
    backgroundColor: '#6366F1', // Primary color fallback
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButtonContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -24 }, { translateY: -24 }], // Half of lg button size (48px)
  },
  durationBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metadataText: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  beatCount: {
    fontSize: 12,
    fontWeight: '600',
  },
});
