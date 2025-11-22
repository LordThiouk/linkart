import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Headphones, ShoppingBag, Users } from 'lucide-react-native';
import { InputField } from '@/components/atoms/InputField';
import { ProfileSetupHeader, AvatarUpload, RoleSelector, FormActions, type Role } from '../components';
import { colors, spacing } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface ProfileSetupScreenFigmaProps {
  onComplete: () => void;
  onSkip: () => void;
}

const roles: Role[] = [
  {
    id: 'buyer',
    icon: Headphones,
    title: 'Acheteur',
    description: 'Je cherche des beats et des sons pour mes projets',
  },
  {
    id: 'seller',
    icon: ShoppingBag,
    title: 'Vendeur',
    description: 'Je veux vendre mes productions et beats',
  },
  {
    id: 'both',
    icon: Users,
    title: 'Les deux',
    description: "J'achète et je vends de la musique",
  },
];

export function ProfileSetupScreenFigma({ onComplete, onSkip }: ProfileSetupScreenFigmaProps) {
  const [artistName, setArtistName] = useState('');
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller' | 'both' | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profileImage, _setProfileImage] = useState<string | null>(null);

  // Détecter si on est dans Storybook
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  const inputY = useSharedValue(isStorybook ? 0 : 20);
  const inputOpacity = useSharedValue(isStorybook ? 1 : 0);

  useEffect(() => {
    if (isStorybook) return;

    inputY.value = withDelay(200, withTiming(0, { duration: 500 }));
    inputOpacity.value = withDelay(200, withTiming(1, { duration: 500 }));
  }, [isStorybook]);

  const inputAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: inputY.value }],
    opacity: inputOpacity.value,
  }));

  const handleImageUpload = async () => {
    // Note: Install expo-image-picker first: npx expo install expo-image-picker
    // Then uncomment this code:
    /*
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission requise', 'Nous avons besoin de la permission pour accéder à vos photos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Erreur', "Impossible de sélectionner l'image.");
    }
    */
    // Temporary placeholder
    Alert.alert('Image Picker', 'expo-image-picker doit être installé pour cette fonctionnalité');
  };

  const handleContinue = () => {
    if (artistName && selectedRole) {
      onComplete();
    }
  };

  const canContinue = artistName.trim().length > 0 && selectedRole !== null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        <ProfileSetupHeader title="Configurez votre profil" subtitle="Personnalisez votre expérience" />

        <AvatarUpload imageUri={profileImage} onUpload={handleImageUpload} />

        <AnimatedView style={[styles.inputSection, inputAnimatedStyle]}>
          <InputField
            label="Nom d'artiste"
            placeholder="Entrez votre nom d'artiste"
            value={artistName}
            onChangeText={setArtistName}
          />
        </AnimatedView>

        <RoleSelector roles={roles} selectedRole={selectedRole} onSelectRole={setSelectedRole} />

        <FormActions canContinue={canContinue} onContinue={handleContinue} onSkip={onSkip} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.xl,
    gap: spacing.xl,
    paddingBottom: spacing.xl + spacing.sm,
  },
  inputSection: {
    gap: spacing.sm,
  },
});
