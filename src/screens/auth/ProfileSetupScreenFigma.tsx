import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
// Note: expo-image-picker must be installed: npx expo install expo-image-picker
// import * as ImagePicker from 'expo-image-picker';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withDelay } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Upload, Headphones, ShoppingBag, Users, LucideIcon } from 'lucide-react-native';
import { InputField } from '../../components/atoms/InputField';
import { RoleCardFigma } from '../../components/atoms/RoleCardFigma';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { ImageWithFallback } from '../../components/atoms/ImageWithFallback';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

interface Role {
  id: 'buyer' | 'seller' | 'both';
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ProfileSetupScreenFigmaProps {
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
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Détecter si on est dans Storybook (navigateur)
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  // Initialiser les valeurs différemment selon l'environnement
  const headerY = useSharedValue(isStorybook ? 0 : -20);
  const headerOpacity = useSharedValue(isStorybook ? 1 : 0);
  const imageY = useSharedValue(isStorybook ? 0 : 20);
  const imageOpacity = useSharedValue(isStorybook ? 1 : 0);
  const inputY = useSharedValue(isStorybook ? 0 : 20);
  const inputOpacity = useSharedValue(isStorybook ? 1 : 0);
  const rolesY = useSharedValue(isStorybook ? 0 : 20);
  const rolesOpacity = useSharedValue(isStorybook ? 1 : 0);
  const buttonY = useSharedValue(isStorybook ? 0 : 20);
  const buttonOpacity = useSharedValue(isStorybook ? 1 : 0);

  useEffect(() => {
    // Dans Storybook, les animations sont déjà à leur état final
    if (isStorybook) return;

    // Header animation
    headerY.value = withTiming(0, { duration: 500 });
    headerOpacity.value = withTiming(1, { duration: 500 });

    // Image animation
    imageY.value = withDelay(100, withTiming(0, { duration: 500 }));
    imageOpacity.value = withDelay(100, withTiming(1, { duration: 500 }));

    // Input animation
    inputY.value = withDelay(200, withTiming(0, { duration: 500 }));
    inputOpacity.value = withDelay(200, withTiming(1, { duration: 500 }));

    // Roles animation
    rolesY.value = withDelay(300, withTiming(0, { duration: 500 }));
    rolesOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));

    // Button animation
    buttonY.value = withDelay(700, withTiming(0, { duration: 500 }));
    buttonOpacity.value = withDelay(700, withTiming(1, { duration: 500 }));
  }, [isStorybook]);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerY.value }],
    opacity: headerOpacity.value,
  }));

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: imageY.value }],
    opacity: imageOpacity.value,
  }));

  const inputAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: inputY.value }],
    opacity: inputOpacity.value,
  }));

  const rolesAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: rolesY.value }],
    opacity: rolesOpacity.value,
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonY.value }],
    opacity: buttonOpacity.value,
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
        {/* Header */}
        <AnimatedView style={[styles.header, headerAnimatedStyle]}>
          <Text style={styles.title}>Configurez votre profil</Text>
          <Text style={styles.subtitle}>Personnalisez votre expérience</Text>
        </AnimatedView>

        {/* Profile Image Upload */}
        <AnimatedView style={[styles.imageSection, imageAnimatedStyle]}>
          <TouchableOpacity onPress={handleImageUpload} style={styles.imageContainer} activeOpacity={0.9}>
            <View style={styles.imageWrapper}>
              {profileImage ? (
                <ImageWithFallback src={profileImage} alt="Profile" style={styles.profileImage} />
              ) : (
                <View style={styles.placeholderImage}>
                  <Upload size={32} color={colors.textMuted} />
                </View>
              )}
            </View>
            <View style={styles.uploadBadge}>
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.uploadBadgeGradient}
              >
                <Upload size={16} color={colors.textPrimary} />
              </LinearGradient>
            </View>
          </TouchableOpacity>
          <Text style={styles.imageLabel}>Ajouter une photo de profil</Text>
        </AnimatedView>

        {/* Artist Name Input */}
        <AnimatedView style={[styles.inputSection, inputAnimatedStyle]}>
          <InputField
            label="Nom d'artiste"
            placeholder="Entrez votre nom d'artiste"
            value={artistName}
            onChangeText={setArtistName}
          />
        </AnimatedView>

        {/* Role Selection */}
        <AnimatedView style={[styles.rolesSection, rolesAnimatedStyle]}>
          <Text style={styles.rolesLabel}>Votre rôle</Text>
          <View style={styles.rolesContainer}>
            {roles.map((role, index) => (
              <RoleCardFigma
                key={role.id}
                icon={role.icon}
                title={role.title}
                description={role.description}
                selected={selectedRole === role.id}
                onPress={() => setSelectedRole(role.id)}
                style={styles.roleCard}
              />
            ))}
          </View>
        </AnimatedView>

        {/* Buttons */}
        <AnimatedView style={[styles.buttonSection, buttonAnimatedStyle]}>
          <PrimaryButton onPress={handleContinue} fullWidth disabled={!canContinue} style={styles.continueButton}>
            Continuer
          </PrimaryButton>

          <TouchableOpacity onPress={onSkip} style={styles.skipButton} activeOpacity={0.8}>
            <Text style={styles.skipButtonText}>Passer pour l'instant</Text>
          </TouchableOpacity>
        </AnimatedView>
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
    paddingBottom: spacing.xl + spacing.sm, // 40px
  },
  header: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.displayXl - 4, // 28px (between headingLg and displayXl)
    fontFamily: typography.fontFamily.poppins.bold,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
  },
  imageSection: {
    alignItems: 'center',
    gap: spacing.md,
  },
  imageContainer: {
    position: 'relative',
  },
  imageWrapper: {
    width: 96, // w-24 (specific size)
    height: 96, // h-24
    borderRadius: radii.full, // 48 = width/2 (circle)
    overflow: 'hidden',
    backgroundColor: colors.surfaceElevated,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32, // w-8 (specific size)
    height: 32, // h-8
    borderRadius: radii.full, // 16 = width/2 (circle)
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: spacing.xs },
    shadowOpacity: 0.3,
    shadowRadius: spacing.sm,
    elevation: 6,
  },
  uploadBadgeGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  inputSection: {
    gap: spacing.sm,
  },
  rolesSection: {
    gap: spacing.md,
  },
  rolesLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  rolesContainer: {
    gap: spacing.md,
  },
  roleCard: {
    marginBottom: 0,
  },
  buttonSection: {
    gap: spacing.md,
    paddingTop: spacing.md,
  },
  continueButton: {
    marginBottom: 0,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  skipButtonText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
