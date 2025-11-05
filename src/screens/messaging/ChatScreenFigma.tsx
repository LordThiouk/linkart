import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Send, AlertCircle } from 'lucide-react-native';
import { ImageWithFallback } from '../../components/atoms/ImageWithFallback';

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
                <ArrowLeft size={20} color="#D4D4D4" />
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
          <AlertCircle size={16} color="#06B6D4" />
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
            <ActivityIndicator size="large" color="#6366F1" />
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
                      colors={['#6366F1', '#8B5CF6']}
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
            placeholderTextColor="#737373"
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
              <ActivityIndicator size="small" color="#F5F5F5" />
            ) : (
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.sendButtonGradient}
              >
                <Send size={20} color="#F5F5F5" />
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
    backgroundColor: '#0A0A0A',
  },
  header: {
    backgroundColor: '#0A0A0A',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  headerContent: {
    gap: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  headerTitle: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
  },
  infoBanner: {
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(6, 182, 212, 0.3)',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  infoBannerContent: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  infoBannerText: {
    flex: 1,
    color: '#06B6D4',
    fontSize: 12,
    fontWeight: '400',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 16,
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
    paddingVertical: 32,
  },
  emptyText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  emptySubtext: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 4,
  },
  messageWrapper: {
    maxWidth: '80%',
    gap: 4,
  },
  messageWrapperOwn: {
    alignSelf: 'flex-end',
  },
  messageWrapperOther: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  messageBubbleOwn: {
    // Gradient handled by LinearGradient
  },
  messageBubbleOther: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  messageGradient: {
    padding: 12,
  },
  messageBubbleOtherView: {
    padding: 12,
  },
  messageTextOwn: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '400',
  },
  messageTextOther: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '400',
  },
  messageTime: {
    fontSize: 12,
    fontWeight: '400',
    paddingHorizontal: 4,
  },
  messageTimeOwn: {
    color: '#737373',
    textAlign: 'right',
  },
  messageTimeOther: {
    color: '#737373',
    textAlign: 'left',
  },
  inputContainer: {
    backgroundColor: '#0A0A0A',
    borderTopWidth: 1,
    borderTopColor: 'rgba(64, 64, 64, 0.5)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 32,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '400',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
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
