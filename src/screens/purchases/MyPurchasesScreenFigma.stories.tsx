import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { MyPurchasesScreenFigma } from './MyPurchasesScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof MyPurchasesScreenFigma> = {
  title: 'Screens/Purchases/MyPurchasesScreenFigma',
  component: MyPurchasesScreenFigma,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof MyPurchasesScreenFigma>;

export const Default: Story = {
  args: {
    onBack: () => console.log('Back pressed'),
    onDownload: (purchaseId: string) => console.log('Download:', purchaseId),
    onViewContract: (purchaseId: string) => console.log('View contract:', purchaseId),
  },
};
