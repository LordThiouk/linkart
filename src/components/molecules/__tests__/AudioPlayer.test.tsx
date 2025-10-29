import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { AudioPlayer } from '../AudioPlayer';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../../../theme';

// Mock expo-av
jest.mock('expo-av', () => ({
  Audio: {
    Sound: {
      createAsync: jest.fn(() =>
        Promise.resolve({
          sound: {
            playAsync: jest.fn(),
            pauseAsync: jest.fn(),
            stopAsync: jest.fn(),
            unloadAsync: jest.fn(),
            getStatusAsync: jest.fn(() => Promise.resolve({ isLoaded: true, positionMillis: 0 })),
          },
        })
      ),
    },
  },
}));

// Mock lucide-react-native icons
jest.mock('lucide-react-native', () => ({
  SkipForward: 'SkipForwardIcon',
}));

// Mock child components
jest.mock('../../atoms/HeartIcon', () => ({
  HeartIcon: jest.fn(({ productId, testID }) => (
    <div data-testid={testID} data-product-id={productId}>
      HeartIcon
    </div>
  )),
}));

jest.mock('../../atoms/PlayButton', () => ({
  PlayButton: jest.fn(({ isPlaying, onPress, disabled, testID }) => (
    <div data-testid={testID} data-is-playing={isPlaying} data-disabled={disabled} onClick={onPress}>
      PlayButton
    </div>
  )),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<PaperProvider theme={theme}>{component}</PaperProvider>);
};

describe('AudioPlayer', () => {
  const mockAudioPlayer = {
    title: 'Trap Beat 2025',
    artist: 'BeatMaster',
    artworkUrl: 'https://example.com/artwork.jpg',
    uri: 'https://example.com/audio.mp3',
    duration: 30,
    productId: 'product-123',
  };

  const mockOnPlay = jest.fn();
  const mockOnPause = jest.fn();
  const mockOnEnd = jest.fn();
  const mockOnNext = jest.fn();
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPlay.mockClear();
    mockOnPause.mockClear();
    mockOnEnd.mockClear();
    mockOnNext.mockClear();
    mockOnPress.mockClear();
  });

  it('renders correctly with all elements', () => {
    renderWithTheme(
      <AudioPlayer
        {...mockAudioPlayer}
        onPlay={mockOnPlay}
        onPause={mockOnPause}
        onEnd={mockOnEnd}
        onNext={mockOnNext}
        onPress={mockOnPress}
        testID="audio-player"
      />
    );

    expect(screen.getByTestId('audio-player')).toBeOnTheScreen();
    expect(screen.getByText('Trap Beat 2025')).toBeOnTheScreen();
    expect(screen.getByText('BeatMaster')).toBeOnTheScreen();
    expect(screen.getByTestId('audio-player-heart-icon')).toBeOnTheScreen();
    expect(screen.getByTestId('audio-player-play-button')).toBeOnTheScreen();
    expect(screen.getByTestId('audio-player-next-button')).toBeOnTheScreen();
  });

  it('renders without next button when onNext is not provided', () => {
    renderWithTheme(
      <AudioPlayer
        {...mockAudioPlayer}
        onPlay={mockOnPlay}
        onPause={mockOnPause}
        onEnd={mockOnEnd}
        onPress={mockOnPress}
        testID="audio-player"
      />
    );

    expect(screen.queryByTestId('audio-player-next-button')).toBeNull();
  });

  it('calls onPress when the player is pressed', () => {
    renderWithTheme(
      <AudioPlayer
        {...mockAudioPlayer}
        onPlay={mockOnPlay}
        onPause={mockOnPause}
        onEnd={mockOnEnd}
        onNext={mockOnNext}
        onPress={mockOnPress}
        testID="audio-player"
      />
    );

    fireEvent.press(screen.getByTestId('audio-player'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('calls onNext when next button is pressed', () => {
    renderWithTheme(
      <AudioPlayer
        {...mockAudioPlayer}
        onPlay={mockOnPlay}
        onPause={mockOnPause}
        onEnd={mockOnEnd}
        onNext={mockOnNext}
        onPress={mockOnPress}
        testID="audio-player"
      />
    );

    fireEvent.press(screen.getByTestId('audio-player-next-button'));
    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  it('passes correct props to HeartIcon', () => {
    renderWithTheme(
      <AudioPlayer
        {...mockAudioPlayer}
        onPlay={mockOnPlay}
        onPause={mockOnPause}
        onEnd={mockOnEnd}
        onNext={mockOnNext}
        onPress={mockOnPress}
        testID="audio-player"
      />
    );

    const heartComponent = screen.getByTestId('audio-player-heart-icon');
    expect(heartComponent).toHaveProp('productId', 'product-123');
    expect(heartComponent).toHaveProp('size', 'sm');
  });

  it('passes correct props to PlayButton', () => {
    renderWithTheme(
      <AudioPlayer
        {...mockAudioPlayer}
        onPlay={mockOnPlay}
        onPause={mockOnPause}
        onEnd={mockOnEnd}
        onNext={mockOnNext}
        onPress={mockOnPress}
        testID="audio-player"
      />
    );

    const playComponent = screen.getByTestId('audio-player-play-button');
    expect(playComponent).toHaveProp('isPlaying', false);
    expect(playComponent).toHaveProp('size', 'sm');
    expect(playComponent).toHaveProp('disabled', false);
  });

  it('applies sticky styles when sticky prop is true', () => {
    renderWithTheme(
      <AudioPlayer
        {...mockAudioPlayer}
        sticky={true}
        onPlay={mockOnPlay}
        onPause={mockOnPause}
        onEnd={mockOnEnd}
        onNext={mockOnNext}
        onPress={mockOnPress}
        testID="audio-player"
      />
    );

    const container = screen.getByTestId('audio-player');
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }),
      ])
    );
  });

  it('applies normal styles when sticky prop is false', () => {
    renderWithTheme(
      <AudioPlayer
        {...mockAudioPlayer}
        sticky={false}
        onPlay={mockOnPlay}
        onPause={mockOnPause}
        onEnd={mockOnEnd}
        onNext={mockOnNext}
        onPress={mockOnPress}
        testID="audio-player"
      />
    );

    const container = screen.getByTestId('audio-player');
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          position: 'relative',
        }),
      ])
    );
  });

  it('renders artwork image with correct props', () => {
    renderWithTheme(
      <AudioPlayer
        {...mockAudioPlayer}
        onPlay={mockOnPlay}
        onPause={mockOnPause}
        onEnd={mockOnEnd}
        onNext={mockOnNext}
        onPress={mockOnPress}
        testID="audio-player"
      />
    );

    const image = screen.getByTestId('audio-player').findByType('Image' as any);
    expect(image.props.source?.uri).toBe('https://example.com/artwork.jpg');
  });

  it('handles long titles and artists with numberOfLines', () => {
    renderWithTheme(
      <AudioPlayer
        {...mockAudioPlayer}
        title="This is a very long beat title that should be truncated properly"
        artist="This is a very long artist name that should also be truncated"
        onPlay={mockOnPlay}
        onPause={mockOnPause}
        onEnd={mockOnEnd}
        onNext={mockOnNext}
        onPress={mockOnPress}
        testID="audio-player"
      />
    );

    expect(screen.getByText('This is a very long beat title that should be truncated properly')).toBeOnTheScreen();
    expect(screen.getByText('This is a very long artist name that should also be truncated')).toBeOnTheScreen();
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    renderWithTheme(
      <AudioPlayer
        {...mockAudioPlayer}
        style={customStyle}
        onPlay={mockOnPlay}
        onPause={mockOnPause}
        onEnd={mockOnEnd}
        onNext={mockOnNext}
        onPress={mockOnPress}
        testID="audio-player"
      />
    );

    const container = screen.getByTestId('audio-player');
    expect(container.props.style).toEqual(expect.arrayContaining([customStyle]));
  });
});
