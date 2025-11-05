import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, CheckCircle, Clock, XCircle, MessageCircle, Loader2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { api } from '../utils/api';
import { toast } from 'sonner@2.0.3';

interface BookingsScreenProps {
  onBack: () => void;
  onOpenChat: (conversationId: string, otherUserName: string, otherUserImage?: string) => void;
  accessToken: string;
  userId: string;
}

export function BookingsScreen({ onBack, onOpenChat, accessToken, userId }: BookingsScreenProps) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');

  useEffect(() => {
    if (accessToken) {
      loadBookings();
    } else {
      setLoading(false);
    }
  }, [accessToken]);

  async function loadBookings() {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      const { bookings: data } = await api.bookings.list(accessToken);
      setBookings(data || []);
    } catch (error) {
      console.error('Load bookings error:', error);
      toast.error('Erreur lors du chargement');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateStatus(bookingId: string, status: string) {
    try {
      const { booking } = await api.bookings.update(bookingId, status, accessToken);
      setBookings(prev => prev.map(b => (b.id === bookingId ? booking : b)));

      if (status === 'confirmed') {
        toast.success('Réservation confirmée !');
      } else if (status === 'completed') {
        toast.success('Prestation terminée !');
      } else if (status === 'cancelled') {
        toast.success('Réservation annulée');
      }
    } catch (error) {
      console.error('Update status error:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  }

  const filteredBookings = bookings.filter(b => filter === 'all' || b.status === filter);

  const statusConfig = {
    pending: {
      label: 'En attente',
      color: 'text-[#F59E0B]',
      bg: 'bg-[#F59E0B]/10',
      icon: Clock,
    },
    confirmed: {
      label: 'Confirmée',
      color: 'text-[#06B6D4]',
      bg: 'bg-[#06B6D4]/10',
      icon: CheckCircle,
    },
    completed: {
      label: 'Terminée',
      color: 'text-[#10B981]',
      bg: 'bg-[#10B981]/10',
      icon: CheckCircle,
    },
    cancelled: {
      label: 'Annulée',
      color: 'text-[#EF4444]',
      bg: 'bg-[#EF4444]/10',
      icon: XCircle,
    },
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#404040]/50">
        <div className="px-6 pt-12 pb-4">
          <div className="flex items-center gap-4 mb-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-2 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#D4D4D4]" />
            </motion.button>
            <div className="flex-1">
              <h1 className="text-[#F5F5F5] mb-1">Mes Réservations</h1>
              <p className="text-[#A3A3A3] text-sm">
                {bookings.length} réservation{bookings.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {[
              { id: 'all' as const, label: 'Tout' },
              { id: 'pending' as const, label: 'En attente' },
              { id: 'confirmed' as const, label: 'Confirmées' },
              { id: 'completed' as const, label: 'Terminées' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
                  filter === f.id
                    ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5]'
                    : 'bg-[#111111] text-[#A3A3A3] border border-[#404040]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-[#6366F1] animate-spin" />
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 px-6">
            <div className="w-20 h-20 mb-4 rounded-full bg-[#111111] flex items-center justify-center">
              <Calendar className="w-10 h-10 text-[#404040]" />
            </div>
            <h3 className="text-[#F5F5F5] mb-2">Aucune réservation</h3>
            <p className="text-[#A3A3A3] text-sm text-center">Vos réservations de services apparaîtront ici</p>
          </div>
        ) : (
          <div className="px-6 py-4 space-y-4">
            {filteredBookings.map((booking, index) => {
              const isProvider = booking.providerId === userId;
              const config = statusConfig[booking.status as keyof typeof statusConfig];
              const Icon = config.icon;

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-2xl bg-[#111111] border border-[#404040]"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-[#F5F5F5] mb-1">{booking.serviceName}</h3>
                      <p className="text-[#A3A3A3] text-sm">
                        {isProvider ? `Client: ${booking.clientName}` : `Prestataire: ${booking.providerName}`}
                      </p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${config.bg}`}>
                      <Icon className={`w-4 h-4 ${config.color}`} />
                      <span className={`text-xs ${config.color}`}>{config.label}</span>
                    </div>
                  </div>

                  {/* Message */}
                  {booking.message && (
                    <div className="mb-3 p-3 rounded-xl bg-[#1A1A1A] border border-[#404040]">
                      <p className="text-[#D4D4D4] text-sm">{booking.message}</p>
                    </div>
                  )}

                  {/* Date */}
                  {booking.preferredDate && (
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-[#A3A3A3]" />
                      <span className="text-[#D4D4D4] text-sm">
                        {new Date(booking.preferredDate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    {/* Provider can confirm pending bookings */}
                    {isProvider && booking.status === 'pending' && (
                      <>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                          className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] text-[#F5F5F5] text-sm"
                        >
                          Confirmer
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleUpdateStatus(booking.id, 'cancelled')}
                          className="px-3 py-2 rounded-xl bg-[#1A1A1A] border border-[#404040] text-[#EF4444] text-sm"
                        >
                          Refuser
                        </motion.button>
                      </>
                    )}

                    {/* Both can access chat if confirmed */}
                    {booking.status === 'confirmed' && booking.conversationId && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          onOpenChat(booking.conversationId, isProvider ? booking.clientName : booking.providerName)
                        }
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5] text-sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Ouvrir le chat
                      </motion.button>
                    )}

                    {/* Mark as completed */}
                    {booking.status === 'confirmed' && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleUpdateStatus(booking.id, 'completed')}
                        className="px-3 py-2 rounded-xl bg-[#1A1A1A] border border-[#10B981] text-[#10B981] text-sm"
                      >
                        Terminer
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
