# 📱 Conversion des Écrans - React Web → React Native

## 📋 Écrans à Convertir

### Auth Flow (5 écrans)

1. ✅ SplashScreen
2. ✅ WelcomeScreen
3. ✅ LoginScreen
4. ✅ OTPVerificationScreen
5. ✅ ProfileSetupScreen

### Main Flow (15+ écrans)

6. ✅ HomeScreen
7. ✅ BeatDetailsScreen
8. ✅ ServiceDetailsScreen
9. ✅ MarketplaceScreen
10. ✅ SearchFiltersScreen
11. ✅ CheckoutScreen
12. ✅ PaymentScreen
13. ✅ PaymentSuccessScreen
14. ✅ UploadScreen
15. ✅ InboxScreen
16. ✅ ChatScreen
17. ✅ ProfileScreen
18. ✅ WalletScreen
19. ✅ MyPurchasesScreen
20. ✅ NotificationsScreen

---

## 🎬 1. SplashScreen

### Web (Actuel)

```tsx
// components/SplashScreen.tsx
export default function SplashScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-white text-6xl font-bold mb-4">Linkart</h1>
        <div className="animate-pulse text-white text-sm">Loading...</div>
      </div>
    </div>
  );
}
```

### React Native (Converti)

```tsx
// src/screens/auth/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export default function SplashScreen() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.5, { duration: 1000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.logo}>Linkart</Text>
          <Animated.View style={animatedStyle}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </Animated.View>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 24,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 56,
    fontWeight: 'bold',
    letterSpacing: -2,
  },
});
```

---

## 👋 2. WelcomeScreen

### Web (Actuel)

```tsx
// components/WelcomeScreen.tsx
export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] px-6 flex flex-col">
      <OnboardingCarousel />

      <div className="mt-auto pb-8">
        <PrimaryButton title="Commencer" onClick={onGetStarted} fullWidth />
        <button className="text-[#A3A3A3] text-sm mt-4">Déjà membre ? Se connecter</button>
      </div>
    </div>
  );
}
```

### React Native (Converti)

```tsx
// src/screens/auth/WelcomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingCarousel from '../../components/OnboardingCarousel';
import PrimaryButton from '../../components/common/PrimaryButton';
import { WelcomeScreenNavigationProp } from '../../navigation/types';

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <OnboardingCarousel />

          <View style={styles.footer}>
            <PrimaryButton
              title="Commencer"
              onPress={() => navigation.navigate('Login')}
              fullWidth
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.7}
              style={styles.loginButton}
            >
              <Text style={styles.loginText}>
                Déjà membre ? <Text style={styles.loginLink}>Se connecter</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: 32,
    gap: 16,
  },
  loginButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  loginText: {
    color: '#A3A3A3',
    fontSize: 14,
  },
  loginLink: {
    color: '#6366F1',
    fontWeight: '600',
  },
});
```

---

## 🔐 3. LoginScreen

### Web (Actuel)

```tsx
// components/LoginScreen.tsx
export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <div className="min-h-screen bg-[#0A0A0A] px-6 py-8">
      <button onClick={onBack}>
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      <h1 className="text-white text-3xl font-bold mt-8 mb-2">Connexion</h1>
      <p className="text-[#A3A3A3] mb-8">Entrez votre numéro de téléphone</p>

      <InputField
        label="Numéro de téléphone"
        value={phoneNumber}
        onChange={setPhoneNumber}
        type="tel"
        placeholder="+225 07 00 00 00 00"
      />

      <PrimaryButton
        title="Continuer"
        onClick={() => onLogin(phoneNumber)}
        fullWidth
        disabled={phoneNumber.length < 10}
      />
    </div>
  );
}
```

### React Native (Converti)

```tsx
// src/screens/auth/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import InputField from '../../components/common/InputField';
import PrimaryButton from '../../components/common/PrimaryButton';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('OTPVerification', { phoneNumber });
    }, 1500);
  };

  const isValid = phoneNumber.length >= 10;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
                style={styles.backButton}
              >
                <Icon name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Title */}
            <View style={styles.titleSection}>
              <Text style={styles.title}>Connexion</Text>
              <Text style={styles.subtitle}>Entrez votre numéro de téléphone</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <InputField
                label="Numéro de téléphone"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="+225 07 00 00 00 00"
                keyboardType="phone-pad"
              />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <PrimaryButton
                title="Continuer"
                onPress={handleLogin}
                fullWidth
                disabled={!isValid}
                loading={loading}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  titleSection: {
    marginBottom: 32,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#A3A3A3',
    fontSize: 16,
  },
  form: {
    marginBottom: 32,
  },
  footer: {
    marginTop: 'auto',
  },
});
```

---

## 🏠 4. HomeScreen

### Web (Actuel)

```tsx
// components/HomeScreen.tsx
export default function HomeScreen() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-bold">Linkart</h1>
        <div className="flex items-center gap-4">
          <Bell className="w-6 h-6 text-white" />
          <User className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Hero Carousel */}
      <HeroCarousel playlists={mockPlaylists} />

      {/* Playlists */}
      <h2 className="text-white text-xl font-bold mt-8 mb-4">Playlists Populaires</h2>
      <div className="flex gap-4 overflow-x-auto">
        {playlists.map(playlist => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>

      {/* Trending Beats */}
      <h2 className="text-white text-xl font-bold mt-8 mb-4">Beats Tendances</h2>
      <div className="grid grid-cols-2 gap-4">
        {beats.map(beat => (
          <ProductCard key={beat.id} beat={beat} />
        ))}
      </div>
    </div>
  );
}
```

### React Native (Converti)

```tsx
// src/screens/home/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeroCarousel from '../../components/HeroCarousel';
import PlaylistCard from '../../components/cards/PlaylistCard';
import ProductCard from '../../components/cards/ProductCard';
import { mockBeats, mockPlaylists } from '../../utils/mockData';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [beats, setBeats] = useState(mockBeats.slice(0, 6));
  const [playlists, setPlaylists] = useState(mockPlaylists);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={beats}
          numColumns={2}
          keyExtractor={item => item.id}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366F1" />
          }
          ListHeaderComponent={
            <>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.logo}>Linkart</Text>
                <View style={styles.headerActions}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Notifications')}
                    activeOpacity={0.7}
                  >
                    <Icon name="notifications-outline" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    activeOpacity={0.7}
                  >
                    <Icon name="person-circle-outline" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Hero Carousel */}
              <HeroCarousel playlists={playlists} />

              {/* Playlists Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Playlists Populaires</Text>
                <FlatList
                  data={playlists}
                  horizontal
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <PlaylistCard
                      playlist={item}
                      onPress={() => {
                        /* Navigate */
                      }}
                    />
                  )}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.playlistsList}
                />
              </View>

              {/* Trending Beats Title */}
              <Text style={[styles.sectionTitle, styles.beatsTitle]}>Beats Tendances</Text>
            </>
          }
          renderItem={({ item }) => (
            <ProductCard
              beat={item}
              onPress={() => navigation.navigate('BeatDetails', { beatId: item.id })}
            />
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 100, // Space for tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  section: {
    marginTop: 32,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  playlistsList: {
    gap: 16,
  },
  beatsTitle: {
    marginTop: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});
```

---

## 🛒 5. CheckoutScreen

### Web (Actuel)

```tsx
// components/CheckoutScreen.tsx
export default function CheckoutScreen({ productId, onProceedToPayment }: CheckoutScreenProps) {
  const [selectedLicense, setSelectedLicense] = useState(licenses[0]);
  const [promoCode, setPromoCode] = useState('');

  return (
    <div className="min-h-screen bg-[#0A0A0A] px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-2xl font-bold">Checkout</h1>
      </div>

      {/* Product Info */}
      <div className="bg-[#111111] rounded-2xl p-4 mb-6">
        <img src={beat.cover} className="w-full h-48 rounded-xl mb-4" />
        <h2 className="text-white text-xl font-bold">{beat.title}</h2>
        <p className="text-[#A3A3A3]">{beat.producer}</p>
      </div>

      {/* License Selection */}
      <h3 className="text-white mb-4">Choisir une licence</h3>
      <div className="flex flex-col gap-3">
        {licenses.map(license => (
          <LicenseCard
            key={license.id}
            license={license}
            selected={selectedLicense.id === license.id}
            onSelect={() => setSelectedLicense(license)}
          />
        ))}
      </div>

      {/* Promo Code */}
      <InputField
        label="Code promo"
        value={promoCode}
        onChange={setPromoCode}
        placeholder="LINKART10"
      />

      {/* Price Summary */}
      <div className="bg-[#111111] rounded-2xl p-4">
        <div className="flex justify-between mb-2">
          <span className="text-[#A3A3A3]">Prix</span>
          <span className="text-white">{basePrice.toLocaleString()} F</span>
        </div>
        {/* ... */}
      </div>

      <PrimaryButton title="Procéder au paiement" onClick={handleProceed} fullWidth />
    </div>
  );
}
```

### React Native (Converti)

```tsx
// src/screens/purchases/CheckoutScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import InputField from '../../components/common/InputField';
import PrimaryButton from '../../components/common/PrimaryButton';
import LicenseCard from '../../components/cards/LicenseCard';
import { mockBeats } from '../../utils/mockData';

const licenses = [
  { id: 'basic', name: 'Basic', price: 15000, features: ['MP3 Download', 'Non-commercial'] },
  { id: 'premium', name: 'Premium', price: 49000, features: ['WAV + MP3', 'Unlimited streams'] },
  { id: 'exclusive', name: 'Exclusive', price: 299000, features: ['Full rights', 'All files'] },
];

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params;

  const beat = mockBeats.find(b => b.id === productId);
  const [selectedLicense, setSelectedLicense] = useState(licenses[1]);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const basePrice = selectedLicense.price;
  const discount = promoApplied ? Math.round(basePrice * 0.1) : 0;
  const total = basePrice - discount;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'LINKART10') {
      setPromoApplied(true);
    }
  };

  const handleProceed = () => {
    navigation.navigate('Payment', {
      checkoutData: {
        productId,
        licenseType: selectedLicense.name,
        price: basePrice,
        total,
      },
    });
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <Icon name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Checkout</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Product Card */}
            <View style={styles.productCard}>
              <Image
                source={{ uri: beat.coverImage }}
                style={styles.coverImage}
                resizeMode="cover"
              />
              <Text style={styles.beatTitle}>{beat.title}</Text>
              <Text style={styles.producer}>{beat.producer}</Text>
            </View>

            {/* License Selection */}
            <Text style={styles.sectionTitle}>Choisir une licence</Text>
            <View style={styles.licensesContainer}>
              {licenses.map(license => (
                <LicenseCard
                  key={license.id}
                  license={license}
                  selected={selectedLicense.id === license.id}
                  onSelect={() => setSelectedLicense(license)}
                />
              ))}
            </View>

            {/* Promo Code */}
            <View style={styles.promoSection}>
              <InputField
                label="Code promo"
                value={promoCode}
                onChangeText={setPromoCode}
                placeholder="LINKART10"
              />
              <TouchableOpacity
                onPress={handleApplyPromo}
                activeOpacity={0.8}
                style={styles.applyButton}
              >
                <Text style={styles.applyButtonText}>Appliquer</Text>
              </TouchableOpacity>
            </View>

            {promoApplied && (
              <View style={styles.promoSuccess}>
                <Icon name="checkmark-circle" size={20} color="#10B981" />
                <Text style={styles.promoSuccessText}>Code promo appliqué ! -10%</Text>
              </View>
            )}

            {/* Price Summary */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Résumé</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Prix</Text>
                <Text style={styles.summaryValue}>{basePrice.toLocaleString()} F</Text>
              </View>

              {promoApplied && (
                <View style={styles.summaryRow}>
                  <Text style={styles.discountLabel}>Réduction (10%)</Text>
                  <Text style={styles.discountValue}>-{discount.toLocaleString()} F</Text>
                </View>
              )}

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total à payer</Text>
                <Text style={styles.totalValue}>{total.toLocaleString()} F</Text>
              </View>

              <View style={styles.infoBox}>
                <Icon name="information-circle-outline" size={16} color="#06B6D4" />
                <Text style={styles.infoText}>
                  Aucun frais supplémentaire. Commission déduite du vendeur.
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Footer Button */}
          <View style={styles.footer}>
            <PrimaryButton title="Procéder au paiement" onPress={handleProceed} fullWidth />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    padding: 24,
    paddingBottom: 120,
  },
  productCard: {
    backgroundColor: '#111111',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  coverImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  beatTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  producer: {
    color: '#A3A3A3',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  licensesContainer: {
    gap: 12,
    marginBottom: 24,
  },
  promoSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  applyButton: {
    backgroundColor: '#262626',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  promoSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#10B981/10',
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  promoSuccessText: {
    color: '#10B981',
    fontSize: 14,
  },
  summaryCard: {
    backgroundColor: '#111111',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#404040',
    padding: 16,
    marginBottom: 24,
  },
  summaryTitle: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    color: '#A3A3A3',
    fontSize: 14,
  },
  summaryValue: {
    color: '#D4D4D4',
    fontSize: 14,
  },
  discountLabel: {
    color: '#10B981',
    fontSize: 14,
  },
  discountValue: {
    color: '#10B981',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#404040',
    marginVertical: 12,
  },
  totalLabel: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoBox: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#404040',
  },
  infoText: {
    flex: 1,
    color: '#737373',
    fontSize: 12,
    lineHeight: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0A0A0A',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#262626',
  },
});
```

---

## 📱 Patterns Récurrents

### SafeAreaView + StatusBar

**Toujours inclure** :

```tsx
<>
  <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
  <SafeAreaView style={styles.container}>{/* content */}</SafeAreaView>
</>
```

### KeyboardAvoidingView

**Pour les formulaires** :

```tsx
<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
  <ScrollView keyboardShouldPersistTaps="handled">{/* form */}</ScrollView>
</KeyboardAvoidingView>
```

### FlatList au lieu de map()

**Web** :

```tsx
<div className="grid grid-cols-2 gap-4">
  {beats.map(beat => (
    <ProductCard key={beat.id} beat={beat} />
  ))}
</div>
```

**React Native** :

```tsx
<FlatList
  data={beats}
  numColumns={2}
  keyExtractor={item => item.id}
  renderItem={({ item }) => <ProductCard beat={item} />}
  columnWrapperStyle={{ gap: 16 }}
/>
```

### Navigation

**Web** :

```tsx
onClick={() => navigate('/beat/' + beat.id)}
```

**React Native** :

```tsx
onPress={() => navigation.navigate('BeatDetails', { beatId: beat.id })}
```

---

## ✅ Checklist par Écran

Pour chaque écran, vérifier :

- [ ] SafeAreaView + StatusBar configurés
- [ ] Navigation (goBack, navigate) implémentée
- [ ] `<div>` → `<View>` convertis
- [ ] `<span>`, `<p>`, `<h1>` → `<Text>` convertis
- [ ] `<img>` → `<Image>` avec `source={{ uri }}` et `resizeMode`
- [ ] `<button>` → `<TouchableOpacity>` avec `activeOpacity`
- [ ] `onClick` → `onPress` convertis
- [ ] `className` → `style={styles.x}` convertis
- [ ] Lists avec `FlatList` au lieu de `map()`
- [ ] KeyboardAvoidingView pour formulaires
- [ ] Loading states avec `ActivityIndicator`
- [ ] Error handling approprié
- [ ] RefreshControl si nécessaire
- [ ] Platform-specific code si nécessaire

---

**Version**: 1.0.0  
**Dernière Mise à Jour**: Novembre 2024
