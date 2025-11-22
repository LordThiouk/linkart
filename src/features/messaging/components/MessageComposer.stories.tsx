import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { MessageComposer } from './MessageComposer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';

const meta: Meta<typeof MessageComposer> = {
  title: 'Features/Messaging/MessageComposer',
  component: MessageComposer,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  argTypes: {
    onSend: { action: 'onSend' },
    onChangeText: { action: 'onChangeText' },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof MessageComposer>;

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState('');
    return (
      <MessageComposer
        {...args}
        value={value}
        onChangeText={text => {
          setValue(text);
          args.onChangeText?.(text);
        }}
        onSend={() => {
          args.onSend?.();
          setValue('');
        }}
      />
    );
  },
  args: {
    placeholder: 'Écrivez votre message...',
    maxLength: 500,
    sending: false,
    disabled: false,
  },
};

export const Sending: Story = {
  render: args => {
    const [value, setValue] = useState("Message en cours d'envoi...");
    return <MessageComposer {...args} value={value} onChangeText={setValue} onSend={args.onSend} />;
  },
  args: {
    sending: true,
  },
};

export const Disabled: Story = {
  args: {
    value: '',
    onChangeText: () => {},
    onSend: () => {},
    disabled: true,
  },
};
