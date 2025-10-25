import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph, Chip, Avatar, Surface, IconButton, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ProductDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Product Header */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.productHeader}>
              <Surface style={styles.productIcon}>
                <Text style={styles.productIconText}>🎵</Text>
              </Surface>

              <View style={styles.productInfo}>
                <Title style={styles.productTitle}>Afrobeat Instrumental</Title>
                <View style={styles.creatorInfo}>
                  <Avatar.Text size={32} label="BP" />
                  <Text style={styles.creatorName}>Beatmaker Pro</Text>
                </View>
                <View style={styles.tagsContainer}>
                  <Chip mode="outlined" style={styles.tag}>
                    Afrobeat
                  </Chip>
                  <Chip mode="outlined" style={styles.tag}>
                    120 BPM
                  </Chip>
                </View>
              </View>
            </View>

            <View style={styles.priceSection}>
              <Text style={styles.price}>15 000 F</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingIcon}>⭐</Text>
                <Text style={styles.ratingValue}>4.8</Text>
                <Text style={styles.ratingCount}>(12 avis)</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Audio Player */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Aperçu (30s)</Title>

            <View style={styles.playerContainer}>
              <Surface style={styles.playerPlaceholder}>
                <Text style={styles.playerIcon}>🎧</Text>
                <Text style={styles.playerText}>Cliquez pour écouter l'aperçu</Text>
              </Surface>

              <View style={styles.playerControls}>
                <IconButton icon="skip-previous" mode="outlined" />
                <IconButton icon="play" mode="contained" size={40} />
                <IconButton icon="skip-next" mode="outlined" />
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Product Details */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Détails du produit</Title>
            <View style={styles.detailsList}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Type de licence</Text>
                <Text style={styles.detailValue}>Exclusive</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Durée</Text>
                <Text style={styles.detailValue}>3:00</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Clé</Text>
                <Text style={styles.detailValue}>C mineur</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Format</Text>
                <Text style={styles.detailValue}>WAV, MP3</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Description */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Description</Title>
            <Paragraph style={styles.description}>
              Un beat afrobeat moderne avec des percussions traditionnelles et des mélodies entraînantes. Parfait pour
              les artistes qui cherchent un son authentique et contemporain. Inclut les stems séparés pour un mixage
              personnalisé.
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Reviews */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Avis clients</Title>
            <View style={styles.reviewsContainer}>
              <View style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewAuthor}>
                    <Avatar.Text size={32} label="A" />
                    <View style={styles.reviewAuthorInfo}>
                      <Text style={styles.reviewAuthorName}>Artist Name</Text>
                      <Text style={styles.reviewStars}>⭐⭐⭐⭐⭐</Text>
                    </View>
                  </View>
                  <Text style={styles.reviewDate}>Il y a 2 jours</Text>
                </View>
                <Text style={styles.reviewText}>
                  Excellent beat, exactement ce que je cherchais pour mon prochain single!
                </Text>
              </View>

              <View style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewAuthor}>
                    <Avatar.Text size={32} label="P" />
                    <View style={styles.reviewAuthorInfo}>
                      <Text style={styles.reviewAuthorName}>Producer X</Text>
                      <Text style={styles.reviewStars}>⭐⭐⭐⭐⭐</Text>
                    </View>
                  </View>
                  <Text style={styles.reviewDate}>Il y a 1 semaine</Text>
                </View>
                <Text style={styles.reviewText}>Qualité professionnelle, je recommande vivement ce beatmaker!</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Purchase Button */}
        <Button mode="contained" style={styles.purchaseButton} contentStyle={styles.purchaseButtonContent}>
          Acheter maintenant - 15 000 F
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionCard: {
    marginBottom: 16,
    elevation: 2,
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  productIcon: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  productIconText: {
    fontSize: 32,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  creatorName: {
    color: '#6b7280',
    marginLeft: 8,
    fontSize: 14,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    marginRight: 8,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  ratingValue: {
    fontWeight: '600',
    marginRight: 4,
  },
  ratingCount: {
    color: '#6b7280',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  playerContainer: {
    gap: 16,
  },
  playerPlaceholder: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
  },
  playerIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  playerText: {
    color: '#6b7280',
    fontSize: 14,
  },
  playerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  detailsList: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    color: '#6b7280',
    fontSize: 14,
  },
  detailValue: {
    fontWeight: '600',
    fontSize: 14,
  },
  divider: {
    marginVertical: 4,
  },
  description: {
    color: '#6b7280',
    lineHeight: 20,
  },
  reviewsContainer: {
    gap: 16,
  },
  reviewItem: {
    gap: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewAuthorInfo: {
    marginLeft: 8,
  },
  reviewAuthorName: {
    fontWeight: '600',
    fontSize: 14,
  },
  reviewStars: {
    fontSize: 12,
  },
  reviewDate: {
    color: '#6b7280',
    fontSize: 12,
  },
  reviewText: {
    color: '#6b7280',
    fontSize: 14,
    lineHeight: 18,
  },
  purchaseButton: {
    marginTop: 16,
  },
  purchaseButtonContent: {
    paddingVertical: 12,
  },
});
