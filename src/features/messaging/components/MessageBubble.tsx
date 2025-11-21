import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, radii } from '@/theme';

interface MessageBubbleProps {
  content: string;
  time: string;
  isOwn: boolean;
}

export function MessageBubble({ content, time, isOwn }: MessageBubbleProps) {
  return (
    <View style={[styles.messageWrapper, isOwn ? styles.messageWrapperOwn : styles.messageWrapperOther]}>
      <View style={[styles.messageBubble, isOwn ? styles.messageBubbleOwn : styles.messageBubbleOther]}>
        {isOwn ? (
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.messageGradient}
          >
            <Text style={styles.messageTextOwn}>{content}</Text>
          </LinearGradient>
        ) : (
          <View style={styles.messageBubbleOtherView}>
            <Text style={styles.messageTextOther}>{content}</Text>
          </View>
        )}
      </View>
      <Text style={[styles.messageTime, isOwn ? styles.messageTimeOwn : styles.messageTimeOther]}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageWrapper: {
    maxWidth: '80%',
    gap: spacing.xs,
  },
  messageWrapperOwn: {
    alignSelf: 'flex-end',
  },
  messageWrapperOther: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  messageBubbleOwn: {
    // Gradient handled by LinearGradient
  },
  messageBubbleOther: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageGradient: {
    padding: spacing.md - spacing.xs,
  },
  messageBubbleOtherView: {
    padding: spacing.md - spacing.xs,
  },
  messageTextOwn: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  messageTextOther: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  messageTime: {
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    paddingHorizontal: spacing.xs,
  },
  messageTimeOwn: {
    color: colors.textMuted,
    textAlign: 'right',
  },
  messageTimeOther: {
    color: colors.textMuted,
    textAlign: 'left',
  },
});
