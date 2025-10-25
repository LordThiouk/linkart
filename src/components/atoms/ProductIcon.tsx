import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Icon } from 'react-native-paper';

interface ProductIconProps {
  iconName: string;
  size?: number;
}

export const ProductIcon: React.FC<ProductIconProps> = ({ iconName, size = 64 }) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size / 4,
      backgroundColor: theme.colors.primaryContainer,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Icon source={iconName} size={size / 2} color={theme.colors.onPrimaryContainer} />
    </View>
  );
};
