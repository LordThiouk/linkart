/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { WalletScreenFigma } from './WalletScreenFigma';

const meta: Meta<typeof WalletScreenFigma> = {
  title: 'Screens/WalletScreenFigma',
  component: WalletScreenFigma,
  decorators: [Story => <Story />],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof WalletScreenFigma>;

export const Default: Story = {
  args: {},
};

export const WithBalance: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Wallet avec solde visible, statistiques et transactions récentes.',
      },
    },
  },
};

export const BalanceHidden: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Wallet avec solde masqué (eye icon).',
      },
    },
  },
};
