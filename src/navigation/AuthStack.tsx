import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput, Card, Title, Paragraph, ActivityIndicator, Snackbar, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';

const Stack = createStackNavigator();

function WelcomeScreen({ navigation }: { navigation: any }) {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailMode, setIsEmailMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signInWithEmail } = useAuth();

  const handleSendOtp = async () => {
    setLoading(true);
    setError('');

    try {
      const { error } = isEmailMode ? await signInWithEmail(email) : await signIn(phone);

      if (error) {
        setError(error.message || "Erreur lors de l'envoi du code");
      } else {
        navigation.navigate('VerifyOtp', {
          phone: isEmailMode ? null : phone,
          email: isEmailMode ? email : null,
        });
      }
    } catch {
      setError("Une erreur inattendue s'est produite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo and Title */}
        <View style={styles.logoSection}>
          <Surface style={styles.logoContainer} elevation={2}>
            <Text style={styles.logoEmoji}>🎵</Text>
          </Surface>
          <View style={styles.titleSection}>
            <Title style={styles.appTitle}>Linkart</Title>
            <Paragraph style={styles.subtitle}>La plateforme musicale du Sénégal</Paragraph>
          </View>
        </View>

        {/* Auth Form */}
        <Card style={styles.authCard}>
          <Card.Content>
            <Title style={styles.inputLabel}>{isEmailMode ? 'Adresse email' : 'Numéro de téléphone'}</Title>
            <TextInput
              mode="outlined"
              placeholder={isEmailMode ? 'votre@email.com' : '+221 70 123 45 67'}
              value={isEmailMode ? email : phone}
              onChangeText={isEmailMode ? setEmail : setPhone}
              keyboardType={isEmailMode ? 'email-address' : 'phone-pad'}
              style={styles.textInput}
            />

            <Button
              mode="contained"
              onPress={handleSendOtp}
              disabled={loading || (!phone && !email)}
              style={styles.continueButton}
              contentStyle={styles.buttonContent}
            >
              {loading ? <ActivityIndicator color="white" /> : 'Continuer'}
            </Button>

            <View style={styles.switchModeContainer}>
              <Text style={styles.switchModeText}>{isEmailMode ? 'Vous avez un compte?' : 'Pas de compte?'}</Text>
              <Button mode="text" onPress={() => setIsEmailMode(!isEmailMode)} compact>
                {isEmailMode ? 'Utiliser le téléphone' : "Utiliser l'email"}
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Features */}
        <View style={styles.featuresSection}>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>🎵</Text>
            <Text style={styles.featureText}>Vendez vos beats et samples</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>🎧</Text>
            <Text style={styles.featureText}>Trouvez des services audio</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>💰</Text>
            <Text style={styles.featureText}>Gagnez de l'argent avec votre talent</Text>
          </View>
        </View>
      </ScrollView>

      <Snackbar visible={!!error} onDismiss={() => setError('')} duration={4000} style={styles.snackbar}>
        {error}
      </Snackbar>
    </SafeAreaView>
  );
}

function VerifyOtpScreen({ navigation, route }: { navigation: any; route: any }) {
  const { phone, email } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { verifyOtp, verifyEmailOtp } = useAuth();

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError('');

    try {
      const { error } = phone ? await verifyOtp(phone, otp) : await verifyEmailOtp(email, otp);

      if (error) {
        setError(error.message || 'Code de vérification invalide');
      }
      // Navigation will be handled by AuthContext
    } catch {
      setError("Une erreur inattendue s'est produite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.verifyContent}>
        <View style={styles.verifyHeader}>
          <Title style={styles.verifyTitle}>Vérification du code</Title>
          <Paragraph style={styles.verifySubtitle}>
            Entrez le code de vérification envoyé à{'\n'}
            {phone || email}
          </Paragraph>
        </View>

        <Card style={styles.verifyCard}>
          <Card.Content>
            <TextInput
              mode="outlined"
              placeholder="123456"
              value={otp}
              onChangeText={setOtp}
              textAlign="center"
              keyboardType="numeric"
              maxLength={6}
              style={styles.otpInput}
            />

            <Button
              mode="contained"
              onPress={handleVerifyOtp}
              disabled={loading || otp.length !== 6}
              style={styles.verifyButton}
              contentStyle={styles.buttonContent}
            >
              {loading ? <ActivityIndicator color="white" /> : 'Vérifier'}
            </Button>

            <Button mode="text" onPress={() => navigation.goBack()} style={styles.resendButton}>
              Renvoyer le code
            </Button>
          </Card.Content>
        </Card>
      </View>

      <Snackbar visible={!!error} onDismiss={() => setError('')} duration={4000} style={styles.snackbar}>
        {error}
      </Snackbar>
    </SafeAreaView>
  );
}

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoEmoji: {
    fontSize: 32,
  },
  titleSection: {
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 16,
  },
  authCard: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    marginBottom: 16,
  },
  continueButton: {
    marginBottom: 16,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  switchModeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  switchModeText: {
    color: '#6b7280',
    marginRight: 8,
  },
  featuresSection: {
    marginTop: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureEmoji: {
    fontSize: 18,
    marginRight: 12,
  },
  featureText: {
    color: '#6b7280',
    fontSize: 14,
  },
  verifyContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  verifyHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  verifyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  verifySubtitle: {
    textAlign: 'center',
    color: '#6b7280',
  },
  verifyCard: {
    marginBottom: 24,
  },
  otpInput: {
    marginBottom: 16,
    fontSize: 18,
  },
  verifyButton: {
    marginBottom: 16,
  },
  resendButton: {
    alignSelf: 'center',
  },
  snackbar: {
    backgroundColor: '#ef4444',
  },
});
