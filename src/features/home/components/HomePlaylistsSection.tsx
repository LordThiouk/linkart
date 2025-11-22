import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ListMusic } from 'lucide-react-native';
import { PlaylistCardFigma } from '@/components/molecules/PlaylistCardFigma';
import { colors, spacing, typography, radii } from '@/theme';
import type { HomePlaylist } from '../types';

interface HomePlaylistsSectionProps {
  playlists: HomePlaylist[];
  onPlaylistPress?: (playlistId: string) => void;
  onSeeAll?: () => void;
}

export function HomePlaylistsSection({ playlists, onPlaylistPress, onSeeAll }: HomePlaylistsSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderLeft}>
          <LinearGradient
            colors={[colors.cyan, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sectionIcon}
          >
            <ListMusic size={20} color={colors.textPrimary} />
          </LinearGradient>
          <Text style={styles.sectionTitle}>Playlists sélectionnées</Text>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={onSeeAll}>
          <Text style={styles.sectionLink}>Voir tout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.playlistsScroll}>
        {playlists.map(playlist => (
          <View key={playlist.id} style={styles.playlistCard}>
            <PlaylistCardFigma {...playlist} onPress={() => onPlaylistPress?.(playlist.id)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionIcon: {
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  sectionLink: {
    color: colors.cyan,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
  playlistsScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  playlistCard: {
    width: 260,
  },
});
