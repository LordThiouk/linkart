import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '@/theme';
import { ChatHeader, InfoBanner, MessageBubble, MessageComposer } from '@/features/messaging/components';

const AnimatedView = Animated.createAnimatedComponent(View);

interface Message {
  id: string;
  senderId: string;
  content: string;
  createdAt: number;
}

export interface ChatScreenFigmaProps {
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
      <ChatHeader onBack={onBack} otherUserName={otherUserName} otherUserImage={otherUserImage} />

      <InfoBanner message="Cette conversation est privée et limitée à ce service. Restez respectueux." />

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
              <AnimatedView key={message.id} entering={FadeIn.delay(index * 20)}>
                <MessageBubble content={message.content} time={formatTime(message.createdAt)} isOwn={isOwn} />
              </AnimatedView>
            );
          })
        )}
      </ScrollView>

      <MessageComposer
        value={newMessage}
        onChangeText={setNewMessage}
        onSend={handleSend}
        sending={sending}
        disabled={!accessToken}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
});
