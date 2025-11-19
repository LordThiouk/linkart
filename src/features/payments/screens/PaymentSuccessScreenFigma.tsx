import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme';
import {
  SuccessIcon,
  SuccessMessage,
  PurchaseDetailsCard,
  NextStepsSection,
  SuccessActionButtons,
} from '@/features/payments/components';

interface PaymentSuccessScreenFigmaProps {
  onGoHome?: () => void;
  onViewPurchases?: () => void;
  onDownload?: () => void;
  transactionId: string;
  productTitle: string;
  licenseType: string;
  amount: number;
}

export function PaymentSuccessScreenFigma({
  onGoHome,
  onViewPurchases,
  onDownload,
  transactionId,
  productTitle,
  licenseType,
  amount,
}: PaymentSuccessScreenFigmaProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        <SuccessIcon />
        <SuccessMessage />
        <PurchaseDetailsCard
          productTitle={productTitle}
          licenseType={licenseType}
          amount={amount}
          transactionId={transactionId}
        />
        <NextStepsSection />
        <SuccessActionButtons onDownload={onDownload} onViewPurchases={onViewPurchases} onGoHome={onGoHome} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    paddingBottom: spacing.xxl + spacing.xl, // 80px
    gap: spacing.xl,
  },
});
