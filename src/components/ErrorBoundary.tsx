import React from 'react';
import { Text } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Sentry from '@sentry/react-native';
import { Container, CenteredContent } from './atoms';

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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
          <Container flex={1}>
            <CenteredContent>
              <Card style={{ maxWidth: 400, width: '100%' }}>
                <Card.Content style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 48, marginBottom: 16 }}>😵</Text>
                  <Title style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>
                    Oups! Quelque chose s'est mal passé
                  </Title>
                  <Paragraph style={{ textAlign: 'center', marginBottom: 24, color: '#6b7280' }}>
                    Une erreur inattendue s'est produite. Veuillez réessayer ou redémarrer l'application.
                  </Paragraph>
                  <Button mode="contained" onPress={this.handleReset} style={{ marginTop: 8 }}>
                    Réessayer
                  </Button>
                </Card.Content>
              </Card>
            </CenteredContent>
          </Container>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}
