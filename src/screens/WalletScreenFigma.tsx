import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
  CreditCard,
  Download,
  Wallet,
} from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedText = Animated.createAnimatedComponent(Text);

export function WalletScreenFigma() {
  const [showBalance, setShowBalance] = useState(true);

  // Calculate card width for 3 columns with gap (stats)
  const screenWidth = Dimensions.get('window').width;
  const horizontalPadding = spacing.xl * 2; // paddingHorizontal from statsSection
  const gap = spacing.md;
  const statCardWidth = (screenWidth - horizontalPadding - gap * 2) / 3;

  const transactions = [
    {
      id: '1',
      type: 'income',
      title: 'Vente - Afrobeat Summer',
      amount: 24000,
      date: "Aujourd'hui",
      status: 'completed',
    },
    {
      id: '2',
      type: 'income',
      title: 'Vente - Lagos Nights (Premium)',
      amount: 49000,
      date: 'Hier',
      status: 'completed',
    },
    {
      id: '3',
      type: 'withdraw',
      title: 'Retrait vers compte bancaire',
      amount: -150000,
      date: 'Il y a 2 jours',
      status: 'pending',
    },
    {
      id: '4',
      type: 'income',
      title: 'Service - Mixing & Mastering',
      amount: 42000,
      date: 'Il y a 3 jours',
      status: 'completed',
    },
  ];

  const stats = [
    { label: 'Ce mois', value: '342 500 F', change: '+12%' },
    { label: 'Ventes totales', value: '47', change: '+8' },
    { label: 'En attente', value: '150 000 F', change: '1' },
  ];

  const balanceOpacity = useSharedValue(showBalance ? 1 : 0);

  useEffect(() => {
    balanceOpacity.value = withTiming(showBalance ? 1 : 0, { duration: 300 });
  }, [showBalance, balanceOpacity]);

  const balanceStyle = useAnimatedStyle(() => ({
    opacity: balanceOpacity.value,
  }));

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Wallet</Text>
            <Text style={styles.headerSubtitle}>Gérez vos revenus</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.balanceGradient}
          >
            {/* Pattern overlay */}
            <View style={styles.balancePattern}>
              <View style={styles.balanceGlow1} />
              <View style={styles.balanceGlow2} />
            </View>

            <View style={styles.balanceContent}>
              <View style={styles.balanceHeader}>
                <View style={styles.balanceHeaderLeft}>
                  <View style={styles.balanceIcon}>
                    <Wallet size={20} color={colors.textPrimary} />
                  </View>
                  <Text style={styles.balanceLabel}>Solde disponible</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setShowBalance(!showBalance)}
                  style={styles.balanceToggle}
                  activeOpacity={0.8}
                >
                  {showBalance ? (
                    <Eye size={20} color={colors.textPrimary} />
                  ) : (
                    <EyeOff size={20} color={colors.textPrimary} />
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.balanceAmountContainer}>
                {showBalance ? (
                  <AnimatedText style={[styles.balanceAmount, balanceStyle]}>1 247 480 F</AnimatedText>
                ) : (
                  <View style={styles.balanceDots}>
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <View key={i} style={styles.balanceDot} />
                    ))}
                  </View>
                )}
              </View>

              <View style={styles.balanceActions}>
                <TouchableOpacity style={styles.withdrawButton} activeOpacity={0.9}>
                  <View style={styles.withdrawButtonContent}>
                    <Download size={20} color={colors.primary} />
                    <Text style={styles.withdrawButtonText}>Retirer</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardButton} activeOpacity={0.9}>
                  <CreditCard size={20} color={colors.textPrimary} />
                  <Text style={styles.cardButtonText}>Carte</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={stat.label} style={[styles.statCard, { width: statCardWidth }]}>
                <Text style={styles.statCardLabel}>{stat.label}</Text>
                <Text style={styles.statCardValue}>{stat.value}</Text>
                <View style={styles.statCardChange}>
                  <TrendingUp size={12} color={colors.success} />
                  <Text style={styles.statCardChangeText}>{stat.change}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Transactions */}
        <View style={styles.transactionsSection}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle}>Transactions récentes</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.seeAllLink}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionsList}>
            {transactions.map((transaction, index) => (
              <View key={transaction.id} style={styles.transactionCard}>
                <View style={styles.transactionRow}>
                  <View
                    style={[
                      styles.transactionIcon,
                      transaction.type === 'income' ? styles.transactionIconIncome : styles.transactionIconWithdraw,
                    ]}
                  >
                    {transaction.type === 'income' ? (
                      <ArrowDownLeft
                        size={20}
                        color={transaction.type === 'income' ? colors.success : colors.secondary}
                      />
                    ) : (
                      <ArrowUpRight size={20} color={colors.secondary} />
                    )}
                  </View>

                  <View style={styles.transactionContent}>
                    <Text style={styles.transactionTitle}>{transaction.title}</Text>
                    <Text style={styles.transactionDate}>{transaction.date}</Text>
                  </View>

                  <View style={styles.transactionRight}>
                    <Text
                      style={[
                        styles.transactionAmount,
                        transaction.amount > 0 ? styles.transactionAmountIncome : styles.transactionAmountWithdraw,
                      ]}
                    >
                      {transaction.amount > 0 ? '+' : ''}
                      {Math.abs(transaction.amount).toLocaleString()} F
                    </Text>
                    <View
                      style={[
                        styles.transactionStatus,
                        transaction.status === 'completed'
                          ? styles.transactionStatusCompleted
                          : styles.transactionStatusPending,
                      ]}
                    >
                      <Text
                        style={[
                          styles.transactionStatusText,
                          transaction.status === 'completed'
                            ? styles.transactionStatusTextCompleted
                            : styles.transactionStatusTextPending,
                        ]}
                      >
                        {transaction.status === 'completed' ? 'Terminé' : 'En attente'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
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
    backgroundColor: 'rgba(10, 10, 10, 0.95)', // Semi-transparent background for backdrop blur effect
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
    paddingTop: spacing.xl + spacing.lg,
    paddingBottom: spacing.lg,
  },
  headerContent: {
    paddingHorizontal: spacing.xl,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    paddingBottom: spacing.xl * 5,
  },
  balanceCard: {
    marginBottom: spacing.xl,
    borderRadius: radii.xxl,
    overflow: 'hidden',
  },
  balanceGradient: {
    padding: spacing.xl,
    position: 'relative',
  },
  balancePattern: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.1,
  },
  balanceGlow1: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: spacing.xl * 4,
    height: spacing.xl * 4,
    borderRadius: spacing.xl * 2,
    backgroundColor: colors.textPrimary,
    opacity: 0.3,
  },
  balanceGlow2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: spacing.xl * 5,
    height: spacing.xl * 5,
    borderRadius: spacing.xl * 2.5,
    backgroundColor: colors.textPrimary,
    opacity: 0.3,
  },
  balanceContent: {
    position: 'relative',
    zIndex: 1,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  balanceHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  balanceIcon: {
    width: 40, // w-10 (40px) in Figma
    height: 40, // h-10 (40px) in Figma
    borderRadius: radii.md,
    backgroundColor: 'rgba(245, 245, 245, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceLabel: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
  balanceToggle: {
    padding: spacing.sm,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(245, 245, 245, 0.2)',
  },
  balanceAmountContainer: {
    marginBottom: spacing.xl,
    minHeight: spacing.xl * 3,
    justifyContent: 'center',
  },
  balanceAmount: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.displayXl + 4,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  balanceDots: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  balanceDot: {
    width: spacing.md,
    height: spacing.md,
    borderRadius: spacing.md / 2,
    backgroundColor: 'rgba(245, 245, 245, 0.5)',
  },
  balanceActions: {
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
  statsSection: {
    marginBottom: spacing.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  statCard: {
    padding: spacing.lg,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statCardLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption - 1,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.sm,
  },
  statCardValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.xs,
  },
  statCardChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statCardChangeText: {
    color: colors.success,
    fontSize: typography.fontSize.caption - 1,
    fontFamily: typography.fontFamily.inter.regular,
  },
  transactionsSection: {
    marginBottom: spacing.xl * 2,
  },
  transactionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  transactionsTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd + 2,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  seeAllLink: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  transactionsList: {
    gap: spacing.md,
  },
  transactionCard: {
    padding: spacing.lg,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  transactionIcon: {
    width: spacing.xl * 1.5,
    height: spacing.xl * 1.5,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionIconIncome: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  transactionIconWithdraw: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
  transactionContent: {
    flex: 1,
    minWidth: 0,
  },
  transactionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.xs,
  },
  transactionDate: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.xs,
  },
  transactionAmountIncome: {
    color: colors.success,
  },
  transactionAmountWithdraw: {
    color: colors.textPrimary,
  },
  transactionStatus: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs - 2,
    borderRadius: radii.full,
  },
  transactionStatusCompleted: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  transactionStatusPending: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
  transactionStatusText: {
    fontSize: typography.fontSize.caption - 2,
    fontFamily: typography.fontFamily.inter.medium,
  },
  transactionStatusTextCompleted: {
    color: colors.success,
  },
  transactionStatusTextPending: {
    color: colors.secondary,
  },
});
