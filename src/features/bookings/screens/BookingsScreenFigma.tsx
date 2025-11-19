import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme';
import { BookingCard, BookingsHeader, BookingsFilterBar, BookingsEmptyState } from '@/features/bookings/components';
import type { BookingFilterType } from '@/features/bookings/components/BookingsFilterBar';

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

export function BookingsScreenFigma({ onBack, onOpenChat, userId, accessToken }: BookingsScreenFigmaProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<BookingFilterType>('all');

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

  return (
    <SafeAreaView style={styles.container}>
      <BookingsHeader onBack={onBack} subtitle={`${bookings.length} réservation${bookings.length > 1 ? 's' : ''}`} />
      <View style={styles.filterBarContainer}>
        <BookingsFilterBar selectedFilter={filter} onFilterChange={setFilter} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : filteredBookings.length === 0 ? (
          <BookingsEmptyState />
        ) : (
          <View style={styles.bookingsContainer}>
            {filteredBookings.map((booking, index) => {
              const isProvider = booking.providerId === userId;
              return (
                <BookingCard
                  key={booking.id}
                  serviceName={booking.serviceName}
                  counterpartLabel={isProvider ? 'Client' : 'Prestataire'}
                  counterpartName={isProvider ? booking.clientName : booking.providerName}
                  message={booking.message}
                  preferredDate={booking.preferredDate}
                  status={booking.status}
                  onConfirm={
                    isProvider && booking.status === 'pending'
                      ? () => handleUpdateStatus(booking.id, 'confirmed')
                      : undefined
                  }
                  onReject={
                    isProvider && booking.status === 'pending'
                      ? () => handleUpdateStatus(booking.id, 'cancelled')
                      : undefined
                  }
                  onChat={
                    booking.status === 'confirmed' && booking.conversationId
                      ? () =>
                          onOpenChat?.(
                            booking.conversationId!,
                            isProvider ? booking.clientName : booking.providerName,
                            isProvider ? booking.clientImage : booking.providerImage
                          )
                      : undefined
                  }
                  onComplete={
                    booking.status === 'confirmed' ? () => handleUpdateStatus(booking.id, 'completed') : undefined
                  }
                  showConfirmActions={isProvider && booking.status === 'pending'}
                />
              );
            })}
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
  filterBarContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
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
  bookingsContainer: {
    padding: spacing.lg, // p-6
    gap: spacing.md, // gap-4
  },
});
