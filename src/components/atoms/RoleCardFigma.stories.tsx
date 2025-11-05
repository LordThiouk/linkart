import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { RoleCardFigma } from './RoleCardFigma';
import { PaperProvider } from 'react-native-paper';
import { Music, Mic, User, Headphones } from 'lucide-react-native';
import { theme } from '../../theme';

const meta: Meta<typeof RoleCardFigma> = {
  title: 'Atoms/RoleCardFigma',
  component: RoleCardFigma,
  decorators: [
    Story => (
      <PaperProvider theme={theme}>
        <Story />
      </PaperProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    selected: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RoleCardFigma>;

export const Default: Story = {
  args: {
    icon: Music,
    title: 'Beatmaker',
    description: 'Créez et vendez vos beats',
    selected: false,
    onPress: () => console.log('Role card pressed'),
  },
};

export const Selected: Story = {
  args: {
    icon: Music,
    title: 'Beatmaker',
    description: 'Créez et vendez vos beats',
    selected: true,
    onPress: () => console.log('Role card pressed'),
  },
};

export const Artist: Story = {
  args: {
    icon: Mic,
    title: 'Artiste',
    description: 'Achetez des beats et créez votre musique',
    selected: false,
    onPress: () => console.log('Role card pressed'),
  },
};

export const Producer: Story = {
  args: {
    icon: Headphones,
    title: 'Producteur',
    description: 'Produisez et mixez des projets musicaux',
    selected: false,
    onPress: () => console.log('Role card pressed'),
  },
};

export const Studio: Story = {
  args: {
    icon: User,
    title: 'Studio',
    description: 'Offrez vos services de mixage et mastering',
    selected: false,
    onPress: () => console.log('Role card pressed'),
  },
};

export const AllRoles: Story = {
  render: () => (
    <>
      <RoleCardFigma
        icon={Music}
        title="Beatmaker"
        description="Créez et vendez vos beats"
        selected={true}
        onPress={() => {}}
      />
      <RoleCardFigma
        icon={Mic}
        title="Artiste"
        description="Achetez des beats et créez votre musique"
        selected={false}
        onPress={() => {}}
      />
      <RoleCardFigma
        icon={Headphones}
        title="Producteur"
        description="Produisez et mixez des projets musicaux"
        selected={false}
        onPress={() => {}}
      />
      <RoleCardFigma
        icon={User}
        title="Studio"
        description="Offrez vos services de mixage et mastering"
        selected={false}
        onPress={() => {}}
      />
    </>
  ),
};
