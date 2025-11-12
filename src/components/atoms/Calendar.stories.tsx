/**
 * Calendar Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import { useState } from 'react';
import Calendar from './Calendar';
import { colors, spacing } from '../../theme';

const meta: Meta<typeof Calendar> = {
  title: 'Atoms/Calendar',
  component: Calendar,
  decorators: [
    Story => (
      <View
        style={{
          flex: 1,
          padding: spacing.lg,
          backgroundColor: colors.background,
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Calendar par défaut
 */
export const Default: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    return (
      <View>
        <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        {selectedDate && (
          <Text style={{ color: colors.textSecondary, marginTop: spacing.md, textAlign: 'center' }}>
            Date sélectionnée : {selectedDate.toLocaleDateString('fr-FR')}
          </Text>
        )}
      </View>
    );
  },
};

/**
 * Calendar compact
 */
export const Compact: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    return <Calendar variant="compact" selectedDate={selectedDate} onDateSelect={setSelectedDate} />;
  },
};

/**
 * Calendar avec dates min/max
 */
export const WithMinMax: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 7); // 7 jours dans le passé
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30); // 30 jours dans le futur

    return (
      <View>
        <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} minDate={minDate} maxDate={maxDate} />
        <Text style={{ color: colors.textMuted, marginTop: spacing.md, fontSize: 12, textAlign: 'center' }}>
          Dates disponibles : {minDate.toLocaleDateString('fr-FR')} - {maxDate.toLocaleDateString('fr-FR')}
        </Text>
      </View>
    );
  },
};

/**
 * Calendar avec jours extérieurs
 */
export const WithOutsideDays: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    return <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} showOutsideDays />;
  },
};

/**
 * Calendar mode range
 */
export const RangeMode: Story = {
  render: () => {
    const [rangeStart, setRangeStart] = useState<Date | undefined>(undefined);
    const [rangeEnd, setRangeEnd] = useState<Date | undefined>(undefined);

    const handleDateSelect = (date: Date) => {
      if (!rangeStart || rangeEnd) {
        setRangeStart(date);
        setRangeEnd(undefined);
      } else if (date < rangeStart) {
        setRangeStart(date);
        setRangeEnd(rangeStart);
      } else {
        setRangeEnd(date);
      }
    };

    return (
      <View>
        <Calendar mode="range" rangeStart={rangeStart} rangeEnd={rangeEnd} onDateSelect={handleDateSelect} />
        {rangeStart && (
          <Text style={{ color: colors.textSecondary, marginTop: spacing.md, textAlign: 'center' }}>
            Du {rangeStart.toLocaleDateString('fr-FR')}
            {rangeEnd && ` au ${rangeEnd.toLocaleDateString('fr-FR')}`}
          </Text>
        )}
      </View>
    );
  },
};

/**
 * Calendar sans sélection initiale
 */
export const NoInitialSelection: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    return (
      <View>
        <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        {selectedDate ? (
          <Text style={{ color: colors.textSecondary, marginTop: spacing.md, textAlign: 'center' }}>
            Date sélectionnée : {selectedDate.toLocaleDateString('fr-FR')}
          </Text>
        ) : (
          <Text style={{ color: colors.textMuted, marginTop: spacing.md, textAlign: 'center' }}>
            Aucune date sélectionnée
          </Text>
        )}
      </View>
    );
  },
};
