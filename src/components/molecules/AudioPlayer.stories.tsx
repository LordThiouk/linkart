import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { AudioPlayer } from './AudioPlayer';
import { View, Text } from 'react-native';
import { colors } from '../../theme';

const meta: Meta<typeof AudioPlayer> = {
  title: 'Molecules/AudioPlayer',
  component: AudioPlayer,
  decorators: [
    Story => (
      <View style={{ padding: 20, backgroundColor: colors.background }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    artist: { control: 'text' },
    artworkUrl: { control: 'text' },
    uri: { control: 'text' },
    duration: { control: 'number' },
    productId: { control: 'text' },
    sticky: { control: 'boolean' },
    onPlay: { action: 'played' },
    onPause: { action: 'paused' },
    onEnd: { action: 'ended' },
    onNext: { action: 'next' },
    onPress: { action: 'pressed' },
  },
  args: {
    title: 'Trap Beat 2025',
    artist: 'BeatMaster',
    artworkUrl: 'https://i.pravatar.cc/150?img=68',
    uri: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 30,
    productId: 'product-123',
    sticky: false,
  },
};

export default meta;

type Story = StoryObj<typeof AudioPlayer>;

type InteractiveWrapperProps = React.ComponentProps<typeof AudioPlayer>;

const InteractiveWrapper: React.FC<InteractiveWrapperProps> = props => {
  return <AudioPlayer {...props} />;
};

export const Default: Story = {
  render: args => <InteractiveWrapper {...args} />,
};

export const Favorited: Story = {
  render: args => <InteractiveWrapper {...args} />,
};

export const Sticky: Story = {
  render: args => <InteractiveWrapper {...args} />,
  args: {
    sticky: true,
  },
};

export const WithNextButton: Story = {
  render: args => <InteractiveWrapper {...args} />,
  args: {
    onNext: () => console.log('Next pressed'),
  },
};

export const LongTitle: Story = {
  render: args => <InteractiveWrapper {...args} />,
  args: {
    title: 'This is a very long beat title that should be truncated properly',
    artist: 'Very Long Artist Name That Should Also Be Truncated',
  },
};

export const DifferentGenres: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <AudioPlayer
        title="Afrobeat Vibes"
        artist="African Producer"
        artworkUrl="https://i.pravatar.cc/150?img=1"
        uri="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        duration={30}
        productId="afrobeat-1"
        onPlay={() => {}}
        onPause={() => {}}
        onEnd={() => {}}
        onNext={() => {}}
        onPress={() => {}}
      />
      <AudioPlayer
        title="Hip-Hop Classic"
        artist="Hip-Hop Legend"
        artworkUrl="https://i.pravatar.cc/150?img=2"
        uri="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        duration={30}
        productId="hiphop-1"
        onPlay={() => {}}
        onPause={() => {}}
        onEnd={() => {}}
        onNext={() => {}}
        onPress={() => {}}
      />
      <AudioPlayer
        title="Electronic Dreams"
        artist="EDM Producer"
        artworkUrl="https://i.pravatar.cc/150?img=3"
        uri="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        duration={30}
        productId="electronic-1"
        onPlay={() => {}}
        onPause={() => {}}
        onEnd={() => {}}
        onNext={() => {}}
        onPress={() => {}}
      />
    </View>
  ),
};

export const StickyPlayer: Story = {
  render: () => {
    return (
      <View style={{ height: 400, position: 'relative' }}>
        <View style={{ padding: 20, backgroundColor: colors.surfaceElevated }}>
          <Text style={{ color: colors.textSecondary }}>
            Scroll content here... The player should stick to the bottom.
          </Text>
        </View>
        <AudioPlayer
          title="Sticky Player"
          artist="Sticky Artist"
          artworkUrl="https://i.pravatar.cc/150?img=4"
          uri="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
          duration={30}
          productId="sticky-1"
          sticky={true}
          onPlay={() => console.log('Play')}
          onPause={() => console.log('Pause')}
          onEnd={() => console.log('End')}
          onNext={() => console.log('Next')}
          onPress={() => console.log('Player pressed')}
        />
      </View>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <AudioPlayer
        title="New Beat"
        artist="New Artist"
        artworkUrl="https://i.pravatar.cc/150?img=5"
        uri="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        duration={30}
        productId="new-1"
        onPlay={() => {}}
        onPause={() => {}}
        onEnd={() => {}}
        onNext={() => {}}
        onPress={() => {}}
      />
      <AudioPlayer
        title="Popular Beat"
        artist="Popular Artist"
        artworkUrl="https://i.pravatar.cc/150?img=6"
        uri="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        duration={30}
        productId="popular-1"
        sticky={true}
        onPlay={() => {}}
        onPause={() => {}}
        onEnd={() => {}}
        onNext={() => {}}
        onPress={() => {}}
      />
    </View>
  ),
};
