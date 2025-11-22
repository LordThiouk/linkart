import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, CheckCircle2, Clock, MessageCircle, XCircle } from 'lucide-react-native';
import { colors, spacing, typography, radii, hexToRgba } from '@/theme';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; color: string; background: string; icon: typeof CheckCircle2 }
> = {
  pending: {
    label: 'En attente',
    color: colors.secondary,
    background: hexToRgba(colors.secondary, 0.12),
    icon: Clock,
  },
  confirmed: {
    label: 'Confirmée',
    color: colors.cyan,
    background: hexToRgba(colors.cyan, 0.12),
    icon: CheckCircle2,
  },
  completed: {
    label: 'Terminée',
    color: colors.success,
    background: hexToRgba(colors.success, 0.12),
    icon: CheckCircle2,
  },
  cancelled: {
    label: 'Annulée',
    color: colors.error,
    background: hexToRgba(colors.error, 0.12),
    icon: XCircle,
  },
};

export interface BookingCardProps {
  serviceName: string;
  counterpartLabel: string;
  counterpartName: string;
  message?: string;
  preferredDate?: string;
  status: BookingStatus;
  onConfirm?: () => void;
  onReject?: () => void;
  onChat?: () => void;
  onComplete?: () => void;
  showConfirmActions?: boolean;
  showChatAction?: boolean;
  showCompleteAction?: boolean;
  animationDelay?: number;
}

export function BookingCard({
  serviceName,
  counterpartLabel,
  counterpartName,
  message,
  preferredDate,
  status,
  onConfirm,
  onReject,
  onChat,
  onComplete,
  showConfirmActions = false,
  showChatAction = false,
  showCompleteAction = false,
}: BookingCardProps) {
  const config = STATUS_CONFIG[status];
  const StatusIcon = config.icon;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.serviceName}>{serviceName}</Text>
          <Text style={styles.counterpart}>
            {counterpartLabel}: {counterpartName}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: config.background }]}>
          <StatusIcon size={16} color={config.color} />
          <Text style={[styles.statusText, { color: config.color }]}>{config.label}</Text>
        </View>
      </View>

      {message && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}

      {preferredDate && (
        <View style={styles.dateContainer}>
          <Calendar size={16} color={colors.textMuted} />
          <Text style={styles.dateText}>{preferredDate}</Text>
        </View>
      )}

      <View style={styles.actions}>
        {showConfirmActions && (
          <>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm} activeOpacity={0.9}>
              <LinearGradient
                colors={[colors.cyan, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.confirmGradient}
              >
                <Text style={styles.confirmText}>Confirmer</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton} onPress={onReject} activeOpacity={0.9}>
              <Text style={styles.rejectText}>Refuser</Text>
            </TouchableOpacity>
          </>
        )}

        {showChatAction && (
          <TouchableOpacity style={styles.chatButton} onPress={onChat} activeOpacity={0.9}>
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.chatGradient}
            >
              <MessageCircle size={16} color={colors.textPrimary} />
              <Text style={styles.chatText}>Ouvrir le chat</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {showCompleteAction && (
          <TouchableOpacity style={styles.completeButton} onPress={onComplete} activeOpacity={0.9}>
            <Text style={[styles.completeText, { color: colors.success }]}>Terminer</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    borderRadius: radii.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  headerInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  serviceName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  counterpart: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.lg,
    gap: spacing.xs,
  },
  statusText: {
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  messageContainer: {
    padding: spacing.sm,
    borderRadius: radii.lg,
    backgroundColor: hexToRgba(colors.surfaceElevated, 0.6),
  },
  messageText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dateText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  confirmButton: {
    flex: 1,
    minWidth: 120,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  confirmGradient: {
    paddingVertical: spacing.sm,
    borderRadius: radii.lg,
    alignItems: 'center',
  },
  confirmText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  rejectButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  rejectText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
  chatButton: {
    flex: 1,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  chatGradient: {
    paddingVertical: spacing.sm,
    borderRadius: radii.lg,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  chatText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  completeButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: hexToRgba(colors.success, 0.4),
  },
  completeText: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
