import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
  CreditCard,
  Download,
  Wallet,
} from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';

export function WalletScreen() {
  const [showBalance, setShowBalance] = useState(true);

  const transactions = [
    {
      id: '1',
      type: 'income',
      title: 'Vente - Afrobeat Summer',
      amount: 24.99,
      date: "Aujourd'hui",
      status: 'completed',
    },
    {
      id: '2',
      type: 'income',
      title: 'Vente - Lagos Nights (Premium)',
      amount: 49.99,
      date: 'Hier',
      status: 'completed',
    },
    {
      id: '3',
      type: 'withdraw',
      title: 'Retrait vers compte bancaire',
      amount: -150.0,
      date: 'Il y a 2 jours',
      status: 'pending',
    },
    {
      id: '4',
      type: 'income',
      title: 'Service - Mixing & Mastering',
      amount: 42.49,
      date: 'Il y a 3 jours',
      status: 'completed',
    },
  ];

  const stats = [
    { label: 'Ce mois', value: '€342.50', change: '+12%' },
    { label: 'Ventes totales', value: '47', change: '+8' },
    { label: 'En attente', value: '€150.00', change: '1' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-20 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#404040]/50">
        <div className="px-6 pt-12 pb-4">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h1 className="text-[#F5F5F5] mb-1">Wallet</h1>
            <p className="text-[#A3A3A3]">Gérez vos revenus</p>
          </motion.div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-6 py-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative p-6 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] overflow-hidden"
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5F5F5] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#F5F5F5] rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#F5F5F5]/20 backdrop-blur-sm flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-[#F5F5F5]" />
                </div>
                <span className="text-[#F5F5F5]">Solde disponible</span>
              </div>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 rounded-lg bg-[#F5F5F5]/20 backdrop-blur-sm hover:bg-[#F5F5F5]/30 transition-colors"
              >
                {showBalance ? (
                  <Eye className="w-5 h-5 text-[#F5F5F5]" />
                ) : (
                  <EyeOff className="w-5 h-5 text-[#F5F5F5]" />
                )}
              </button>
            </div>

            <div className="mb-6">
              {showBalance ? (
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#F5F5F5]"
                  style={{ fontSize: '36px' }}
                >
                  €1,247.48
                </motion.h1>
              ) : (
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="w-3 h-3 rounded-full bg-[#F5F5F5]/50" />
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <PrimaryButton className="flex-1 bg-[#F5F5F5] text-[#6366F1] hover:bg-[#F5F5F5]/90">
                <Download className="w-5 h-5 mr-2" />
                Retirer
              </PrimaryButton>
              <button className="px-6 py-3 rounded-2xl bg-[#F5F5F5]/20 backdrop-blur-sm text-[#F5F5F5] hover:bg-[#F5F5F5]/30 transition-colors flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Carte
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-2xl bg-[#111111] border border-[#404040]"
            >
              <p className="text-[#A3A3A3] mb-2" style={{ fontSize: '11px' }}>
                {stat.label}
              </p>
              <div className="text-[#F5F5F5] mb-1">{stat.value}</div>
              <div className="flex items-center gap-1 text-[#22C55E]">
                <TrendingUp className="w-3 h-3" />
                <span style={{ fontSize: '11px' }}>{stat.change}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div className="px-6 py-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#F5F5F5]">Transactions récentes</h2>
          <button className="text-[#6366F1] hover:text-[#8B5CF6] transition-colors">Voir tout</button>
        </div>

        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-2xl bg-[#111111] border border-[#404040] hover:bg-[#1A1A1A] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-[#22C55E]/20' : 'bg-[#F59E0B]/20'
                  }`}
                >
                  {transaction.type === 'income' ? (
                    <ArrowDownLeft
                      className={`w-5 h-5 ${transaction.type === 'income' ? 'text-[#22C55E]' : 'text-[#F59E0B]'}`}
                    />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-[#F59E0B]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-[#F5F5F5] truncate">{transaction.title}</h3>
                  <p className="text-[#A3A3A3]">{transaction.date}</p>
                </div>

                <div className="text-right">
                  <div className={`${transaction.amount > 0 ? 'text-[#22C55E]' : 'text-[#F5F5F5]'}`}>
                    {transaction.amount > 0 ? '+' : ''}€{Math.abs(transaction.amount).toFixed(2)}
                  </div>
                  <div
                    className={`px-2 py-0.5 rounded-full inline-block ${
                      transaction.status === 'completed'
                        ? 'bg-[#22C55E]/20 text-[#22C55E]'
                        : 'bg-[#F59E0B]/20 text-[#F59E0B]'
                    }`}
                    style={{ fontSize: '10px' }}
                  >
                    {transaction.status === 'completed' ? 'Terminé' : 'En attente'}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
