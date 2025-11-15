import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Calendar, CheckCircle, Clock, XCircle, MessageCircle } from 'lucide-react-native';
import { CategoryChipFigma } from '../../components/atoms/CategoryChipFigma';
import { colors, spacing, typography, radii, hexToRgba } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

interface Booking {
  id: string;
  serviceName: string;
  clientName: string;
  clientImage?: string;
  providerName: string;
  providerImage?: string;
  providerId: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  message?: string;
  preferredDate?: string;
  conversationId?: string;
  pricingTierId?: string;
  price?: number;
}

interface BookingsScreenFigmaProps {
  onBack?: () => void;
  onOpenChat?: (conversationId: string, otherUserName: string, otherUserImage?: string) => void;
  userId?: string;
  accessToken?: string;
}

type FilterType = 'all' | 'pending' | 'confirmed' | 'completed';

// Status config - moved calculation inside component to avoid undefined colors
const getStatusConfig = () => ({
  pending: {
    label: 'En attente',
    color: colors.secondary, // #F59E0B
    bgColor: hexToRgba(colors.secondary, 0.1),
    icon: Clock,
  },
  confirmed: {
    label: 'Confirmée',
    color: '#06B6D4', // Cyan - not in theme, keeping as is
    bgColor: 'rgba(6, 182, 212, 0.1)',
    icon: CheckCircle,
  },
  completed: {
    label: 'Terminée',
    color: colors.success, // #22C55E
    bgColor: hexToRgba(colors.success, 0.1),
    icon: CheckCircle,
  },
  cancelled: {
    label: 'Annulée',
    color: colors.error, // #EF4444
    bgColor: hexToRgba(colors.error, 0.1),
    icon: XCircle,
  },
});

export function BookingsScreenFigma({ onBack, onOpenChat, userId, accessToken }: BookingsScreenFigmaProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    // Mock data for now - will be replaced with actual API call
    setTimeout(() => {
      setBookings([
        {
          id: '1',
          serviceName: 'Mixing & Mastering',
          clientName: 'John Doe',
          clientImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          providerName: 'Studio Pro',
          providerId: 'provider1',
          status: 'pending',
          message: 'Besoin de mixage pour mon dernier single',
          preferredDate: '2025-12-15',
        },
        {
          id: '2',
          serviceName: 'Recording Session',
          clientName: 'Jane Smith',
          providerName: 'Studio Pro',
          providerId: 'provider1',
          status: 'confirmed',
          message: 'Session de 4 heures pour enregistrer 3 chansons',
          preferredDate: '2025-12-20',
          conversationId: 'conv1',
        },
        {
          id: '3',
          serviceName: 'Beat Production',
          clientName: 'Mike Johnson',
          providerName: 'Studio Pro',
          providerId: 'provider1',
          status: 'completed',
          message: 'Production de 2 beats trap',
          preferredDate: '2025-12-10',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    // Mock update - will be replaced with actual API call
    setBookings(prev => prev.map(b => (b.id === bookingId ? { ...b, status: status as Booking['status'] } : b)));
  };

  const filteredBookings = bookings.filter(b => filter === 'all' || b.status === filter);

  const renderBookingCard = (booking: Booking, index: number) => {
    const isProvider = booking.providerId === userId;
    const statusConfig = getStatusConfig();
    const config = statusConfig[booking.status];
    const Icon = config.icon;

    return (
      <AnimatedView key={booking.id} entering={FadeIn.delay(index * 50)} style={styles.bookingCard}>
        {/* Header */}
        <View style={styles.bookingHeader}>
          <View style={styles.bookingInfo}>
            <Text style={styles.bookingTitle}>{booking.serviceName}</Text>
            <Text style={styles.bookingSubtitle}>
              {isProvider ? `Client: ${booking.clientName}` : `Prestataire: ${booking.providerName}`}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: config.bgColor }]}>
            <Icon size={16} color={config.color} />
            <Text style={[styles.statusText, { color: config.color }]}>{config.label}</Text>
          </View>
        </View>

        {/* Message */}
        {booking.message && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{booking.message}</Text>
          </View>
        )}

        {/* Date */}
        {booking.preferredDate && (
          <View style={styles.dateContainer}>
            <Calendar size={16} color={colors.textMuted} />
            <Text style={styles.dateText}>
              {new Date(booking.preferredDate).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actionsContainer}>
          {/* Provider can confirm pending bookings */}
          {isProvider && booking.status === 'pending' && (
            <>
              <TouchableOpacity
                onPress={() => handleUpdateStatus(booking.id, 'confirmed')}
                style={styles.confirmButton}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#06B6D4', colors.primaryDark]} // Cyan to primaryDark
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.confirmButtonGradient}
                >
                  <Text style={styles.confirmButtonText}>Confirmer</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleUpdateStatus(booking.id, 'cancelled')}
                style={styles.cancelButton}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>Refuser</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Both can access chat if confirmed */}
          {booking.status === 'confirmed' && booking.conversationId && (
            <TouchableOpacity
              onPress={() =>
                onOpenChat?.(booking.conversationId!, isProvider ? booking.clientName : booking.providerName)
              }
              style={styles.chatButton}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.chatButtonGradient}
              >
                <MessageCircle size={16} color={colors.textPrimary} />
                <Text style={styles.chatButtonText}>Ouvrir le chat</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          {/* Mark as completed */}
          {booking.status === 'confirmed' && (
            <TouchableOpacity
              onPress={() => handleUpdateStatus(booking.id, 'completed')}
              style={styles.completeButton}
              activeOpacity={0.8}
            >
              <Text style={[styles.completeButtonText, { color: colors.success }]}>Terminer</Text>
            </TouchableOpacity>
          )}
        </View>
      </AnimatedView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            {onBack && (
              <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.8}>
                <ArrowLeft size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Mes Réservations</Text>
              <Text style={styles.headerSubtitle}>
                {bookings.length} réservation{bookings.length > 1 ? 's' : ''}
              </Text>
            </View>
          </View>

          {/* Filters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
            {[
              { id: 'all' as FilterType, label: 'Tout' },
              { id: 'pending' as FilterType, label: 'En attente' },
              { id: 'confirmed' as FilterType, label: 'Confirmées' },
              { id: 'completed' as FilterType, label: 'Terminées' },
            ].map(f => (
              <CategoryChipFigma
                key={f.id}
                label={f.label}
                selected={filter === f.id}
                onPress={() => setFilter(f.id)}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : filteredBookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Calendar size={40} color={colors.border} />
            </View>
            <Text style={styles.emptyTitle}>Aucune réservation</Text>
            <Text style={styles.emptySubtitle}>Vos réservations de services apparaîtront ici</Text>
          </View>
        ) : (
          <View style={styles.bookingsContainer}>
            {filteredBookings.map((booking, index) => renderBookingCard(booking, index))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: hexToRgba(colors.border, 0.5),
    paddingTop: spacing.xxl, // pt-12
    paddingBottom: spacing.md, // pb-4
    paddingHorizontal: spacing.lg, // px-6
  },
  headerContent: {
    gap: spacing.md, // gap-4
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md, // gap-4
    marginBottom: spacing.md, // mb-4
  },
  backButton: {
    padding: spacing.sm, // p-2
    borderRadius: radii.md, // rounded-xl
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerText: {
    flex: 1,
    gap: spacing.xs,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.displayXl - spacing.xs, // 28px (close to displayXl 32px)
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  filtersContainer: {
    gap: spacing.sm, // gap-2
    paddingRight: spacing.lg, // pr-6
  },
  scrollContent: {
    paddingBottom: spacing.xl + spacing.sm, // pb-10 (40px)
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: spacing.xxl * 2 + spacing.xl * 2, // h-64 (256px)
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: spacing.xxl * 2 + spacing.xl * 2, // h-64 (256px)
    paddingHorizontal: spacing.lg, // px-6
    gap: spacing.md, // gap-4
  },
  emptyIcon: {
    width: spacing.xl * 2, // w-20 (80px)
    height: spacing.xl * 2, // h-20 (80px)
    borderRadius: radii.full, // rounded-full (40px)
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md, // mb-4
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd, // 20px (close to titleMd 18px)
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.sm, // mb-2
    textAlign: 'center',
  },
  emptySubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
  },
  bookingsContainer: {
    padding: spacing.lg, // p-6
    gap: spacing.md, // gap-4
  },
  bookingCard: {
    padding: spacing.md, // p-4
    borderRadius: radii.xl, // rounded-2xl
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md - spacing.xs, // gap-3 (12px)
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md - spacing.xs, // mb-3 (12px)
  },
  bookingInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  bookingTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.xs,
  },
  bookingSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm, // px-2
    paddingVertical: spacing.xs,
    borderRadius: radii.sm, // rounded-lg
  },
  statusText: {
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  messageContainer: {
    padding: spacing.md - spacing.xs, // p-3 (12px)
    borderRadius: radii.md, // rounded-xl
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md - spacing.xs, // mb-3 (12px)
  },
  messageText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    lineHeight: spacing.xl * 2.5, // line-height 20px (close to 20)
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // gap-2
    marginBottom: spacing.md - spacing.xs, // mb-3 (12px)
  },
  dateText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: spacing.sm, // gap-2
    marginTop: spacing.sm, // mt-2
  },
  confirmButton: {
    flex: 1,
    borderRadius: radii.md, // rounded-xl
    overflow: 'hidden',
  },
  confirmButtonGradient: {
    paddingVertical: spacing.md + spacing.xs, // py-2.5 (10px)
    paddingHorizontal: spacing.md - spacing.xs, // px-3 (12px)
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  cancelButton: {
    paddingVertical: spacing.md + spacing.xs, // py-2.5 (10px)
    paddingHorizontal: spacing.md - spacing.xs, // px-3 (12px)
    borderRadius: radii.md, // rounded-xl
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: colors.error,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  chatButton: {
    flex: 1,
    borderRadius: radii.md, // rounded-xl
    overflow: 'hidden',
  },
  chatButtonGradient: {
    paddingVertical: spacing.md + spacing.xs, // py-2.5 (10px)
    paddingHorizontal: spacing.md - spacing.xs, // px-3 (12px)
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm, // gap-2
  },
  chatButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  completeButton: {
    paddingVertical: spacing.md + spacing.xs, // py-2.5 (10px)
    paddingHorizontal: spacing.md - spacing.xs, // px-3 (12px)
    borderRadius: radii.md, // rounded-xl
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButtonText: {
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
});
