import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Check } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

export interface LicenseOption {
  name: string;
  price: number;
  features: string[];
}

export interface PricingSelectorProps {
  title?: string;
  licenses: LicenseOption[];
  selectedLicenseIndex: number;
  onSelectLicense: (index: number) => void;
  style?: ViewStyle;
  testID?: string;
}

export function PricingSelector({
  title = 'Choisir une licence',
  licenses,
  selectedLicenseIndex,
  onSelectLicense,
  style,
  testID,
}: PricingSelectorProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.licensesContainer}>
        {licenses.map((license, index) => {
          const isSelected = selectedLicenseIndex === index;
          return (
            <TouchableOpacity
              key={license.name}
              onPress={() => onSelectLicense(index)}
              style={[styles.licenseCard, isSelected && styles.licenseCardSelected]}
              activeOpacity={0.9}
              testID={`license-${index}`}
            >
              <View style={styles.licenseContent}>
                <View style={styles.licenseHeader}>
                  <Text style={styles.licenseName}>{license.name}</Text>
                  {isSelected && (
                    <View style={styles.licenseCheck}>
                      <LinearGradient
                        colors={[colors.primary, colors.primaryDark]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.checkGradient}
                      >
                        <Check size={12} color={colors.textPrimary} />
                      </LinearGradient>
                    </View>
                  )}
                </View>
                <View style={styles.licenseFeatures}>
                  {license.features.map((feature, featureIndex) => (
                    <View key={featureIndex} style={styles.licenseFeature}>
                      <View style={styles.featureDot} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.licensePrice}>{license.price.toLocaleString()} F</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.md,
  },
  licensesContainer: {
    gap: spacing.md,
  },
  licenseCard: {
    width: '100%',
    padding: spacing.md,
    borderRadius: radii.xxl,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  licenseCardSelected: {
    borderColor: colors.primary,
  },
  licenseContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  licenseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    flex: 1,
  },
  licenseName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  licenseCheck: {
    width: 20,
    height: 20,
    borderRadius: radii.full,
    overflow: 'hidden',
  },
  checkGradient: {
    width: '100%',
    height: '100%',
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  licenseFeatures: {
    flex: 1,
    gap: spacing.xs,
  },
  licenseFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureDot: {
    width: 4,
    height: 4,
    borderRadius: radii.full,
    backgroundColor: colors.primary,
  },
  featureText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  licensePrice: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginLeft: spacing.md,
  },
});
