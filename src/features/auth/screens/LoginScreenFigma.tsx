import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginHeader, ContactTypeSelector, LoginForm } from '../components';
import { colors, spacing } from '@/theme';

export interface LoginScreenFigmaProps {
  onSubmit: (contact: string) => void;
  onBack?: () => void;
}

export function LoginScreenFigma({ onSubmit, onBack }: LoginScreenFigmaProps) {
  const [contact, setContact] = useState('');
  const [contactType, setContactType] = useState<'phone' | 'email'>('phone');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');

    if (!contact.trim()) {
      setError('Ce champ est requis');
      return;
    }

    if (contactType === 'email' && !contact.includes('@')) {
      setError('Email invalide');
      return;
    }

    if (contactType === 'phone' && contact.replace(/\D/g, '').length < 10) {
      setError('Numéro de téléphone invalide');
      return;
    }

    onSubmit(contact);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <LoginHeader title="Bienvenue" subtitle="Connectez-vous pour continuer" />

          <View style={styles.formWrapper}>
            <ContactTypeSelector contactType={contactType} onTypeChange={setContactType} />

            <LoginForm
              contactType={contactType}
              contact={contact}
              error={error}
              onContactChange={setContact}
              onSubmit={handleSubmit}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
  },
  formWrapper: {
    flex: 1,
  },
});
