import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Sentry from '@sentry/react-native';
import { Container, CenteredContent } from './atoms';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from './atoms/Card';
import Button from './atoms/Button';
import { colors, typography, spacing } from '../theme';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
          <Container flex={1}>
            <CenteredContent>
              <Card variant="elevated" style={styles.card}>
                <CardHeader>
                  <Text style={styles.emoji}>😵</Text>
                </CardHeader>
                <CardContent style={styles.cardContent}>
                  <CardTitle style={styles.title}>Oups! Quelque chose s'est mal passé</CardTitle>
                  <CardDescription style={styles.description}>
                    Une erreur inattendue s'est produite. Veuillez réessayer ou redémarrer l'application.
                  </CardDescription>
                  <Button title="Réessayer" variant="primary" size="default" onPress={this.handleReset} />
                </CardContent>
              </Card>
            </CenteredContent>
          </Container>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  card: {
    maxWidth: 400,
    width: '100%',
  },
  cardContent: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 48,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  title: {
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.bold,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.sm,
    color: colors.textPrimary,
  },
  description: {
    textAlign: 'center',
    marginBottom: spacing.xl,
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
