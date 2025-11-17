import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ViewStyle } from 'react-native';
import { Audio } from 'expo-av';
import { SkipForward } from 'lucide-react-native';
import { colors, typography, spacing, radii, shadows } from '../../theme';
import { HeartIcon } from '../atoms/HeartIcon';
import { PlayButton } from '../atoms/PlayButton';

export interface AudioPlayerProps {
  title: string;
  artist: string;
  artworkUrl: string;
  uri: string;
  duration?: number;
  productId: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  onNext?: () => void;
  onPress?: () => void;
  sticky?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title,
  artist,
  artworkUrl,
  uri,
  duration = 30,
  productId,
  onPlay,
  onPause,
  onEnd,
  onNext,
  onPress,
  sticky = false,
  style,
  testID,
}) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadSound = async () => {
    try {
      setIsLoading(true);
      const { sound: newSound } = await Audio.Sound.createAsync({ uri }, { shouldPlay: false });
      setSound(newSound);
    } catch (error) {
      console.error('Erreur lors du chargement audio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const playSound = async () => {
    if (!sound) {
      await loadSound();
      return;
    }

    try {
      await sound.playAsync();
      setIsPlaying(true);
      onPlay?.();

      // Mise à jour de la position
      intervalRef.current = setInterval(async () => {
        if (sound) {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            const currentPosition = status.positionMillis || 0;
            const maxPosition = duration * 1000;

            setPosition(currentPosition / maxPosition);

            // Arrêt automatique à la durée limite
            if (currentPosition >= maxPosition) {
              await stopSound();
              onEnd?.();
            }
          }
        }
      }, 100);
    } catch (error) {
      console.error('Erreur lors de la lecture:', error);
    }
  };

  const pauseSound = async () => {
    if (sound) {
      try {
        await sound.pauseAsync();
        setIsPlaying(false);
        onPause?.();

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } catch (error) {
        console.error('Erreur lors de la pause:', error);
      }
    }
  };

  const stopSound = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        setIsPlaying(false);
        setPosition(0);

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } catch (error) {
        console.error("Erreur lors de l'arrêt:", error);
      }
    }
  };

  React.useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [sound]);

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseSound();
    } else {
      playSound();
    }
  };

  const handleNext = () => {
    onNext?.();
  };

  const handleCardPress = () => {
    onPress?.();
  };

  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.surface,
          borderRadius: radii.lg,
          padding: spacing.md,
          marginHorizontal: sticky ? 0 : spacing.md,
          marginBottom: sticky ? 0 : spacing.sm,
          ...(sticky ? shadows.lg : shadows.md),
          position: sticky ? 'absolute' : 'relative',
          bottom: sticky ? 0 : 'auto',
          left: sticky ? 0 : 'auto',
          right: sticky ? 0 : 'auto',
          zIndex: sticky ? 1000 : undefined,
        },
        style,
      ]}
      onPress={handleCardPress}
      activeOpacity={0.7}
      testID={testID}
    >
      {/* Artwork */}
      <Image
        source={{ uri: artworkUrl }}
        style={{
          width: 40,
          height: 40,
          borderRadius: radii.md,
          marginRight: spacing.md,
        }}
        resizeMode="cover"
      />

      {/* Title and Artist */}
      <View style={{ flex: 1, marginRight: spacing.sm }}>
        <Text
          style={{
            fontSize: typography.fontSize.body,
            fontFamily: typography.fontFamily.inter.medium,
            color: colors.textPrimary,
            fontWeight: typography.fontWeight.semibold,
            marginBottom: 2,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: typography.fontSize.caption,
            fontFamily: typography.fontFamily.inter.regular,
            color: colors.textMuted,
          }}
          numberOfLines={1}
        >
          {artist}
        </Text>

        {/* Progress Bar */}
        <View
          style={{
            height: 2,
            backgroundColor: colors.surfaceElevated,
            borderRadius: 1,
            marginTop: spacing.xs,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              height: '100%',
              width: `${position * 100}%`,
              backgroundColor: colors.primary,
              borderRadius: 1,
            }}
          />
        </View>
      </View>

      {/* HeartIcon */}
      <View style={{ marginRight: spacing.md }}>
        <HeartIcon productId={productId} size="sm" testID={`${testID}-heart-icon`} />
      </View>

      {/* PlayButton */}
      <View style={{ marginRight: spacing.md }}>
        <PlayButton
          isPlaying={isPlaying}
          size="sm"
          onPress={handlePlayPause}
          disabled={isLoading}
          testID={`${testID}-play-button`}
        />
      </View>

      {/* Next Button */}
      {onNext && (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            padding: spacing.xs,
            borderRadius: radii.sm,
            backgroundColor: colors.surfaceElevated,
            justifyContent: 'center',
            alignItems: 'center',
            ...shadows.sm,
          }}
          testID={`${testID}-next-button`}
        >
          <SkipForward size={20} color={colors.textMuted} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
