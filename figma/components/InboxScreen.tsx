import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Search, MoreVertical, Send, Paperclip, Mic } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface InboxScreenProps {
  onBack: () => void;
  conversationId?: string | null;
}

export function InboxScreen({ onBack, conversationId }: InboxScreenProps) {
  const [selectedConversation, setSelectedConversation] = useState(conversationId || null);
  const [message, setMessage] = useState('');

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

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const handleSend = () => {
    if (message.trim()) {
      console.log('Send message:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A]">
      {!selectedConversation ? (
        <>
          {/* Inbox Header */}
          <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#404040]/50">
            <div className="px-6 pt-12 pb-4">
              <div className="flex items-center justify-between mb-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onBack}
                  className="p-3 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-[#D4D4D4]" />
                </motion.button>

                <h1 className="text-[#F5F5F5]">Messages</h1>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
                >
                  <Search className="w-5 h-5 text-[#D4D4D4]" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 pb-24">
            <div className="space-y-2">
              {conversations.map((conv, index) => (
                <motion.button
                  key={conv.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedConversation(conv.id)}
                  className="w-full p-4 rounded-2xl bg-[#111111] border border-[#404040] hover:bg-[#1A1A1A] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <ImageWithFallback
                        src={conv.image}
                        alt={conv.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      {conv.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#22C55E] rounded-full border-2 border-[#111111]" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-[#F5F5F5] truncate">{conv.name}</h3>
                        <span className="text-[#A3A3A3] text-xs">{conv.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[#A3A3A3] truncate text-sm">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <div className="ml-2 w-5 h-5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center flex-shrink-0">
                            <span className="text-[#F5F5F5] text-xs">{conv.unread}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Conversation Header */}
          <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#404040]/50">
            <div className="px-6 pt-12 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedConversation(null)}
                    className="p-2 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#D4D4D4]" />
                  </motion.button>

                  <div className="relative">
                    <ImageWithFallback
                      src={selectedConv?.image || ''}
                      alt={selectedConv?.name || ''}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    {selectedConv?.online && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#22C55E] rounded-full border-2 border-[#0A0A0A]" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-[#F5F5F5]">{selectedConv?.name}</h3>
                    <p className="text-[#A3A3A3] text-xs">{selectedConv?.online ? 'En ligne' : 'Hors ligne'}</p>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-[#D4D4D4]" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 pb-24">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] ${msg.isOwn ? '' : 'flex gap-2'}`}>
                    {!msg.isOwn && (
                      <ImageWithFallback
                        src={selectedConv?.image || ''}
                        alt={selectedConv?.name || ''}
                        className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div>
                      <div
                        className={`p-4 rounded-2xl ${
                          msg.isOwn
                            ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]'
                            : 'bg-[#111111] border border-[#404040]'
                        }`}
                      >
                        <p className="text-[#F5F5F5]">{msg.text}</p>
                      </div>
                      <p className={`text-[#A3A3A3] text-xs mt-1 ${msg.isOwn ? 'text-right' : 'text-left ml-2'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="sticky bottom-0 px-6 py-4 bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-[#404040]/50">
            <div className="flex items-end gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors mb-1"
              >
                <Paperclip className="w-5 h-5 text-[#D4D4D4]" />
              </motion.button>

              <div className="flex-1 relative">
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Écrivez un message..."
                  rows={1}
                  className="w-full px-4 py-3 bg-[#111111] border border-[#404040] rounded-2xl text-[#F5F5F5] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all resize-none"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>

              {message.trim() ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="p-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:opacity-90 transition-opacity mb-1"
                >
                  <Send className="w-5 h-5 text-[#F5F5F5]" />
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors mb-1"
                >
                  <Mic className="w-5 h-5 text-[#D4D4D4]" />
                </motion.button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
