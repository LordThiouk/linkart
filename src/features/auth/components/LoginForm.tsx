import React, { useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { Title } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { Input, Text, SectionCard, Button } from '../../../components/atoms';
import { tokens } from '../../../theme';

export interface LoginFormProps {
  onPhoneSubmit: (phone: string) => void;
  onEmailSubmit: (email: string) => void;
  loading?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onPhoneSubmit,
  onEmailSubmit,
  loading = false,
  style,
  testID,
}) => {
  const theme = useTheme();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');

  const handlePhoneSubmit = () => {
    if (phone.trim()) {
      onPhoneSubmit(phone.trim());
    }
  };

  const handleEmailSubmit = () => {
    if (email.trim()) {
      onEmailSubmit(email.trim());
    }
  };

  return (
    <View style={[{ flex: 1, padding: tokens.spacing.md }, style]} testID={testID}>
      <SectionCard style={{ maxWidth: 400, width: '100%', alignSelf: 'center' }}>
        <Title style={{ textAlign: 'center', marginBottom: tokens.spacing.lg }}>Connexion à Linkart</Title>

        <View style={{ marginBottom: tokens.spacing.md }}>
          <Button
            variant={loginMethod === 'phone' ? 'primary' : 'outline'}
            onPress={() => setLoginMethod('phone')}
            style={{ marginBottom: tokens.spacing.sm }}
            icon="phone"
          >
            Téléphone
          </Button>
          <Button
            variant={loginMethod === 'email' ? 'primary' : 'outline'}
            onPress={() => setLoginMethod('email')}
            icon="email"
          >
            Email
          </Button>
        </View>

        {loginMethod === 'phone' ? (
          <View>
            <Input
              label="Numéro de téléphone"
              placeholder="+221 77 123 45 67"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={{ marginBottom: tokens.spacing.md }}
            />
            <Button variant="primary" onPress={handlePhoneSubmit} loading={loading} disabled={!phone.trim() || loading}>
              Envoyer le code OTP
            </Button>
          </View>
        ) : (
          <View>
            <Input
              label="Adresse email"
              placeholder="votre@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{ marginBottom: tokens.spacing.md }}
            />
            <Button variant="primary" onPress={handleEmailSubmit} loading={loading} disabled={!email.trim() || loading}>
              Envoyer le code OTP
            </Button>
          </View>
        )}

        <Text
          style={{
            textAlign: 'center',
            marginTop: tokens.spacing.md,
            color: theme.colors.onSurfaceVariant,
          }}
        >
          En continuant, vous acceptez nos conditions d'utilisation
        </Text>
      </SectionCard>
    </View>
  );
};
