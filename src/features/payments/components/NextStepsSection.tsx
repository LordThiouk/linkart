import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { FileText, Download } from 'lucide-react-native';
import { colors, spacing, typography } from '@/theme';
import { StepCard } from './StepCard';

const AnimatedView = Animated.createAnimatedComponent(View);

interface NextStepsSectionProps {
  delay?: number;
}

export function NextStepsSection({ delay = 800 }: NextStepsSectionProps) {
  return (
    <AnimatedView entering={FadeInDown.delay(delay)} style={styles.container}>
      <Text style={styles.title}>Prochaines étapes</Text>
      <View style={styles.list}>
        <StepCard
          icon={FileText}
          title="Contrat de licence disponible"
          description='Téléchargez votre contrat PDF depuis "Mes Achats"'
          gradientColors={[colors.primary, colors.primaryDark]}
        />
        <StepCard
          icon={Download}
          title="Fichiers prêts au téléchargement"
          description="Téléchargez vos fichiers audio haute qualité"
          gradientColors={[colors.success, colors.successDark]}
        />
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    gap: spacing.md - spacing.xs, // 12px
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg - 4, // 20px
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.md - spacing.xs, // 12px
    textAlign: 'center',
  },
  list: {
    gap: spacing.md - spacing.xs, // 12px
  },
});
