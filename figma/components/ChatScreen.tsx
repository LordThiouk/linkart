import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send, AlertCircle, Loader2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { api } from '../utils/api';
import { toast } from 'sonner@2.0.3';

interface ChatScreenProps {
  onBack: () => void;
  conversationId: string;
  otherUserName: string;
  otherUserImage?: string;
  accessToken: string;
}

export function ChatScreen({ onBack, conversationId, otherUserName, otherUserImage, accessToken }: ChatScreenProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      const { messages: data } = await api.messages.list(conversationId, accessToken);
      setMessages(data);
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
      const { message } = await api.messages.send(conversationId, newMessage, accessToken);
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Send message error:', error);
      toast.error("Erreur lors de l'envoi");
    } finally {
      setSending(false);
    }
  }

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  function formatTime(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#404040]/50">
        <div className="px-6 pt-12 pb-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-2 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#D4D4D4]" />
            </motion.button>

            {otherUserImage && (
              <ImageWithFallback
                src={otherUserImage}
                alt={otherUserName}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}

            <div className="flex-1">
              <h1 className="text-[#F5F5F5]">{otherUserName}</h1>
              <p className="text-[#A3A3A3] text-xs">Service - Chat privé</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="px-6 py-3 bg-[#06B6D4]/10 border-b border-[#06B6D4]/30">
        <div className="flex gap-2">
          <AlertCircle className="w-4 h-4 text-[#06B6D4] flex-shrink-0 mt-0.5" />
          <p className="text-[#06B6D4] text-xs">
            Cette conversation est privée et limitée à ce service. Restez respectueux.
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-6 h-6 text-[#6366F1] animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-[#A3A3A3] py-8">
            <p className="text-sm">Aucun message</p>
            <p className="text-xs mt-1">Commencez la conversation</p>
          </div>
        ) : (
          messages.map((message, index) => {
            const isOwn = message.senderId === 'current_user'; // TODO: use real user ID

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${isOwn ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`p-3 rounded-2xl ${
                      isOwn
                        ? 'bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5]'
                        : 'bg-[#111111] border border-[#404040] text-[#D4D4D4]'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  </div>
                  <p className={`text-[#737373] text-xs mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                    {formatTime(message.createdAt)}
                  </p>
                </div>
              </motion.div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 px-6 py-4 bg-[#0A0A0A] border-t border-[#404040]/50">
        <div className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Écrivez votre message..."
            className="flex-1 px-4 py-3 rounded-xl bg-[#111111] border border-[#404040] text-[#F5F5F5] placeholder-[#737373] focus:border-[#6366F1] focus:outline-none"
            disabled={sending}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!newMessage.trim() || sending}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
