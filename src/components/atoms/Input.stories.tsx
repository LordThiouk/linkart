import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Input } from './Input';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../../theme';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  decorators: [
    Story => (
      <PaperProvider theme={theme}>
        <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: theme.colors.background }}>
          <Story />
        </View>
      </PaperProvider>
    ),
  ],
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    secureTextEntry: { control: 'boolean' },
    multiline: { control: 'boolean' },
    onChangeText: { action: 'text changed' },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Outlined: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    value: '',
    onChangeText: text => console.log(text),
  },
  render: args => {
    const [value, setValue] = useState(args.value);
    return <Input {...args} value={value} onChangeText={setValue} />;
  },
};

export const Filled: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    value: '',
    onChangeText: text => console.log(text),
    secureTextEntry: true,
  },
  render: args => {
    const [value, setValue] = useState(args.value);
    return <Input {...args} value={value} onChangeText={setValue} />;
  },
};

export const Underlined: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    value: '',
    onChangeText: text => console.log(text),
  },
  render: args => {
    const [value, setValue] = useState(args.value);
    return <Input {...args} value={value} onChangeText={setValue} />;
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search anything...',
    value: '',
    onChangeText: text => console.log(text),
  },
  render: args => {
    const [value, setValue] = useState(args.value);
    return <Input {...args} value={value} onChangeText={setValue} />;
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter text',
    value: 'hidden text',
    onChangeText: text => console.log(text),
    onRightIconPress: () => console.log('Right icon pressed'),
  },
  render: args => {
    const [value, setValue] = useState(args.value);
    return <Input {...args} value={value} onChangeText={setValue} />;
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    value: 'invalid@email',
    onChangeText: text => console.log(text),
    error: true,
  },
  render: args => {
    const [value, setValue] = useState(args.value);
    return <Input {...args} value={value} onChangeText={setValue} />;
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Phone',
    placeholder: '+221 77 123 45 67',
    value: '',
    onChangeText: text => console.log(text),
  },
  render: args => {
    const [value, setValue] = useState(args.value);
    return <Input {...args} value={value} onChangeText={setValue} />;
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'Cannot be edited',
    value: 'Fixed value',
    onChangeText: text => console.log(text),
    disabled: true,
  },
  render: args => {
    const [value, setValue] = useState(args.value);
    return <Input {...args} value={value} onChangeText={setValue} />;
  },
};

export const Multiline: Story = {
  args: {
    label: 'Description',
    placeholder: 'Describe your product...',
    value: '',
    onChangeText: text => console.log(text),
    multiline: true,
    numberOfLines: 4,
  },
  render: args => {
    const [value, setValue] = useState(args.value);
    return <Input {...args} value={value} onChangeText={setValue} />;
  },
};
