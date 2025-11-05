import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
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

const AnimatedText = Animated.createAnimatedComponent(Text);

export function WalletScreenFigma() {
  const [showBalance, setShowBalance] = useState(true);

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
            colors={['#6366F1', '#8B5CF6']}
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
                    <Wallet size={20} color="#F5F5F5" />
                  </View>
                  <Text style={styles.balanceLabel}>Solde disponible</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setShowBalance(!showBalance)}
                  style={styles.balanceToggle}
                  activeOpacity={0.8}
                >
                  {showBalance ? <Eye size={20} color="#F5F5F5" /> : <EyeOff size={20} color="#F5F5F5" />}
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
                    <Download size={20} color="#6366F1" />
                    <Text style={styles.withdrawButtonText}>Retirer</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardButton} activeOpacity={0.9}>
                  <CreditCard size={20} color="#F5F5F5" />
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
              <View key={stat.label} style={styles.statCard}>
                <Text style={styles.statCardLabel}>{stat.label}</Text>
                <Text style={styles.statCardValue}>{stat.value}</Text>
                <View style={styles.statCardChange}>
                  <TrendingUp size={12} color="#22C55E" />
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
                      <ArrowDownLeft size={20} color={transaction.type === 'income' ? '#22C55E' : '#F59E0B'} />
                    ) : (
                      <ArrowUpRight size={20} color="#F59E0B" />
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
    backgroundColor: '#0A0A0A',
  },
  header: {
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
    paddingTop: 48, // pt-12
    paddingBottom: 16, // pb-4
  },
  headerContent: {
    paddingHorizontal: 24, // px-6
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    color: '#F5F5F5',
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 24, // py-6
    paddingBottom: 80, // pb-20
  },
  balanceCard: {
    marginBottom: 24, // py-6
    borderRadius: 24, // rounded-2xl
    overflow: 'hidden',
  },
  balanceGradient: {
    padding: 24, // p-6
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
    width: 128, // w-32
    height: 128, // h-32
    borderRadius: 64,
    backgroundColor: '#F5F5F5',
    opacity: 0.3,
  },
  balanceGlow2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 160, // w-40
    height: 160, // h-40
    borderRadius: 80,
    backgroundColor: '#F5F5F5',
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
    marginBottom: 24, // mb-6
  },
  balanceHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
  },
  balanceIcon: {
    width: 40, // w-10
    height: 40, // h-10
    borderRadius: 12, // rounded-xl
    backgroundColor: 'rgba(245, 245, 245, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceLabel: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  balanceToggle: {
    padding: 8, // p-2
    borderRadius: 8, // rounded-lg
    backgroundColor: 'rgba(245, 245, 245, 0.2)',
  },
  balanceAmountContainer: {
    marginBottom: 24, // mb-6
    minHeight: 48,
    justifyContent: 'center',
  },
  balanceAmount: {
    color: '#F5F5F5',
    fontSize: 36, // text-4xl
    fontFamily: 'Poppins_700Bold',
  },
  balanceDots: {
    flexDirection: 'row',
    gap: 8, // gap-2
  },
  balanceDot: {
    width: 12, // w-3
    height: 12, // h-3
    borderRadius: 6,
    backgroundColor: 'rgba(245, 245, 245, 0.5)',
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 12, // gap-3
  },
  withdrawButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
  },
  withdrawButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8, // gap-2
  },
  withdrawButtonText: {
    color: '#6366F1',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  cardButton: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 12, // py-3
    borderRadius: 24, // rounded-2xl
    backgroundColor: 'rgba(245, 245, 245, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
  },
  cardButtonText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  statsSection: {
    marginBottom: 24, // py-4
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12, // gap-3
  },
  statCard: {
    flex: 1,
    padding: 16, // p-4
    borderRadius: 24, // rounded-2xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  statCardLabel: {
    color: '#A3A3A3',
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  statCardValue: {
    color: '#F5F5F5',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
  },
  statCardChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, // gap-1
  },
  statCardChangeText: {
    color: '#22C55E',
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
  transactionsSection: {
    marginBottom: 32, // pb-8
  },
  transactionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16, // mb-4
  },
  transactionsTitle: {
    color: '#F5F5F5',
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
  },
  seeAllLink: {
    color: '#6366F1',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  transactionsList: {
    gap: 12, // space-y-3
  },
  transactionCard: {
    padding: 16, // p-4
    borderRadius: 24, // rounded-2xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // gap-3
  },
  transactionIcon: {
    width: 48, // w-12
    height: 48, // h-12
    borderRadius: 12, // rounded-xl
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
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 4,
  },
  transactionDate: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
  },
  transactionAmountIncome: {
    color: '#22C55E',
  },
  transactionAmountWithdraw: {
    color: '#F5F5F5',
  },
  transactionStatus: {
    paddingHorizontal: 8, // px-2
    paddingVertical: 2, // py-0.5
    borderRadius: 999,
  },
  transactionStatusCompleted: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  transactionStatusPending: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
  transactionStatusText: {
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
  },
  transactionStatusTextCompleted: {
    color: '#22C55E',
  },
  transactionStatusTextPending: {
    color: '#F59E0B',
  },
});
