import React, { useState } from 'react';
import { View, ViewStyle, TextInput } from 'react-native';
import { Title } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { Text, SectionCard, Button } from '../../../components/atoms';
import { spacing } from '../../../theme';

export interface OTPFormProps {
  phoneOrEmail: string;
  onOTPSubmit: (otp: string) => void;
  onResend: () => void;
  loading?: boolean;
  resendLoading?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export const OTPForm: React.FC<OTPFormProps> = ({
  phoneOrEmail,
  onOTPSubmit,
  onResend,
  loading = false,
  resendLoading = false,
  style,
  testID,
}) => {
  const theme = useTheme();
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  // const inputRefs = useRef<TextInput[]>([]); // Not used yet

  React.useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOTPChange = (text: string) => {
    setOtp(text);
    if (text.length === 6) {
      onOTPSubmit(text);
    }
  };

  const handleResend = () => {
    onResend();
    setTimeLeft(60);
    setCanResend(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[{ flex: 1, padding: spacing.md }, style]} testID={testID}>
      <SectionCard style={{ maxWidth: 400, width: '100%', alignSelf: 'center' }}>
        <Title style={{ textAlign: 'center', marginBottom: spacing.md }}>Vérification OTP</Title>

        <Text
          style={{
            textAlign: 'center',
            marginBottom: spacing.lg,
            color: theme.colors.onSurfaceVariant,
          }}
        >
          Nous avons envoyé un code à {phoneOrEmail}
        </Text>

        <View style={{ marginBottom: spacing.lg }}>
          <TextInput
            value={otp}
            onChangeText={handleOTPChange}
            placeholder="000000"
            keyboardType="numeric"
            maxLength={6}
            style={{
              fontSize: 24,
              textAlign: 'center',
              letterSpacing: 8,
              borderBottomWidth: 2,
              borderBottomColor: theme.colors.primary,
              paddingVertical: spacing.md,
              marginBottom: spacing.md,
            }}
            autoFocus
          />
        </View>

        <Button
          variant="primary"
          onPress={() => onOTPSubmit(otp)}
          loading={loading}
          disabled={otp.length !== 6 || loading}
          fullWidth={true}
          title="Vérifier le code"
        />

        <View style={{ alignItems: 'center' }}>
          {canResend ? (
            <Button
              variant="ghost"
              size="sm"
              onPress={handleResend}
              loading={resendLoading}
              disabled={resendLoading}
              fullWidth={true}
              title="Renvoyer le code"
            />
          ) : (
            <Text style={{ color: theme.colors.onSurfaceVariant }}>Renvoyer dans {formatTime(timeLeft)}</Text>
          )}
        </View>
      </SectionCard>
    </View>
  );
};

export default OTPForm;
