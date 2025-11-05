import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Search, MoreVertical, Send, Paperclip, Mic } from 'lucide-react-native';
import { ImageWithFallback } from '../../components/atoms/ImageWithFallback';

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
                    <ChevronLeft size={20} color="#D4D4D4" />
                  </TouchableOpacity>
                )}
                <Text style={styles.headerTitle}>Messages</Text>
                <TouchableOpacity style={styles.searchButton} activeOpacity={0.8}>
                  <Search size={20} color="#D4D4D4" />
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
                            colors={['#6366F1', '#8B5CF6']}
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
                    <ChevronLeft size={20} color="#D4D4D4" />
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
                  <MoreVertical size={20} color="#D4D4D4" />
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
                        colors={['#6366F1', '#8B5CF6']}
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
                <Paperclip size={20} color="#D4D4D4" />
              </TouchableOpacity>
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Écrivez un message..."
                placeholderTextColor="#A3A3A3"
                style={styles.input}
                multiline
                maxLength={500}
                textAlignVertical="top"
              />
              {message.trim() ? (
                <TouchableOpacity onPress={handleSend} style={styles.sendButton} activeOpacity={0.8}>
                  <LinearGradient
                    colors={['#6366F1', '#8B5CF6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.sendButtonGradient}
                  >
                    <Send size={20} color="#F5F5F5" />
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.micButton} activeOpacity={0.8}>
                  <Mic size={20} color="#D4D4D4" />
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
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  headerTitle: {
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  searchButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  conversationsContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 96,
  },
  conversationsList: {
    gap: 8,
  },
  conversationCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  conversationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  conversationAvatarContainer: {
    position: 'relative',
  },
  conversationAvatar: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: '#22C55E',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#111111',
  },
  conversationInfo: {
    flex: 1,
    gap: 8,
  },
  conversationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  conversationName: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  conversationTime: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
  },
  conversationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  conversationLastMessage: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  unreadBadgeText: {
    color: '#F5F5F5',
    fontSize: 10,
    fontWeight: '600',
  },
  conversationHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  conversationHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  conversationHeaderAvatarContainer: {
    position: 'relative',
  },
  conversationHeaderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  conversationHeaderOnlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    backgroundColor: '#22C55E',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#0A0A0A',
  },
  conversationHeaderInfo: {
    flex: 1,
    gap: 2,
  },
  conversationHeaderName: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '700',
  },
  conversationHeaderStatus: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
  },
  moreButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  messagesContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 96,
  },
  messagesList: {
    gap: 16,
  },
  messageWrapper: {
    maxWidth: '75%',
    gap: 8,
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
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  messageContent: {
    gap: 4,
  },
  messageBubbleOwn: {
    padding: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  messageBubbleOther: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  messageTextOwn: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '400',
  },
  messageTextOther: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '400',
  },
  messageTime: {
    fontSize: 12,
    fontWeight: '400',
    paddingHorizontal: 4,
  },
  messageTimeOwn: {
    color: '#A3A3A3',
    textAlign: 'right',
  },
  messageTimeOther: {
    color: '#A3A3A3',
    textAlign: 'left',
    marginLeft: 8,
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
    gap: 8,
  },
  attachButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    marginBottom: 4,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
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
    marginBottom: 4,
  },
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    marginBottom: 4,
  },
});
