import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface DetailRow {
  label: string;
  value: string;
  isPrice?: boolean;
  badge?: string;
}

export interface Party {
  title: string;
  titleColor?: string;
  name: string;
  details: string[];
}

export interface ContractDetailsCardProps {
  type: 'product' | 'parties' | 'transaction';
  title: string;
  icon?: React.ReactNode;
  rows?: DetailRow[];
  parties?: Party[];
  testID?: string;
}

export function ContractDetailsCard({ type, title, icon, rows, parties, testID }: ContractDetailsCardProps) {
  return (
    <AnimatedView entering={FadeIn.delay(100)} style={styles.container} testID={testID}>
      <View style={styles.card}>
        {type === 'product' && icon && (
          <View style={styles.header}>
            {icon}
            <Text style={styles.cardTitle}>{title}</Text>
          </View>
        )}
        {type !== 'product' && <Text style={styles.cardTitle}>{title}</Text>}

        <View style={styles.content}>
          {rows &&
            rows.map((row, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.label}>{row.label}</Text>
                {row.badge ? (
                  <LinearGradient
                    colors={[colors.primary, colors.primaryDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.badge}
                  >
                    <Text style={styles.badgeText}>{row.badge}</Text>
                  </LinearGradient>
                ) : (
                  <Text style={[styles.value, row.isPrice && styles.valuePrice]}>{row.value}</Text>
                )}
              </View>
            ))}

          {parties &&
            parties.map((party, index) => (
              <View key={index} style={[styles.partySection, index < parties.length - 1 && styles.partyBorder]}>
                <Text style={[styles.partyTitle, party.titleColor && { color: party.titleColor }]}>{party.title}</Text>
                <View style={styles.partyInfo}>
                  <Text style={styles.partyName}>{party.name}</Text>
                  {party.details.map((detail, detailIndex) => (
                    <Text key={detailIndex} style={styles.partyDetail}>
                      {detail}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
        </View>
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  card: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md - spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md - spacing.xs,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.md - spacing.xs,
  },
  content: {
    gap: spacing.md - spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  value: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  valuePrice: {
    color: colors.primary,
    fontFamily: typography.fontFamily.inter.medium,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
  },
  badgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
  },
  partySection: {
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
  },
  partyBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  partyTitle: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.sm,
  },
  partyInfo: {
    gap: spacing.xs,
  },
  partyName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  partyDetail: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
