import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, ColorValue } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Settings,
  Edit,
  Share2,
  Star,
  Music,
  Headphones,
  TrendingUp,
  Award,
  Package,
  Zap,
  Heart,
  Calendar,
} from 'lucide-react-native';
import { ImageWithFallback } from '../components/atoms/ImageWithFallback';
import { PrimaryButton } from '../components/atoms/PrimaryButton';
import { ProductCardFigma } from '../components/atoms/ProductCardFigma';

interface ProfileScreenFigmaProps {
  onMyPurchases?: () => void;
  onBoost?: () => void;
  onFavorites?: () => void;
  onBookings?: () => void;
}

const userBeats = [
  {
    id: '1',
    title: 'Afrobeat Summer',
    artist: 'Vous',
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 24000,
    type: 'beat' as const,
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
    type: 'beat' as const,
    bpm: 128,
    genre: 'Afrobeat',
    likes: 1543,
    downloads: 789,
    rating: 4.9,
    reviewCount: 102,
  },
];

const stats = [
  { icon: TrendingUp, label: 'Vues totales', value: '12.4K', colors: ['#6366F1', '#8B5CF6'] },
  { icon: Music, label: 'Beats publiés', value: '24', colors: ['#EC4899', '#F59E0B'] },
  { icon: Star, label: 'Note moyenne', value: '4.8', colors: ['#F59E0B', '#EC4899'] },
  { icon: Award, label: 'Ventes', value: '47', colors: ['#06B6D4', '#8B5CF6'] },
];

export function ProfileScreenFigma({ onMyPurchases, onBoost, onFavorites, onBookings }: ProfileScreenFigmaProps = {}) {
  const [activeTab, setActiveTab] = useState<'beats' | 'services' | 'stats'>('beats');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.9}>
            <View style={styles.headerButtonInner}>
              <Share2 size={20} color="#D4D4D4" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.9}>
            <View style={styles.headerButtonInner}>
              <Settings size={20} color="#D4D4D4" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileRow}>
            <View style={styles.avatarContainer}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=200"
                alt="Profile"
                style={styles.avatar}
              />
              <View style={styles.avatarBadge}>
                <LinearGradient
                  colors={['#F59E0B', '#EC4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.badgeGradient}
                >
                  <Award size={16} color="#F5F5F5" />
                </LinearGradient>
              </View>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>DJ Producer Pro</Text>
              <Text style={styles.profileHandle}>@djproducer • Producteur & Beat Maker</Text>
              <View style={styles.profileStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>892</Text>
                  <Text style={styles.statLabel}>Abonnés</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>234</Text>
                  <Text style={styles.statLabel}>Abonnements</Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.profileBio}>Producteur de beats Afrobeat, Amapiano & Trap 🎵{'\n'}📍 Lagos, Nigeria</Text>

          <View style={styles.editButtonContainer}>
            <PrimaryButton style={styles.editButton}>
              <Edit size={20} color="#F5F5F5" />
              <Text style={styles.editButtonText}>Modifier le profil</Text>
            </PrimaryButton>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard} onPress={onMyPurchases} activeOpacity={0.9}>
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickActionIcon}
              >
                <Package size={20} color="#F5F5F5" />
              </LinearGradient>
              <Text style={styles.quickActionTitle}>Mes Achats</Text>
              <Text style={styles.quickActionSubtitle}>Licences & Téléchargements</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard} onPress={onFavorites} activeOpacity={0.9}>
              <LinearGradient
                colors={['#EC4899', '#F59E0B']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickActionIcon}
              >
                <Heart size={20} color="#F5F5F5" fill="#F5F5F5" />
              </LinearGradient>
              <Text style={styles.quickActionTitle}>Favoris</Text>
              <Text style={styles.quickActionSubtitle}>Beats sauvegardés</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard} onPress={onBoost} activeOpacity={0.9}>
              <LinearGradient
                colors={['#F59E0B', '#EAB308']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickActionIcon}
              >
                <Zap size={20} color="#F5F5F5" fill="#F5F5F5" />
              </LinearGradient>
              <Text style={styles.quickActionTitle}>Booster</Text>
              <Text style={styles.quickActionSubtitle}>Augmenter la visibilité</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard} onPress={onBookings} activeOpacity={0.9}>
              <LinearGradient
                colors={['#06B6D4', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickActionIcon}
              >
                <Calendar size={20} color="#F5F5F5" />
              </LinearGradient>
              <Text style={styles.quickActionTitle}>Réservations</Text>
              <Text style={styles.quickActionSubtitle}>Services demandés</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <View key={stat.label} style={styles.statCard}>
                  <LinearGradient
                    colors={stat.colors as [ColorValue, ColorValue, ...ColorValue[]]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.statIcon}
                  >
                    <Icon size={20} color="#F5F5F5" />
                  </LinearGradient>
                  <Text style={styles.statCardValue}>{stat.value}</Text>
                  <Text style={styles.statCardLabel}>{stat.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsSection}>
          <View style={styles.tabsRow}>
            <TouchableOpacity
              onPress={() => setActiveTab('beats')}
              style={[styles.tab, activeTab === 'beats' && styles.tabActive]}
              activeOpacity={0.9}
            >
              {activeTab === 'beats' ? (
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.tabGradient}
                >
                  <Text style={styles.tabTextActive}>Beats</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.tabText}>Beats</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('services')}
              style={[styles.tab, activeTab === 'services' && styles.tabActive]}
              activeOpacity={0.9}
            >
              {activeTab === 'services' ? (
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.tabGradient}
                >
                  <Text style={styles.tabTextActive}>Services</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.tabText}>Services</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('stats')}
              style={[styles.tab, activeTab === 'stats' && styles.tabActive]}
              activeOpacity={0.9}
            >
              {activeTab === 'stats' ? (
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.tabGradient}
                >
                  <Text style={styles.tabTextActive}>Stats</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.tabText}>Stats</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentSection}>
          {activeTab === 'beats' && (
            <FlatList
              data={userBeats}
              numColumns={2}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.beatsGrid}
              columnWrapperStyle={styles.beatsRow}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.beatCard}>
                  <ProductCardFigma {...item} isFavorited={false} onPress={() => {}} onToggleFavorite={() => {}} />
                </View>
              )}
            />
          )}

          {activeTab === 'services' && (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Headphones size={32} color="#A3A3A3" />
              </View>
              <Text style={styles.emptyTitle}>Aucun service</Text>
              <Text style={styles.emptySubtitle}>Vous n'avez pas encore publié de service</Text>
              <PrimaryButton style={styles.emptyButton}>Créer un service</PrimaryButton>
            </View>
          )}

          {activeTab === 'stats' && (
            <View style={styles.statsContent}>
              <View style={styles.statsCard}>
                <Text style={styles.statsCardTitle}>Performances ce mois</Text>
                <View style={styles.statsList}>
                  {[
                    { label: 'Revenus', value: '342 500 F', change: '+12%', positive: true },
                    { label: 'Vues', value: '3.2K', change: '+24%', positive: true },
                    { label: 'Ventes', value: '12', change: '+8', positive: true },
                    { label: 'Taux de conversion', value: '3.7%', change: '-0.3%', positive: false },
                  ].map(item => (
                    <View key={item.label} style={styles.statsItem}>
                      <Text style={styles.statsItemLabel}>{item.label}</Text>
                      <View style={styles.statsItemRight}>
                        <Text style={styles.statsItemValue}>{item.value}</Text>
                        <Text
                          style={[
                            styles.statsItemChange,
                            item.positive ? styles.statsItemChangePositive : styles.statsItemChangeNegative,
                          ]}
                        >
                          {item.change}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    paddingTop: 48, // pt-12
    paddingBottom: 16, // pb-4
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12, // gap-3
    paddingHorizontal: 24, // px-6
  },
  headerButton: {
    padding: 12, // p-3
    borderRadius: 12, // rounded-xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  headerButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // pb-20
  },
  profileSection: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16, // gap-4
    marginBottom: 24, // mb-6
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 96, // w-24
    height: 96, // h-24
    borderRadius: 24, // rounded-2xl
    borderWidth: 2,
    borderColor: '#404040',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: -8, // -bottom-2
    right: -8, // -right-2
    width: 32, // w-8
    height: 32, // h-8
    borderRadius: 12, // rounded-xl
    borderWidth: 2,
    borderColor: '#0A0A0A',
    overflow: 'hidden',
  },
  badgeGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#F5F5F5',
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  profileHandle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 12, // mb-3
  },
  profileStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, // gap-4
  },
  statItem: {
    alignItems: 'flex-start',
  },
  statValue: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 2,
  },
  statLabel: {
    color: '#A3A3A3',
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
  profileBio: {
    color: '#D4D4D4',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 16, // mb-4
    lineHeight: 20,
  },
  editButtonContainer: {
    flexDirection: 'row',
    gap: 12, // gap-3
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8, // gap-2
  },
  editButtonText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  quickActions: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
  },
  sectionTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 12, // mb-3
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12, // gap-3
  },
  quickActionCard: {
    width: '48%',
    padding: 16, // p-4
    borderRadius: 12, // rounded-xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  quickActionIcon: {
    width: 40, // w-10
    height: 40, // h-10
    borderRadius: 12, // rounded-xl
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8, // mb-2
  },
  quickActionTitle: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  quickActionSubtitle: {
    color: '#A3A3A3',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  statsSection: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12, // gap-3
  },
  statCard: {
    width: '48%',
    padding: 16, // p-4
    borderRadius: 24, // rounded-2xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  statIcon: {
    width: 40, // w-10
    height: 40, // h-10
    borderRadius: 12, // rounded-xl
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12, // mb-3
  },
  statCardValue: {
    color: '#F5F5F5',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
  },
  statCardLabel: {
    color: '#A3A3A3',
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
  tabsSection: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8, // gap-2
    marginBottom: 16, // mb-4
  },
  tab: {
    flex: 1,
    paddingVertical: 8, // py-2
    paddingHorizontal: 16, // px-4
    borderRadius: 12, // rounded-xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    overflow: 'hidden',
  },
  tabActive: {
    borderWidth: 0,
  },
  tabGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
  },
  contentSection: {
    paddingHorizontal: 24, // px-6
    paddingBottom: 32, // pb-8
  },
  beatsGrid: {
    gap: 16, // gap-4
  },
  beatsRow: {
    gap: 16, // gap-4
  },
  beatCard: {
    flex: 1,
    maxWidth: '48%',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64, // py-16
  },
  emptyIcon: {
    width: 64, // w-16
    height: 64, // h-16
    borderRadius: 24, // rounded-2xl
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16, // mb-4
  },
  emptyTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 16, // mb-4
  },
  emptyButton: {
    alignSelf: 'center',
  },
  statsContent: {
    gap: 16, // space-y-4
  },
  statsCard: {
    padding: 16, // p-4
    borderRadius: 24, // rounded-2xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  statsCardTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 16, // mb-4
  },
  statsList: {
    gap: 12, // space-y-3
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsItemLabel: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  statsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
  },
  statsItemValue: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  statsItemChange: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  statsItemChangePositive: {
    color: '#22C55E',
  },
  statsItemChangeNegative: {
    color: '#EF4444',
  },
});
