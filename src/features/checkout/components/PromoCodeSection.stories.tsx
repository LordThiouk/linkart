import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PromoCodeSection } from './PromoCodeSection';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';

const meta: Meta<typeof PromoCodeSection> = {
  title: 'Features/Checkout/PromoCodeSection',
  component: PromoCodeSection,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  argTypes: {
    onPromoCodeChange: { action: 'onPromoCodeChange' },
    onApplyPromo: { action: 'onApplyPromo' },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof PromoCodeSection>;

export const Default: Story = {
  render: args => {
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);
    return (
      <PromoCodeSection
        {...args}
        promoCode={promoCode}
        onPromoCodeChange={text => {
          setPromoCode(text);
          args.onPromoCodeChange?.(text);
        }}
        promoApplied={promoApplied}
        onApplyPromo={() => {
          if (promoCode.toUpperCase() === 'LINKART10') {
            setPromoApplied(true);
          }
          args.onApplyPromo?.();
        }}
      />
    );
  },
  args: {
    promoCode: '',
    onPromoCodeChange: () => {},
    promoApplied: false,
    onApplyPromo: () => {},
  },
};

export const PromoApplied: Story = {
  args: {
    promoCode: 'LINKART10',
    onPromoCodeChange: () => {},
    promoApplied: true,
    onApplyPromo: () => {},
  },
};
