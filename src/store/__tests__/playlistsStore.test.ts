import { act, renderHook } from '@testing-library/react-native';
import { usePlaylistsStore } from '../playlistsStore';

describe('playlistsStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    act(() => {
      usePlaylistsStore.setState({
        playlists: [],
        currentPlaylist: null,
        currentBeatIndex: 0,
        loading: false,
      });
    });
  });

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => usePlaylistsStore());

    expect(result.current.playlists).toEqual([]);
    expect(result.current.currentPlaylist).toBeNull();
    expect(result.current.currentBeatIndex).toBe(0);
    expect(result.current.loading).toBe(false);
  });

  it('should load playlists', async () => {
    const { result } = renderHook(() => usePlaylistsStore());

    await act(async () => {
      await result.current.loadPlaylists();
    });

    expect(result.current.playlists.length).toBeGreaterThan(0);
    expect(result.current.loading).toBe(false);
  });

  it('should load playlist detail', async () => {
    const { result } = renderHook(() => usePlaylistsStore());
    const playlistId = 'pl1';

    await act(async () => {
      await result.current.loadPlaylistDetail(playlistId);
    });

    expect(result.current.currentPlaylist).toBeTruthy();
    expect(result.current.currentPlaylist?.id).toBe(playlistId);
    expect(result.current.loading).toBe(false);
  });

  it('should set current beat index', () => {
    const { result } = renderHook(() => usePlaylistsStore());
    const newIndex = 2;

    act(() => {
      result.current.setCurrentBeatIndex(newIndex);
    });

    expect(result.current.currentBeatIndex).toBe(newIndex);
  });

  it('should navigate to next beat', () => {
    const { result } = renderHook(() => usePlaylistsStore());

    // Mock current playlist with beats
    act(() => {
      usePlaylistsStore.setState({
        currentPlaylist: {
          id: 'pl1',
          title: 'Test Playlist',
          description: 'Test',
          typebeat: 'Trap',
          ambiance: 'Énergique',
          bpm_range: '140-160',
          cover_url: 'https://example.com/cover.jpg',
          beat_count: 3,
          created_at: new Date().toISOString(),
          beats: [
            {
              id: 'b1',
              title: 'Beat 1',
              artist: 'Artist 1',
              duration: '2:30',
              imageUrl: 'https://example.com/1.jpg',
              price: 25000,
            },
            {
              id: 'b2',
              title: 'Beat 2',
              artist: 'Artist 2',
              duration: '3:00',
              imageUrl: 'https://example.com/2.jpg',
              price: 30000,
            },
            {
              id: 'b3',
              title: 'Beat 3',
              artist: 'Artist 3',
              duration: '2:45',
              imageUrl: 'https://example.com/3.jpg',
              price: 20000,
            },
          ],
        },
        currentBeatIndex: 0,
      });
    });

    act(() => {
      result.current.nextBeat();
    });

    expect(result.current.currentBeatIndex).toBe(1);
  });

  it('should navigate to previous beat', () => {
    const { result } = renderHook(() => usePlaylistsStore());

    // Mock current playlist with beats
    act(() => {
      usePlaylistsStore.setState({
        currentPlaylist: {
          id: 'pl1',
          title: 'Test Playlist',
          description: 'Test',
          typebeat: 'Trap',
          ambiance: 'Énergique',
          bpm_range: '140-160',
          cover_url: 'https://example.com/cover.jpg',
          beat_count: 3,
          created_at: new Date().toISOString(),
          beats: [
            {
              id: 'b1',
              title: 'Beat 1',
              artist: 'Artist 1',
              duration: '2:30',
              imageUrl: 'https://example.com/1.jpg',
              price: 25000,
            },
            {
              id: 'b2',
              title: 'Beat 2',
              artist: 'Artist 2',
              duration: '3:00',
              imageUrl: 'https://example.com/2.jpg',
              price: 30000,
            },
            {
              id: 'b3',
              title: 'Beat 3',
              artist: 'Artist 3',
              duration: '2:45',
              imageUrl: 'https://example.com/3.jpg',
              price: 20000,
            },
          ],
        },
        currentBeatIndex: 1,
      });
    });

    act(() => {
      result.current.previousBeat();
    });

    expect(result.current.currentBeatIndex).toBe(0);
  });

  it('should not go beyond playlist bounds', () => {
    const { result } = renderHook(() => usePlaylistsStore());

    // Mock current playlist with beats
    act(() => {
      usePlaylistsStore.setState({
        currentPlaylist: {
          id: 'pl1',
          title: 'Test Playlist',
          description: 'Test',
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
              price: 0,
            },
            {
              id: 'b2',
              title: 'Beat 2',
              artist: 'Artist 2',
              duration: '3:00',
              imageUrl: 'https://example.com/2.jpg',
              price: 0,
            },
          ],
        },
        currentBeatIndex: 1, // Last beat
      });
    });

    act(() => {
      result.current.nextBeat();
    });

    expect(result.current.currentBeatIndex).toBe(1); // Should stay at last beat
  });
});
