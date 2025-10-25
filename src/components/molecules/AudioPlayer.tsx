import React, { useState, useRef } from 'react';
import { View, ViewStyle } from 'react-native';
import { Button, IconButton, ProgressBar } from 'react-native-paper';
import { Audio } from 'expo-av';
import { useTheme } from 'react-native-paper';
import { tokens } from '../../theme';

export interface AudioPlayerProps {
  uri: string;
  duration?: number;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  uri,
  duration = 30, // 30 secondes max pour les previews
  onPlay,
  onPause,
  onEnd,
  style,
  testID,
}) => {
  const theme = useTheme();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          padding: tokens.spacing.md,
          backgroundColor: theme.colors.surface,
          borderRadius: tokens.radii.md,
        },
        style,
      ]}
      testID={testID}
    >
      <IconButton
        icon={isPlaying ? 'pause' : 'play'}
        size={24}
        onPress={handlePlayPause}
        disabled={isLoading}
        iconColor={theme.colors.primary}
      />

      <View style={{ flex: 1, marginHorizontal: tokens.spacing.sm }}>
        <ProgressBar progress={position} color={theme.colors.primary} style={{ height: 4 }} />
      </View>

      <Button mode="text" onPress={stopSound} disabled={!isPlaying && position === 0} compact>
        Arrêter
      </Button>
    </View>
  );
};
