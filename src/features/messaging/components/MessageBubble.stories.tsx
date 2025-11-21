import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { MessageBubble } from './MessageBubble';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { colors } from '@/theme';

const meta: Meta<typeof MessageBubble> = {
  title: 'Features/Messaging/MessageBubble',
  component: MessageBubble,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Story />
        </View>
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof MessageBubble>;

export const OwnMessage: Story = {
  args: {
    content: 'Super ! Tu penses pouvoir livrer en combien de temps ?',
    time: '14:32',
    isOwn: true,
  },
};

export const OtherMessage: Story = {
  args: {
    content: "Salut ! J'ai bien reçu tes fichiers audio.",
    time: '14:30',
    isOwn: false,
  },
};

export const LongMessage: Story = {
  args: {
    content:
      'Je vais commencer le mixage demain. Tu auras le résultat dans 3 jours maximum. Je vais faire attention à tous les détails pour que ça soit parfait.',
    time: '14:35',
    isOwn: false,
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 20,
    width: '100%',
  },
});
