import { View, Text, StyleSheet } from 'react-native';
import { Package } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

interface PurchaseEmptyStateProps {
  title?: string;
  subtitle?: string;
}

export function PurchaseEmptyState({
  title = 'Aucun achat',
  subtitle = 'Vos achats apparaîtront ici',
}: PurchaseEmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Package size={40} color={colors.border} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2, // 48px
    paddingHorizontal: spacing.lg,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: radii.full, // Circular icon
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg - 4, // 20px
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
