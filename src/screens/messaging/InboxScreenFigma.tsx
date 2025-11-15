import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Search, MoreVertical, Send, Paperclip, Mic } from 'lucide-react-native';
import { ImageWithFallback } from '../../components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface InboxScreenFigmaProps {
  onBack?: () => void;
  conversationId?: string | null;
}

const conversations = [
  {
    id: '1',
    name: 'Audio Engineer Pro',
    image: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
    lastMessage: 'Parfait, je commence le mixage demain !',
    time: 'Il y a 10 min',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'KofiBeats',
    image: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    lastMessage: 'Merci pour le beat 🔥',
    time: 'Il y a 2h',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: 'Studio Master',
    image: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100',
    lastMessage: 'Quand peux-tu passer au studio ?',
    time: 'Hier',
    unread: 1,
    online: true,
  },
];

const messages = [
  {
    id: '1',
    senderId: '1',
    text: "Salut ! J'ai bien reçu tes fichiers audio.",
    time: '14:30',
    isOwn: false,
  },
  {
    id: '2',
    senderId: 'me',
    text: 'Super ! Tu penses pouvoir livrer en combien de temps ?',
    time: '14:32',
    isOwn: true,
  },
  {
    id: '3',
    senderId: '1',
    text: 'Je vais commencer le mixage demain. Tu auras le résultat dans 3 jours maximum.',
    time: '14:35',
    isOwn: false,
  },
  {
    id: '4',
    senderId: 'me',
    text: 'Parfait, merci !',
    time: '14:36',
    isOwn: true,
  },
  {
    id: '5',
    senderId: '1',
    text: 'Parfait, je commence le mixage demain !',
    time: '14:40',
    isOwn: false,
  },
];

export function InboxScreenFigma({ onBack, conversationId }: InboxScreenFigmaProps) {
  const [selectedConversation, setSelectedConversation] = useState(conversationId || null);
  const [message, setMessage] = useState('');

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const handleSend = () => {
    if (message.trim()) {
      console.log('Send message:', message);
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!selectedConversation ? (
        <>
          {/* Inbox Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.headerTop}>
                {onBack && (
                  <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.8}>
                    <ChevronLeft size={20} color={colors.textSecondary} />
                  </TouchableOpacity>
                )}
                <Text style={styles.headerTitle}>Messages</Text>
                <TouchableOpacity style={styles.searchButton} activeOpacity={0.8}>
                  <Search size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Conversations List */}
          <ScrollView
            contentContainerStyle={styles.conversationsContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.conversationsList}>
              {conversations.map((conv, index) => (
                <AnimatedTouchableOpacity
                  key={conv.id}
                  entering={FadeInLeft.delay(index * 50)}
                  onPress={() => setSelectedConversation(conv.id)}
                  style={styles.conversationCard}
                  activeOpacity={0.9}
                >
                  <View style={styles.conversationContent}>
                    <View style={styles.conversationAvatarContainer}>
                      <ImageWithFallback src={conv.image} alt={conv.name} style={styles.conversationAvatar} />
                      {conv.online && <View style={styles.onlineIndicator} />}
                    </View>
                    <View style={styles.conversationInfo}>
                      <View style={styles.conversationHeader}>
                        <Text style={styles.conversationName} numberOfLines={1}>
                          {conv.name}
                        </Text>
                        <Text style={styles.conversationTime}>{conv.time}</Text>
                      </View>
                      <View style={styles.conversationFooter}>
                        <Text style={styles.conversationLastMessage} numberOfLines={1}>
                          {conv.lastMessage}
                        </Text>
                        {conv.unread > 0 && (
                          <LinearGradient
                            colors={[colors.primary, colors.primaryDark]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.unreadBadge}
                          >
                            <Text style={styles.unreadBadgeText}>{conv.unread}</Text>
                          </LinearGradient>
                        )}
                      </View>
                    </View>
                  </View>
                </AnimatedTouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </>
      ) : (
        <>
          {/* Conversation Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.conversationHeaderTop}>
                <View style={styles.conversationHeaderLeft}>
                  <TouchableOpacity
                    onPress={() => setSelectedConversation(null)}
                    style={styles.backButton}
                    activeOpacity={0.8}
                  >
                    <ChevronLeft size={20} color={colors.textSecondary} />
                  </TouchableOpacity>
                  <View style={styles.conversationHeaderAvatarContainer}>
                    <ImageWithFallback
                      src={selectedConv?.image || ''}
                      alt={selectedConv?.name || ''}
                      style={styles.conversationHeaderAvatar}
                    />
                    {selectedConv?.online && <View style={styles.conversationHeaderOnlineIndicator} />}
                  </View>
                  <View style={styles.conversationHeaderInfo}>
                    <Text style={styles.conversationHeaderName}>{selectedConv?.name}</Text>
                    <Text style={styles.conversationHeaderStatus}>
                      {selectedConv?.online ? 'En ligne' : 'Hors ligne'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.moreButton} activeOpacity={0.8}>
                  <MoreVertical size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Messages */}
          <ScrollView
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.messagesList}>
              {messages.map((msg, index) => (
                <AnimatedView
                  key={msg.id}
                  entering={FadeInDown.delay(index * 50)}
                  style={[styles.messageWrapper, msg.isOwn ? styles.messageWrapperOwn : styles.messageWrapperOther]}
                >
                  {!msg.isOwn && (
                    <ImageWithFallback
                      src={selectedConv?.image || ''}
                      alt={selectedConv?.name || ''}
                      style={styles.messageAvatar}
                    />
                  )}
                  <View style={styles.messageContent}>
                    {msg.isOwn ? (
                      <LinearGradient
                        colors={[colors.primary, colors.primaryDark]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.messageBubbleOwn}
                      >
                        <Text style={styles.messageTextOwn}>{msg.text}</Text>
                      </LinearGradient>
                    ) : (
                      <View style={styles.messageBubbleOther}>
                        <Text style={styles.messageTextOther}>{msg.text}</Text>
                      </View>
                    )}
                    <Text style={[styles.messageTime, msg.isOwn ? styles.messageTimeOwn : styles.messageTimeOther]}>
                      {msg.time}
                    </Text>
                  </View>
                </AnimatedView>
              ))}
            </View>
          </ScrollView>

          {/* Message Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TouchableOpacity style={styles.attachButton} activeOpacity={0.8}>
                <Paperclip size={20} color={colors.textSecondary} />
              </TouchableOpacity>
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Écrivez un message..."
                placeholderTextColor={colors.textMuted}
                style={styles.input}
                multiline
                maxLength={500}
                textAlignVertical="top"
              />
              {message.trim() ? (
                <TouchableOpacity onPress={handleSend} style={styles.sendButton} activeOpacity={0.8}>
                  <LinearGradient
                    colors={[colors.primary, colors.primaryDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.sendButtonGradient}
                  >
                    <Send size={20} color={colors.textPrimary} />
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.micButton} activeOpacity={0.8}>
                  <Mic size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </>
      )}
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
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  backButton: {
    padding: spacing.md - spacing.xs, // 12px
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg + 4, // 28px
    fontFamily: typography.fontFamily.poppins.bold,
    flex: 1,
    textAlign: 'center',
  },
  searchButton: {
    padding: spacing.md - spacing.xs, // 12px
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  conversationsContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xxl * 4, // 96px
  },
  conversationsList: {
    gap: spacing.sm,
  },
  conversationCard: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  conversationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md - spacing.xs, // 12px
  },
  conversationAvatarContainer: {
    position: 'relative',
  },
  conversationAvatar: {
    width: 56,
    height: 56,
    borderRadius: radii.md,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: spacing.md - spacing.xs, // 12px
    height: spacing.md - spacing.xs, // 12px
    backgroundColor: colors.success,
    borderRadius: spacing.md / 2, // 6px (half of width/height for perfect circle)
    borderWidth: 2,
    borderColor: colors.surface,
  },
  conversationInfo: {
    flex: 1,
    gap: spacing.sm,
  },
  conversationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  conversationName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
    flex: 1,
  },
  conversationTime: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  conversationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  conversationLastMessage: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    flex: 1,
  },
  unreadBadge: {
    width: spacing.xl - spacing.xs, // 20px
    height: spacing.xl - spacing.xs, // 20px
    borderRadius: spacing.xl / 2, // 10px (half of width/height for perfect circle)
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  unreadBadgeText: {
    color: colors.textPrimary,
    fontSize: 10,
    fontFamily: typography.fontFamily.inter.medium,
  },
  conversationHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  conversationHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md - spacing.xs, // 12px
    flex: 1,
  },
  conversationHeaderAvatarContainer: {
    position: 'relative',
  },
  conversationHeaderAvatar: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
  },
  conversationHeaderOnlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    backgroundColor: colors.success,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.background,
  },
  conversationHeaderInfo: {
    flex: 1,
    gap: 2,
  },
  conversationHeaderName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd, // 18px
    fontFamily: typography.fontFamily.poppins.bold,
  },
  conversationHeaderStatus: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  moreButton: {
    padding: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messagesContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xxl * 4, // 96px
  },
  messagesList: {
    gap: spacing.md,
  },
  messageWrapper: {
    maxWidth: '75%',
    gap: spacing.sm,
  },
  messageWrapperOwn: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  messageWrapperOther: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  messageAvatar: {
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: radii.sm,
  },
  messageContent: {
    gap: spacing.xs,
  },
  messageBubbleOwn: {
    padding: spacing.md,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  messageBubbleOther: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageTextOwn: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  messageTextOther: {
    color: colors.textPrimary,
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
    marginLeft: spacing.sm,
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
    gap: spacing.sm,
  },
  attachButton: {
    padding: spacing.md - spacing.xs, // 12px
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xs,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md - spacing.xs, // 12px
    borderRadius: radii.lg,
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
    marginBottom: spacing.xs,
  },
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButton: {
    padding: spacing.md - spacing.xs, // 12px
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xs,
  },
});
