import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Eye, EyeOff, Download, CreditCard, Wallet } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedText = Animated.createAnimatedComponent(Text);

export interface BalanceCardProps {
  balance: number;
  showBalance: boolean;
  onToggleBalance: () => void;
  onWithdraw?: () => void;
  onCardAction?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export function BalanceCard({
  balance,
  showBalance,
  onToggleBalance,
  onWithdraw,
  onCardAction,
  style,
  testID,
}: BalanceCardProps) {
  const balanceOpacity = useSharedValue(showBalance ? 1 : 0);

  React.useEffect(() => {
    balanceOpacity.value = withTiming(showBalance ? 1 : 0, { duration: 300 });
  }, [showBalance, balanceOpacity]);

  const balanceStyle = useAnimatedStyle(() => ({
    opacity: balanceOpacity.value,
  }));

  return (
    <View style={[styles.container, style]} testID={testID}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Pattern overlay */}
        <View style={styles.pattern}>
          <View style={styles.glow1} />
          <View style={styles.glow2} />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.icon}>
                <Wallet size={20} color={colors.textPrimary} />
              </View>
              <Text style={styles.label}>Solde disponible</Text>
            </View>
            <TouchableOpacity onPress={onToggleBalance} style={styles.toggle} activeOpacity={0.8}>
              {showBalance ? (
                <Eye size={20} color={colors.textPrimary} />
              ) : (
                <EyeOff size={20} color={colors.textPrimary} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.amountContainer}>
            {showBalance ? (
              <AnimatedText style={[styles.amount, balanceStyle]}>{balance.toLocaleString()} F</AnimatedText>
            ) : (
              <View style={styles.dots}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <View key={i} style={styles.dot} />
                ))}
              </View>
            )}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.withdrawButton} onPress={onWithdraw} activeOpacity={0.9}>
              <View style={styles.withdrawButtonContent}>
                <Download size={20} color={colors.primary} />
                <Text style={styles.withdrawButtonText}>Retirer</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardButton} onPress={onCardAction} activeOpacity={0.9}>
              <CreditCard size={20} color={colors.textPrimary} />
              <Text style={styles.cardButtonText}>Carte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radii.xxl,
    overflow: 'hidden',
  },
  gradient: {
    padding: spacing.xl,
    position: 'relative',
  },
  pattern: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.1,
  },
  glow1: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: spacing.xl * 4,
    height: spacing.xl * 4,
    borderRadius: spacing.xl * 2,
    backgroundColor: colors.textPrimary,
    opacity: 0.3,
  },
  glow2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: spacing.xl * 5,
    height: spacing.xl * 5,
    borderRadius: spacing.xl * 2.5,
    backgroundColor: colors.textPrimary,
    opacity: 0.3,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: 'rgba(245, 245, 245, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
  toggle: {
    padding: spacing.sm,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(245, 245, 245, 0.2)',
  },
  amountContainer: {
    marginBottom: spacing.xl,
    minHeight: spacing.xl * 3,
    justifyContent: 'center',
  },
  amount: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.displayXl + 4,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  dots: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dot: {
    width: spacing.md,
    height: spacing.md,
    borderRadius: spacing.md / 2,
    backgroundColor: 'rgba(245, 245, 245, 0.5)',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  withdrawButton: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radii.xxl,
    backgroundColor: colors.textPrimary,
  },
  withdrawButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  withdrawButtonText: {
    color: colors.primary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
  cardButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radii.xxl,
    backgroundColor: 'rgba(245, 245, 245, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  cardButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
