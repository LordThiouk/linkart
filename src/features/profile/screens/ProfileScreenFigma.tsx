import React, { useState, useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ProfileHeader,
  ProfileInfo,
  ProfileQuickActions,
  ProfileStatsGrid,
  ProfileTabs,
  ProfileContent,
  type ProfileTab,
  type QuickAction,
  type ProfileStat,
  type ProfileProduct,
  type ProfileStatItem,
} from '@/features/profile/components';
import { TrendingUp, Music, Star, Award, Package, Heart, Zap, Calendar, Headphones } from 'lucide-react-native';
import { colors, spacing } from '@/theme';

export interface ProfileScreenFigmaProps {
  onMyPurchases?: () => void;
  onBoost?: () => void;
  onFavorites?: () => void;
  onBookings?: () => void;
  onShare?: () => void;
  onSettings?: () => void;
  onEdit?: () => void;
  onCreateService?: () => void;
  onProductPress?: (productId: string) => void;
}

// Mock data - should come from API/hooks
const profileData = {
  avatarUrl: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=200',
  name: 'DJ Producer Pro',
  handle: '@djproducer • Producteur & Beat Maker',
  bio: 'Producteur de beats Afrobeat, Amapiano & Trap 🎵',
  location: '📍 Lagos, Nigeria',
  stats: {
    followers: 892,
    following: 234,
  },
};

const userBeats: ProfileProduct[] = [
  {
    id: '1',
    title: 'Afrobeat Summer',
    artist: 'Vous',
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 24000,
    type: 'beat',
    bpm: 112,
    genre: 'Afrobeat',
    likes: 892,
    downloads: 456,
    rating: 4.7,
    reviewCount: 64,
  },
  {
    id: '2',
    title: 'Lagos Nights',
    artist: 'Vous',
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 29000,
    type: 'beat',
    bpm: 128,
    genre: 'Afrobeat',
    likes: 1543,
    downloads: 789,
    rating: 4.9,
    reviewCount: 102,
  },
];

const statsData: ProfileStat[] = [
  { icon: TrendingUp, label: 'Vues totales', value: '12.4K', colors: [colors.primary, colors.primaryDark] },
  { icon: Music, label: 'Beats publiés', value: '24', colors: [colors.accent, colors.secondary] },
  { icon: Star, label: 'Note moyenne', value: '4.8', colors: [colors.secondary, colors.accent] },
  { icon: Award, label: 'Ventes', value: '47', colors: [colors.cyan, colors.primaryDark] },
];

const performanceStats: ProfileStatItem[] = [
  { label: 'Revenus', value: '342 500 F', change: '+12%', positive: true },
  { label: 'Vues', value: '3.2K', change: '+24%', positive: true },
  { label: 'Ventes', value: '12', change: '+8', positive: true },
  { label: 'Taux de conversion', value: '3.7%', change: '-0.3%', positive: false },
];

const tabs = [
  { id: 'beats' as ProfileTab, label: 'Beats', icon: Music },
  { id: 'services' as ProfileTab, label: 'Services', icon: Headphones },
  { id: 'stats' as ProfileTab, label: 'Stats', icon: TrendingUp },
];

export function ProfileScreenFigma({
  onMyPurchases,
  onBoost,
  onFavorites,
  onBookings,
  onShare,
  onSettings,
  onEdit,
  onCreateService,
  onProductPress,
}: ProfileScreenFigmaProps = {}) {
  const [activeTab, setActiveTab] = useState<ProfileTab>('beats');

  const quickActions: QuickAction[] = useMemo(
    () => [
      {
        id: 'purchases',
        icon: Package,
        title: 'Mes Achats',
        subtitle: 'Licences & Téléchargements',
        colors: [colors.primary, colors.primaryDark],
        onPress: onMyPurchases || (() => {}),
      },
      {
        id: 'favorites',
        icon: Heart,
        title: 'Favoris',
        subtitle: 'Beats sauvegardés',
        colors: [colors.accent, colors.secondary],
        onPress: onFavorites || (() => {}),
      },
      {
        id: 'boost',
        icon: Zap,
        title: 'Booster',
        subtitle: 'Augmenter la visibilité',
        colors: [colors.secondary, colors.warning],
        onPress: onBoost || (() => {}),
      },
      {
        id: 'bookings',
        icon: Calendar,
        title: 'Réservations',
        subtitle: 'Services demandés',
        colors: [colors.cyan, colors.primaryDark],
        onPress: onBookings || (() => {}),
      },
    ],
    [onMyPurchases, onFavorites, onBoost, onBookings]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ProfileHeader onShare={onShare} onSettings={onSettings} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProfileInfo
          avatarUrl={profileData.avatarUrl}
          name={profileData.name}
          handle={profileData.handle}
          bio={profileData.bio}
          location={profileData.location}
          stats={profileData.stats}
          badgeIcon={Award}
          onEdit={onEdit}
        />
        <ProfileQuickActions actions={quickActions} />
        <ProfileStatsGrid stats={statsData} />
        <ProfileTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <ProfileContent
          activeTab={activeTab}
          products={userBeats}
          stats={performanceStats}
          onProductPress={onProductPress}
          onCreateService={onCreateService}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl * 5,
  },
});
