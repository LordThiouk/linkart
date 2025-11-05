import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { OnboardingSlideFigma } from './OnboardingSlideFigma';
import { PaperProvider } from 'react-native-paper';
import { Music2, DollarSign, Users } from 'lucide-react-native';
import { theme } from '../../theme';

const meta: Meta<typeof OnboardingSlideFigma> = {
  title: 'Molecules/OnboardingSlideFigma',
  component: OnboardingSlideFigma,
  decorators: [
    Story => (
      <PaperProvider theme={theme}>
        <Story />
      </PaperProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof OnboardingSlideFigma>;

export const DiscoverMusic: Story = {
  args: {
    title: 'Découvrez la musique',
    description:
      'Explorez des milliers de beats, instrumentaux et sons uniques créés par des artistes talentueux du monde entier.',
    gradient: ['#6366F1', '#8B5CF6'],
    icon: Music2,
  },
};

export const SellBeats: Story = {
  args: {
    title: 'Vendez vos beats',
    description:
      "Monétisez votre créativité. Publiez vos productions et gagnez de l'argent en vendant vos beats à d'autres artistes.",
    gradient: ['#F59E0B', '#EC4899'],
    icon: DollarSign,
  },
};

export const ConnectWithArtists: Story = {
  args: {
    title: 'Connectez avec des artistes',
    description: 'Rejoignez une communauté créative. Collaborez, partagez et créez des connexions authentiques.',
    gradient: ['#8B5CF6', '#EC4899', '#06B6D4'],
    icon: Users,
  },
};
