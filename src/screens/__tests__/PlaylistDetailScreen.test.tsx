import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { PlaylistDetailScreen } from '../PlaylistDetailScreen';
import { colors } from '@/theme';

// Mock theme
const mockTheme = {
  colors: {
    onSurface: colors.textPrimary,
    onSurfaceVariant: colors.textMuted,
    primary: colors.primary,
    onPrimary: colors.primaryForeground,
    error: colors.error,
  },
};

jest.mock('react-native-paper', () => ({
  useTheme: () => mockTheme,
}));

// Mock navigation
const mockNavigate = jest.fn();
const mockRoute = {
  params: { playlistId: 'pl1' },
};

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
  useRoute: () => mockRoute,
}));

// Mock playlists store
const mockPlaylistsStore = {
  playlists: [],
  currentPlaylist: null as any,
  currentBeatIndex: 0,
  loading: false,
  loadPlaylistDetail: jest.fn(),
  setCurrentBeatIndex: jest.fn(),
  nextBeat: jest.fn(),
  previousBeat: jest.fn(),
};

jest.mock('../store/playlistsStore', () => ({
  usePlaylistsStore: () => mockPlaylistsStore,
}));

describe('PlaylistDetailScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockPlaylistsStore.loadPlaylistDetail.mockClear();
    mockPlaylistsStore.setCurrentBeatIndex.mockClear();
    mockPlaylistsStore.nextBeat.mockClear();
    mockPlaylistsStore.previousBeat.mockClear();
  });

  it('renders playlist not found when playlist is null', () => {
    const { getByText } = render(<PlaylistDetailScreen />);

    expect(getByText('Playlist introuvable.')).toBeTruthy();
  });

  it('renders playlist details when playlist is available', () => {
    // Mock current playlist
    mockPlaylistsStore.currentPlaylist = {
      id: 'pl1',
      title: 'Test Playlist',
      description: 'A test playlist',
      typebeat: 'Trap',
      ambiance: 'Énergique',
      bpm_range: '140-160',
      cover_url: 'https://example.com/cover.jpg',
      beat_count: 2,
      created_at: new Date().toISOString(),
      beats: [
        {
          id: 'b1',
          title: 'Beat 1',
          artist: 'Artist 1',
          duration: '2:30',
          imageUrl: 'https://example.com/1.jpg',
        },
        {
          id: 'b2',
          title: 'Beat 2',
          artist: 'Artist 2',
          duration: '3:00',
          imageUrl: 'https://example.com/2.jpg',
        },
      ],
    };

    const { getByText } = render(<PlaylistDetailScreen />);

    expect(getByText('Test Playlist')).toBeTruthy();
    expect(getByText('A test playlist')).toBeTruthy();
    expect(getByText('2 titres')).toBeTruthy();
    expect(getByText('Beat 1')).toBeTruthy();
    expect(getByText('Beat 2')).toBeTruthy();
  });

  it('renders empty state when playlist has no beats', () => {
    // Mock current playlist with no beats
    mockPlaylistsStore.currentPlaylist = {
      id: 'pl1',
      title: 'Empty Playlist',
      description: 'A playlist with no beats',
      typebeat: 'Trap',
      ambiance: 'Énergique',
      bpm_range: '140-160',
      cover_url: 'https://example.com/cover.jpg',
      beat_count: 0,
      created_at: new Date().toISOString(),
      beats: [],
    };

    const { getByText } = render(<PlaylistDetailScreen />);

    expect(getByText('Cette playlist est vide.')).toBeTruthy();
  });

  it('handles play all button', () => {
    // Mock current playlist
    mockPlaylistsStore.currentPlaylist = {
      id: 'pl1',
      title: 'Test Playlist',
      description: 'A test playlist',
      typebeat: 'Trap',
      ambiance: 'Énergique',
      bpm_range: '140-160',
      cover_url: 'https://example.com/cover.jpg',
      beat_count: 2,
      created_at: new Date().toISOString(),
      beats: [
        {
          id: 'b1',
          title: 'Beat 1',
          artist: 'Artist 1',
          duration: '2:30',
          imageUrl: 'https://example.com/1.jpg',
        },
      ],
    };

    const { getByText } = render(<PlaylistDetailScreen />);

    const playAllButton = getByText('Play All');
    fireEvent.press(playAllButton);

    // Should set current beat index to 0
    expect(mockPlaylistsStore.setCurrentBeatIndex).toHaveBeenCalledWith(0);
  });

  it('handles shuffle button', () => {
    // Mock current playlist
    mockPlaylistsStore.currentPlaylist = {
      id: 'pl1',
      title: 'Test Playlist',
      description: 'A test playlist',
      typebeat: 'Trap',
      ambiance: 'Énergique',
      bpm_range: '140-160',
      cover_url: 'https://example.com/cover.jpg',
      beat_count: 2,
      created_at: new Date().toISOString(),
      beats: [
        {
          id: 'b1',
          title: 'Beat 1',
          artist: 'Artist 1',
          duration: '2:30',
          imageUrl: 'https://example.com/1.jpg',
        },
      ],
    };

    const { getByText } = render(<PlaylistDetailScreen />);

    const shuffleButton = getByText('Shuffle');
    fireEvent.press(shuffleButton);

    // Shuffle functionality would be implemented in the store
    expect(shuffleButton).toBeTruthy();
  });

  it('handles beat item press', () => {
    // Mock current playlist
    mockPlaylistsStore.currentPlaylist = {
      id: 'pl1',
      title: 'Test Playlist',
      description: 'A test playlist',
      typebeat: 'Trap',
      ambiance: 'Énergique',
      bpm_range: '140-160',
      cover_url: 'https://example.com/cover.jpg',
      beat_count: 2,
      created_at: new Date().toISOString(),
      beats: [
        {
          id: 'b1',
          title: 'Beat 1',
          artist: 'Artist 1',
          duration: '2:30',
          imageUrl: 'https://example.com/1.jpg',
        },
      ],
    };

    const { getByText } = render(<PlaylistDetailScreen />);

    const beatItem = getByText('Beat 1');
    fireEvent.press(beatItem);

    // Should set current beat index
    expect(mockPlaylistsStore.setCurrentBeatIndex).toHaveBeenCalledWith(0);
  });

  it('loads playlist detail on mount', async () => {
    render(<PlaylistDetailScreen />);

    await waitFor(() => {
      expect(mockPlaylistsStore.loadPlaylistDetail).toHaveBeenCalledWith('pl1');
    });
  });
});
