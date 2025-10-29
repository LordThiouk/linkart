import { create } from 'zustand';

interface Playlist {
  id: string;
  title: string;
  description: string;
  typebeat?: string;
  ambiance?: string;
  bpm_range?: string;
  cover_url?: string;
  beat_count: number;
  created_at: string;
}

interface Product {
  id: string;
  title: string;
  artist: string;
  duration: string;
  preview_url?: string;
  price: number;
  imageUrl: string;
}

interface PlaylistDetail extends Playlist {
  beats: Product[];
}

interface PlaylistsStore {
  playlists: Playlist[];
  currentPlaylist: PlaylistDetail | null;
  currentBeatIndex: number;
  loading: boolean;

  loadPlaylists: () => Promise<void>;
  loadPlaylistDetail: (id: string) => Promise<void>;
  setCurrentBeatIndex: (index: number) => void;
  nextBeat: () => void;
  previousBeat: () => void;
}

// Mock data pour développement et tests
const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'pl1',
    title: 'Trap Hits 2025',
    description: 'Les meilleurs trap beats du moment',
    typebeat: 'Trap',
    ambiance: 'Énergique',
    bpm_range: '140-160',
    cover_url: 'https://picsum.photos/400/400?random=1',
    beat_count: 15,
    created_at: new Date().toISOString(),
  },
  {
    id: 'pl2',
    title: 'Afrobeat Vibes',
    description: 'Sons africains authentiques',
    typebeat: 'Afrobeat',
    ambiance: 'Chaleureux',
    bpm_range: '120-140',
    cover_url: 'https://picsum.photos/400/400?random=2',
    beat_count: 12,
    created_at: new Date().toISOString(),
  },
  {
    id: 'pl3',
    title: 'Hip Hop Underground',
    description: 'Le meilleur du hip hop indépendant',
    typebeat: 'Hip Hop',
    ambiance: 'Sombre',
    bpm_range: '80-100',
    cover_url: 'https://picsum.photos/400/400?random=3',
    beat_count: 18,
    created_at: new Date().toISOString(),
  },
  {
    id: 'pl4',
    title: 'R&B Smooth',
    description: 'Ambiance relaxante et romantique',
    typebeat: 'R&B',
    ambiance: 'Romantique',
    bpm_range: '70-90',
    cover_url: 'https://picsum.photos/400/400?random=4',
    beat_count: 10,
    created_at: new Date().toISOString(),
  },
];

const MOCK_PLAYLIST_BEATS: Record<string, Product[]> = {
  pl1: [
    {
      id: 'b1',
      title: 'Dark Trap Beat',
      artist: 'ProducerX',
      duration: '2:30',
      preview_url: 'https://example.com/preview1.mp3',
      price: 25000,
      imageUrl: 'https://picsum.photos/200/200?random=10',
    },
    {
      id: 'b2',
      title: 'Aggressive Trap',
      artist: 'BeatMakerSenegal',
      duration: '2:45',
      preview_url: 'https://example.com/preview2.mp3',
      price: 30000,
      imageUrl: 'https://picsum.photos/200/200?random=11',
    },
    {
      id: 'b3',
      title: 'Melodic Trap',
      artist: 'DakarProducer',
      duration: '3:00',
      preview_url: 'https://example.com/preview3.mp3',
      price: 20000,
      imageUrl: 'https://picsum.photos/200/200?random=12',
    },
  ],
  pl2: [
    {
      id: 'b4',
      title: 'Afrobeat Classic',
      artist: 'MusicCreator',
      duration: '4:15',
      preview_url: 'https://example.com/preview4.mp3',
      price: 35000,
      imageUrl: 'https://picsum.photos/200/200?random=13',
    },
    {
      id: 'b5',
      title: 'Modern Afrobeat',
      artist: 'SoundDesigner',
      duration: '3:30',
      preview_url: 'https://example.com/preview5.mp3',
      price: 40000,
      imageUrl: 'https://picsum.photos/200/200?random=14',
    },
  ],
  pl3: [
    {
      id: 'b6',
      title: 'Underground Flow',
      artist: 'HipHopMaster',
      duration: '3:45',
      preview_url: 'https://example.com/preview6.mp3',
      price: 28000,
      imageUrl: 'https://picsum.photos/200/200?random=15',
    },
  ],
  pl4: [
    {
      id: 'b7',
      title: 'Smooth R&B',
      artist: 'RnBKing',
      duration: '3:20',
      preview_url: 'https://example.com/preview7.mp3',
      price: 32000,
      imageUrl: 'https://picsum.photos/200/200?random=16',
    },
  ],
};

export const usePlaylistsStore = create<PlaylistsStore>((set, get) => ({
  playlists: [],
  currentPlaylist: null,
  currentBeatIndex: 0,
  loading: false,

  loadPlaylists: async () => {
    set({ loading: true });
    // TODO: Remplacer par vraie API call
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ playlists: MOCK_PLAYLISTS, loading: false });
  },

  loadPlaylistDetail: async (id: string) => {
    set({ loading: true });
    // TODO: Remplacer par vraie API call
    await new Promise(resolve => setTimeout(resolve, 300));

    const playlist = MOCK_PLAYLISTS.find(p => p.id === id);
    const beats = MOCK_PLAYLIST_BEATS[id] || [];

    if (playlist) {
      set({
        currentPlaylist: { ...playlist, beats },
        currentBeatIndex: 0,
        loading: false,
      });
    } else {
      set({ loading: false });
    }
  },

  setCurrentBeatIndex: (index: number) => {
    const { currentPlaylist } = get();
    if (currentPlaylist && index >= 0 && index < currentPlaylist.beats.length) {
      set({ currentBeatIndex: index });
    }
  },

  nextBeat: () => {
    const { currentPlaylist, currentBeatIndex } = get();
    if (currentPlaylist && currentBeatIndex < currentPlaylist.beats.length - 1) {
      set({ currentBeatIndex: currentBeatIndex + 1 });
    }
  },

  previousBeat: () => {
    const { currentBeatIndex } = get();
    if (currentBeatIndex > 0) {
      set({ currentBeatIndex: currentBeatIndex - 1 });
    }
  },
}));

// Export mock data pour utilisation dans tests et stories
export { MOCK_PLAYLISTS, MOCK_PLAYLIST_BEATS };
