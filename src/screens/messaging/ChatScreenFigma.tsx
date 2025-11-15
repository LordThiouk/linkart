import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Send, AlertCircle } from 'lucide-react-native';
import { ImageWithFallback } from '../../components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

const AnimatedView = Animated.createAnimatedComponent(View);

interface Message {
  id: string;
  senderId: string;
  content: string;
  createdAt: number;
}

interface ChatScreenFigmaProps {
  onBack?: () => void;
  conversationId: string;
  otherUserName: string;
  otherUserImage?: string;
  accessToken?: string;
}

export function ChatScreenFigma({
  onBack,
  conversationId,
  otherUserName,
  otherUserImage,
  accessToken,
}: ChatScreenFigmaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    loadMessages();
    // Poll for new messages every 5 seconds
    const interval = setInterval(loadMessages, 5000);
    return () => clearInterval(interval);
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function loadMessages() {
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 500));
      setMessages([
        {
          id: '1',
          senderId: 'other',
          content: "Salut ! J'ai bien reçu tes fichiers audio.",
          createdAt: Date.now() - 3600000,
        },
        {
          id: '2',
          senderId: 'current_user',
          content: 'Super ! Tu penses pouvoir livrer en combien de temps ?',
          createdAt: Date.now() - 3300000,
        },
        {
          id: '3',
          senderId: 'other',
          content: 'Je vais commencer le mixage demain. Tu auras le résultat dans 3 jours maximum.',
          createdAt: Date.now() - 3000000,
        },
      ]);
    } catch (error) {
      console.error('Load messages error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSend() {
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 300));
      const message: Message = {
        id: Date.now().toString(),
        senderId: 'current_user',
        content: newMessage,
        createdAt: Date.now(),
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Send message error:', error);
    } finally {
      setSending(false);
    }
  }

  function scrollToBottom() {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }

  function formatTime(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            {onBack && (
              <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.8}>
                <ArrowLeft size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}

            {otherUserImage && <ImageWithFallback src={otherUserImage} alt={otherUserName} style={styles.userImage} />}

            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>{otherUserName}</Text>
              <Text style={styles.headerSubtitle}>Service - Chat privé</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <View style={styles.infoBannerContent}>
          <AlertCircle size={16} color={colors.cyan} />
          <Text style={styles.infoBannerText}>
            Cette conversation est privée et limitée à ce service. Restez respectueux.
          </Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : messages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun message</Text>
            <Text style={styles.emptySubtext}>Commencez la conversation</Text>
          </View>
        ) : (
          messages.map((message, index) => {
            const isOwn = message.senderId === 'current_user';

            return (
              <AnimatedView
                key={message.id}
                entering={FadeIn.delay(index * 20)}
                style={[styles.messageWrapper, isOwn ? styles.messageWrapperOwn : styles.messageWrapperOther]}
              >
                <View style={[styles.messageBubble, isOwn ? styles.messageBubbleOwn : styles.messageBubbleOther]}>
                  {isOwn ? (
                    <LinearGradient
                      colors={[colors.primary, colors.primaryDark]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.messageGradient}
                    >
                      <Text style={styles.messageTextOwn}>{message.content}</Text>
                    </LinearGradient>
                  ) : (
                    <View style={styles.messageBubbleOtherView}>
                      <Text style={styles.messageTextOther}>{message.content}</Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.messageTime, isOwn ? styles.messageTimeOwn : styles.messageTimeOther]}>
                  {formatTime(message.createdAt)}
                </Text>
              </AnimatedView>
            );
          })
        )}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Écrivez votre message..."
            placeholderTextColor={colors.textMuted}
            style={styles.input}
            multiline
            maxLength={500}
            editable={!sending}
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={!newMessage.trim() || sending}
            style={[styles.sendButton, (!newMessage.trim() || sending) && styles.sendButtonDisabled]}
            activeOpacity={0.8}
          >
            {sending ? (
              <ActivityIndicator size="small" color={colors.textPrimary} />
            ) : (
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.sendButtonGradient}
              >
                <Send size={20} color={colors.textPrimary} />
              </LinearGradient>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: hexToRgba(colors.border, 0.5),
    paddingTop: spacing.xxl + spacing.lg, // 48px
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    gap: spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    flex: 1,
    gap: spacing.xs,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg - 4, // 20px
    fontFamily: typography.fontFamily.poppins.bold,
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  infoBanner: {
    backgroundColor: hexToRgba(colors.cyan, 0.1),
    borderBottomWidth: 1,
    borderBottomColor: hexToRgba(colors.cyan, 0.3),
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md - spacing.xs, // 12px
  },
  infoBannerContent: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  infoBannerText: {
    flex: 1,
    color: colors.cyan,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 128,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  emptySubtext: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    marginTop: spacing.xs,
  },
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
    padding: spacing.md - spacing.xs, // 12px
  },
  messageBubbleOtherView: {
    padding: spacing.md - spacing.xs, // 12px
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
  inputContainer: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: hexToRgba(colors.border, 0.5),
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.md - spacing.xs, // 12px
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md - spacing.xs, // 12px
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
