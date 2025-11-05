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

  const headerY = useSharedValue(-20);
  const headerOpacity = useSharedValue(0);
  const imageY = useSharedValue(20);
  const imageOpacity = useSharedValue(0);
  const inputY = useSharedValue(20);
  const inputOpacity = useSharedValue(0);
  const rolesY = useSharedValue(20);
  const rolesOpacity = useSharedValue(0);
  const buttonY = useSharedValue(20);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  <Upload size={32} color="#A3A3A3" />
                </View>
              )}
            </View>
            <View style={styles.uploadBadge}>
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.uploadBadgeGradient}
              >
                <Upload size={16} color="#F5F5F5" />
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
    backgroundColor: '#0A0A0A',
  },
  scrollContent: {
    padding: 32,
    gap: 32,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#A3A3A3',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  imageSection: {
    alignItems: 'center',
    gap: 16,
  },
  imageContainer: {
    position: 'relative',
  },
  imageWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
    borderWidth: 2,
    borderColor: '#404040',
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
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  uploadBadgeGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLabel: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  inputSection: {
    gap: 8,
  },
  rolesSection: {
    gap: 16,
  },
  rolesLabel: {
    color: '#D4D4D4',
    fontSize: 16,
    fontWeight: '600',
  },
  rolesContainer: {
    gap: 12,
  },
  roleCard: {
    marginBottom: 0,
  },
  buttonSection: {
    gap: 16,
    paddingTop: 16,
  },
  continueButton: {
    marginBottom: 0,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  skipButtonText: {
    color: '#A3A3A3',
    fontSize: 16,
    fontWeight: '500',
  },
});
