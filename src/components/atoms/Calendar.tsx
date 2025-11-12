/**
 * Calendar Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Calendar pour sélectionner des dates
 * Optimisé pour mobile avec navigation mois/année
 */

import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ViewProps } from 'react-native';
import { colors, spacing, radii, typography } from '../../theme';

export interface CalendarProps extends ViewProps {
  /** Date sélectionnée */
  selectedDate?: Date;
  /** Callback quand une date est sélectionnée */
  onDateSelect?: (date: Date) => void;
  /** Date minimale sélectionnable */
  minDate?: Date;
  /** Date maximale sélectionnable */
  maxDate?: Date;
  /** Variant du calendar */
  variant?: 'default' | 'compact';
  /** Afficher les jours en dehors du mois */
  showOutsideDays?: boolean;
  /** Mode de sélection (single, range) */
  mode?: 'single' | 'range';
  /** Date de début pour range */
  rangeStart?: Date;
  /** Date de fin pour range */
  rangeEnd?: Date;
}

const DAYS_OF_WEEK = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const MONTHS = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

export default function Calendar({
  selectedDate,
  onDateSelect,
  minDate,
  maxDate,
  variant = 'default',
  showOutsideDays = false,
  mode = 'single',
  rangeStart,
  rangeEnd,
  style,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Obtenir le premier jour du mois et le nombre de jours
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  // Générer les jours du mois
  const days: (Date | null)[] = [];

  // Jours du mois précédent (si showOutsideDays)
  if (showOutsideDays && startingDayOfWeek > 0) {
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonth.getDate() - i));
    }
  } else {
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
  }

  // Jours du mois actuel
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }

  // Jours du mois suivant (pour compléter la grille)
  const remainingDays = 42 - days.length; // 6 semaines * 7 jours
  if (showOutsideDays && remainingDays > 0) {
    for (let day = 1; day <= remainingDays; day++) {
      days.push(new Date(year, month + 1, day));
    }
  } else {
    for (let i = 0; i < remainingDays; i++) {
      days.push(null);
    }
  }

  const isDateDisabled = (date: Date | null): boolean => {
    if (!date) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateSelected = (date: Date | null): boolean => {
    if (!date || !selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isDateInRange = (date: Date | null): boolean => {
    if (!date || mode !== 'range' || !rangeStart || !rangeEnd) return false;
    return date >= rangeStart && date <= rangeEnd;
  };

  const isToday = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleDatePress = (date: Date | null) => {
    if (!date || isDateDisabled(date)) return;
    onDateSelect?.(date);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  return (
    <View style={[styles.container, styles[`container_${variant}`], style]} {...props}>
      {/* Header avec navigation */}
      <View style={styles.header}>
        <Pressable onPress={goToPreviousMonth} style={styles.navButton}>
          <Text style={styles.navIcon}>‹</Text>
        </Pressable>

        <View style={styles.monthYear}>
          <Text style={styles.monthYearText}>
            {MONTHS[month]} {year}
          </Text>
        </View>

        <Pressable onPress={goToNextMonth} style={styles.navButton}>
          <Text style={styles.navIcon}>›</Text>
        </Pressable>
      </View>

      {/* Jours de la semaine */}
      <View style={styles.weekDays}>
        {DAYS_OF_WEEK.map((day, index) => (
          <View key={index} style={styles.weekDay}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Grille des jours */}
      <View style={styles.daysGrid}>
        {days.map((date, index) => {
          const disabled = isDateDisabled(date);
          const selected = isDateSelected(date);
          const inRange = isDateInRange(date);
          const today = isToday(date);
          const isOutsideMonth = date && date.getMonth() !== month;

          return (
            <Pressable
              key={index}
              onPress={() => handleDatePress(date)}
              disabled={disabled}
              style={[
                styles.day,
                selected && styles.day_selected,
                inRange && styles.day_inRange,
                today && !selected && styles.day_today,
                disabled && styles.day_disabled,
                isOutsideMonth && styles.day_outside,
              ]}
            >
              {date && (
                <Text
                  style={[
                    styles.dayText,
                    selected && styles.dayText_selected,
                    inRange && !selected && styles.dayText_inRange,
                    today && !selected && styles.dayText_today,
                    disabled && styles.dayText_disabled,
                    isOutsideMonth && styles.dayText_outside,
                  ]}
                >
                  {date.getDate()}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>

      {/* Bouton Aujourd'hui (optionnel) */}
      {variant === 'default' && (
        <Pressable onPress={goToToday} style={styles.todayButton}>
          <Text style={styles.todayButtonText}>Aujourd'hui</Text>
        </Pressable>
      )}
    </View>
  );
}

Calendar.displayName = 'Calendar';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  container_default: {
    padding: spacing.lg,
  },
  container_compact: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  navButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.md,
  },
  navIcon: {
    fontSize: 24,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  monthYear: {
    flex: 1,
    alignItems: 'center',
  },
  monthYearText: {
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    color: colors.textPrimary,
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  weekDayText: {
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    color: colors.textMuted,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    width: '14.28%', // 100% / 7 jours
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.md,
  },
  day_selected: {
    backgroundColor: colors.primary,
  },
  day_inRange: {
    backgroundColor: colors.primary + '20', // 20% opacity
  },
  day_today: {
    backgroundColor: colors.accent + '20',
  },
  day_disabled: {
    opacity: 0.3,
  },
  day_outside: {
    opacity: 0.5,
  },
  dayText: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textPrimary,
  },
  dayText_selected: {
    color: colors.white,
    fontFamily: typography.fontFamily.inter.medium,
    fontWeight: '600',
  },
  dayText_inRange: {
    color: colors.primary,
  },
  dayText_today: {
    color: colors.accent,
    fontFamily: typography.fontFamily.inter.medium,
    fontWeight: '600',
  },
  dayText_disabled: {
    color: colors.textMuted,
  },
  dayText_outside: {
    color: colors.textMuted,
  },
  todayButton: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignSelf: 'center',
    borderRadius: radii.md,
    backgroundColor: colors.surfaceElevated,
  },
  todayButtonText: {
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    color: colors.primary,
  },
});
