import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Music2, DollarSign, Users, LucideIcon } from 'lucide-react-native';
import { OnboardingSlideFigma } from './OnboardingSlideFigma';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { useSharedValue } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SlideData {
  title: string;
  description: string;
  gradient: [string, string] | [string, string, string];
  icon: LucideIcon;
}

interface OnboardingCarouselFigmaProps {
  onComplete: () => void;
  style?: ViewStyle;
  testID?: string;
}

const slides: SlideData[] = [
  {
    title: 'Découvrez la musique',
    description:
      'Explorez des milliers de beats, instrumentaux et sons uniques créés par des artistes talentueux du monde entier.',
    gradient: ['#6366F1', '#8B5CF6'],
    icon: Music2,
  },
  {
    title: 'Vendez vos beats',
    description:
      "Monétisez votre créativité. Publiez vos productions et gagnez de l'argent en vendant vos beats à d'autres artistes.",
    gradient: ['#F59E0B', '#EC4899'],
    icon: DollarSign,
  },
  {
    title: 'Connectez avec des artistes',
    description: 'Rejoignez une communauté créative. Collaborez, partagez et créez des connexions authentiques.',
    gradient: ['#8B5CF6', '#EC4899', '#06B6D4'],
    icon: Users,
  },
];

export function OnboardingCarouselFigma({ onComplete, style, testID }: OnboardingCarouselFigmaProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useSharedValue(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slides.length;
      setCurrentSlide(nextSlide);
      flatListRef.current?.scrollToIndex({ index: nextSlide, animated: true });
    }, 4000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handlePrevious = () => {
    if (currentSlide > 0) {
      const prevSlide = currentSlide - 1;
      setCurrentSlide(prevSlide);
      flatListRef.current?.scrollToIndex({ index: prevSlide, animated: true });
    }
  };

  const handleScroll = (event: any) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentSlide(index);
  };

  const renderSlide = ({ item, index }: { item: SlideData; index: number }) => (
    <View style={styles.slideContainer}>
      <OnboardingSlideFigma
        title={item.title}
        description={item.description}
        gradient={item.gradient}
        icon={item.icon}
      />
    </View>
  );

  const renderPagination = () => {
    return (
      <View style={styles.pagination}>
        {slides.map((_, index) => {
          const isActive = index === currentSlide;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setCurrentSlide(index);
                flatListRef.current?.scrollToIndex({ index, animated: true });
              }}
              style={styles.paginationDot}
              activeOpacity={0.8}
            >
              {isActive ? (
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.paginationDotActive}
                />
              ) : (
                <View style={styles.paginationDotInactive} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderSlide}
          keyExtractor={(item, index) => `slide-${index}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onMomentumScrollEnd={event => {
            const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
            setCurrentSlide(index);
          }}
          onScrollToIndexFailed={info => {
            // Handle scroll to index failure
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
            });
          }}
        />
      </View>

      <View style={styles.footer}>
        {renderPagination()}

        <PrimaryButton onPress={onComplete} fullWidth style={styles.button}>
          Commencer
        </PrimaryButton>

        {currentSlide > 0 && (
          <TouchableOpacity onPress={handlePrevious} style={styles.backButton} activeOpacity={0.8}>
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  carouselContainer: {
    flex: 1,
  },
  slideContainer: {
    width: SCREEN_WIDTH,
    flex: 1,
  },
  footer: {
    padding: 32,
    gap: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 32,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  paginationDotActive: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  paginationDotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#404040',
  },
  button: {
    marginBottom: 0,
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  backButtonText: {
    color: '#A3A3A3',
    fontSize: 16,
    fontWeight: '500',
  },
});
