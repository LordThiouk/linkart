import React, { useState } from 'react';
import { View, StyleSheet, ImageStyle } from 'react-native';
import { Image as ExpoImage, ImageProps as ExpoImageProps, ImageErrorEventData } from 'expo-image';

interface ImageWithFallbackProps extends Omit<ExpoImageProps, 'source'> {
  src?: string;
  alt?: string;
  style?: ImageStyle | ImageStyle[];
  testID?: string;
}

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

export function ImageWithFallback({ src, alt, style, testID, onError, ...props }: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);

  const handleError = (error: ImageErrorEventData) => {
    setDidError(true);
    onError?.(error);
  };

  if (didError || !src) {
    return (
      <View style={[styles.container, styles.errorContainer, style]} testID={testID}>
        <ExpoImage
          source={{ uri: ERROR_IMG_SRC }}
          contentFit="contain"
          style={styles.errorImage}
          transition={200}
          cachePolicy="memory-disk"
        />
      </View>
    );
  }

  return (
    <ExpoImage
      source={{ uri: src }}
      alt={alt}
      style={style}
      onError={handleError}
      contentFit="cover"
      transition={200}
      cachePolicy="memory-disk"
      testID={testID}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1A',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
  },
  errorImage: {
    width: 44,
    height: 44,
    opacity: 0.3,
  },
});
