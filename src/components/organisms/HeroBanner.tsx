import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { WebLinearGradient } from '../atoms/WebLinearGradient';
import { PlayButton } from '../atoms/PlayButton';
import Button from '../atoms/Button';

interface HeroBannerProps {
  id: string;
  title: string;
  artist: string;
  duration: string;
  backgroundImage?: string;
  backgroundGradient?: string[];
  isPlaying: boolean;
  onPress: (id: string) => void;
  onPlay: (id: string) => void;
  onBuy?: (id: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  id,
  title,
  artist,
  duration,
  backgroundImage,
  backgroundGradient,
  isPlaying,
  onPress,
  onPlay,
  onBuy,
}) => {
  const renderBackgroundImage = () => {
    if (backgroundGradient) {
      // Utiliser gradient pour Storybook
      return (
        <WebLinearGradient colors={backgroundGradient} style={styles.gradientContainer}>
          {renderContent()}
        </WebLinearGradient>
      );
    }

    if (backgroundImage) {
      // Utiliser image pour l'app réelle
      return (
        <ImageBackground
          source={{ uri: backgroundImage }}
          style={styles.imageContainer}
          imageStyle={styles.imageStyle}
          onError={() => console.log('Image loading error')}
        >
          <WebLinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']} style={styles.overlay}>
            {renderContent()}
          </WebLinearGradient>
        </ImageBackground>
      );
    }

    // Fallback avec gradient par défaut
    return (
      <WebLinearGradient colors={['#6366F1', '#4F46E5', '#7C3AED']} style={styles.gradientContainer}>
        {renderContent()}
      </WebLinearGradient>
    );
  };

  const renderContent = () => (
    <View style={styles.content}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.artist}>by {artist}</Text>
        <Text style={styles.duration}>{duration}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <PlayButton isPlaying={isPlaying} size="lg" onPress={() => onPlay(id)} />
        {onBuy && <Button variant="primary" size="default" title="Acheter" onPress={() => onBuy(id)} />}
      </View>
    </View>
  );

  return <View style={styles.container}>{renderBackgroundImage()}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    height: 200,
  },
  gradientContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  imageStyle: {
    borderRadius: 12,
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  artist: {
    fontSize: 16,
    color: '#E5E7EB',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  duration: {
    fontSize: 14,
    color: '#D1D5DB',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buyButton: {
    marginLeft: 12,
  },
});
