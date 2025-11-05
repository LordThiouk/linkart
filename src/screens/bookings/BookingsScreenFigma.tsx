import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Calendar, CheckCircle, Clock, XCircle, MessageCircle } from 'lucide-react-native';
import { CategoryChipFigma } from '../../components/atoms/CategoryChipFigma';

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

const statusConfig = {
  pending: {
    label: 'En attente',
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    icon: Clock,
  },
  confirmed: {
    label: 'Confirmée',
    color: '#06B6D4',
    bgColor: 'rgba(6, 182, 212, 0.1)',
    icon: CheckCircle,
  },
  completed: {
    label: 'Terminée',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    icon: CheckCircle,
  },
  cancelled: {
    label: 'Annulée',
    color: '#EF4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    icon: XCircle,
  },
};

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
            <Calendar size={16} color="#A3A3A3" />
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
                  colors={['#06B6D4', '#8B5CF6']}
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
                colors={['#6366F1', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.chatButtonGradient}
              >
                <MessageCircle size={16} color="#F5F5F5" />
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
              <Text style={styles.completeButtonText}>Terminer</Text>
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
                <ArrowLeft size={20} color="#D4D4D4" />
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
            <ActivityIndicator size="large" color="#6366F1" />
          </View>
        ) : filteredBookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Calendar size={40} color="#404040" />
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
    backgroundColor: '#0A0A0A',
  },
  header: {
    backgroundColor: '#0A0A0A',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  headerContent: {
    gap: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  headerTitle: {
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  filtersContainer: {
    gap: 8,
    paddingRight: 24,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 256,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 256,
    paddingHorizontal: 24,
    gap: 16,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  bookingsContainer: {
    padding: 24,
    gap: 16,
  },
  bookingCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    gap: 12,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bookingInfo: {
    flex: 1,
    gap: 4,
  },
  bookingTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  bookingSubtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  messageContainer: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#404040',
    marginBottom: 12,
  },
  messageText: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  dateText: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '400',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  confirmButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  confirmButtonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#404040',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
  },
  chatButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  chatButtonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  chatButtonText: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '600',
  },
  completeButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButtonText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '600',
  },
});
