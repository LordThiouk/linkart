import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Searchbar, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Container, ProductCard } from '../components/atoms';

interface Product {
  id: string;
  title: string;
  type: 'beat' | 'kit' | 'sample' | 'service';
  price: number;
  artist: string;
  rating: number;
  genre: string;
  bpm?: number;
  duration?: string;
  imageUrl?: string;
  viewCount?: number;
  downloadCount?: number;
  likeCount?: number;
}

export function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();

  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        title: 'Afrobeat Instrumental',
        type: 'beat',
        price: 15000,
        artist: 'Beatmaker Pro',
        rating: 4.8,
        genre: 'Afrobeat',
        bpm: 120,
        duration: '3:00',
      },
      {
        id: '2',
        title: 'Trap Drum Kit Vol. 1',
        type: 'kit',
        price: 25000,
        artist: 'Drum God',
        rating: 4.5,
        genre: 'Trap',
      },
      {
        id: '3',
        title: 'Vocal Sample Pack',
        type: 'sample',
        price: 10000,
        artist: 'Vocal Queen',
        rating: 4.9,
        genre: 'R&B',
      },
      {
        id: '4',
        title: 'Service de Mixage Audio',
        type: 'service',
        price: 50000,
        artist: 'Studio Pro',
        rating: 5.0,
        genre: 'Audio Engineering',
      },
    ];

    setProducts(mockProducts);
    setLoading(false);
  }, []);

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      id={item.id}
      title={item.title}
      artist={item.artist}
      price={item.price}
      imageUrl={item.imageUrl || 'https://picsum.photos/300/300'}
      viewCount={item.viewCount || 0}
      downloadCount={item.downloadCount || 0}
      likeCount={item.likeCount || 0}
      onPress={id => console.log('Product pressed:', id)}
      onPlay={id => console.log('Play preview:', id)}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Container>
        {/* Search Bar */}
        <View style={{ marginBottom: 16 }}>
          <Searchbar
            placeholder="Rechercher des beats, samples, services..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ elevation: 2, backgroundColor: theme.colors.surface }}
          />
        </View>

        {/* Filters */}
        <View style={{ flexDirection: 'row', marginBottom: 16, gap: 8 }}>
          <Button mode="contained" compact style={{ marginRight: 8 }}>
            Tous
          </Button>
          <Button mode="outlined" compact style={{ marginRight: 8 }}>
            Beats
          </Button>
          <Button mode="outlined" compact style={{ marginRight: 8 }}>
            Samples
          </Button>
          <Button mode="outlined" compact style={{ marginRight: 8 }}>
            Services
          </Button>
        </View>

        {/* Products List */}
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </Container>
    </SafeAreaView>
  );
}
