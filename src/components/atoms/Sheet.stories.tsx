/**
 * Sheet Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import Sheet, { SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from './Sheet';
import Button from './Button';
import Badge from './Badge';
import { colors, spacing, radii } from '../../theme';

const meta = {
  title: 'Atoms/Sheet',
  component: Sheet,
  // Note: Les Modals React Native ne fonctionnent pas dans Storybook Web
  // mais fonctionnent correctement sur mobile (iOS/Android)
  decorators: [
    Story => (
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: colors.background,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

// Helper component pour gérer l'état
const SheetDemo = ({ children, triggerText = 'Ouvrir Sheet' }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Button title={triggerText} onPress={() => setOpen(true)} />
      <Sheet open={open} onOpenChange={setOpen}>
        {children(setOpen)}
      </Sheet>
    </View>
  );
};

export const Default: Story = {
  args: {
    children: <Button title="Ouvrir Sheet" onPress={() => {}} />,
  },
  render: () => (
    <SheetDemo>
      {(setOpen: any) => (
        <SheetContent onClose={() => setOpen(false)}>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>This is a sheet description. Swipe down or tap outside to close.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      )}
    </SheetDemo>
  ),
};

export const WithActions: Story = {
  args: {
    children: <Button title="Choisir une action" onPress={() => {}} />,
  },
  render: () => (
    <SheetDemo>
      {(setOpen: any) => (
        <SheetContent onClose={() => setOpen(false)}>
          <SheetHeader>
            <SheetTitle>Choisir une action</SheetTitle>
            <SheetDescription>Sélectionnez une action à effectuer sur ce beat.</SheetDescription>
          </SheetHeader>
          <View style={{ paddingHorizontal: spacing.xl, gap: spacing.sm }}>
            <Button title="Écouter" variant="outline" fullWidth onPress={() => setOpen(false)} />
            <Button title="Ajouter aux favoris" variant="outline" fullWidth onPress={() => setOpen(false)} />
            <Button title="Partager" variant="outline" fullWidth onPress={() => setOpen(false)} />
          </View>
        </SheetContent>
      )}
    </SheetDemo>
  ),
};

export const FilterSheet: Story = {
  args: {
    children: <Button title="Filtres" onPress={() => {}} />,
  },
  render: () => (
    <SheetDemo>
      {(setOpen: any) => (
        <SheetContent onClose={() => setOpen(false)}>
          <SheetHeader>
            <SheetTitle>Filtres</SheetTitle>
            <SheetDescription>Affinez votre recherche avec ces filtres.</SheetDescription>
          </SheetHeader>
          <View style={{ paddingHorizontal: spacing.xl, gap: spacing.lg }}>
            <View>
              <Text style={{ color: colors.textPrimary, marginBottom: spacing.sm, fontWeight: '600' }}>Genre</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
                <Badge>Trap</Badge>
                <Badge variant="outline">Drill</Badge>
                <Badge variant="outline">Afrobeat</Badge>
                <Badge variant="outline">Hip-Hop</Badge>
                <Badge variant="outline">R&B</Badge>
              </View>
            </View>
            <View>
              <Text style={{ color: colors.textPrimary, marginBottom: spacing.sm, fontWeight: '600' }}>Prix</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
                <Badge>Tous</Badge>
                <Badge variant="outline">Gratuit</Badge>
                <Badge variant="outline">0-10k</Badge>
                <Badge variant="outline">10k-25k</Badge>
                <Badge variant="outline">25k+</Badge>
              </View>
            </View>
            <View>
              <Text style={{ color: colors.textPrimary, marginBottom: spacing.sm, fontWeight: '600' }}>BPM</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
                <Badge variant="outline">60-100</Badge>
                <Badge>100-140</Badge>
                <Badge variant="outline">140-180</Badge>
                <Badge variant="outline">180+</Badge>
              </View>
            </View>
          </View>
          <SheetFooter>
            <Button title="Réinitialiser" variant="outline" onPress={() => {}} />
            <Button title="Appliquer" variant="primary" onPress={() => setOpen(false)} />
          </SheetFooter>
        </SheetContent>
      )}
    </SheetDemo>
  ),
};

export const LicenseSelector: Story = {
  args: {
    children: <Button title="Choisir une licence" onPress={() => {}} />,
  },
  render: () => (
    <SheetDemo>
      {(setOpen: any) => (
        <SheetContent onClose={() => setOpen(false)}>
          <View style={{ paddingHorizontal: spacing.xl, gap: spacing.md }}>
            {[
              { name: 'Premium', price: '25,000 F', features: ['WAV + MP3', 'Usage commercial', '10,000 streams'] },
              {
                name: 'Exclusive',
                price: '50,000 F',
                features: ['WAV + Stems', 'Droits complets', 'Streams illimités'],
              },
            ].map((license, index) => (
              <Pressable
                key={index}
                style={{
                  padding: spacing.lg,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: radii.lg,
                  backgroundColor: colors.surfaceElevated,
                }}
                onPress={() => setOpen(false)}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: spacing.xs,
                  }}
                >
                  <Text style={{ color: colors.textPrimary, fontSize: 16, fontWeight: '600' }}>{license.name}</Text>
                  <Text style={{ color: colors.secondary, fontSize: 16, fontWeight: '700' }}>{license.price}</Text>
                </View>
                {license.features.map((feature, idx) => (
                  <Text key={idx} style={{ color: colors.textMuted, fontSize: 14, marginTop: spacing.xs }}>
                    • {feature}
                  </Text>
                ))}
              </Pressable>
            ))}
          </View>
        </SheetContent>
      )}
    </SheetDemo>
  ),
};

export const ScrollableContent: Story = {
  args: {
    children: <Button title="Liste de beats" onPress={() => {}} />,
  },
  render: () => (
    <SheetDemo>
      {(setOpen: any) => (
        <SheetContent onClose={() => setOpen(false)}>
          <SheetHeader>
            <SheetTitle>Beats disponibles</SheetTitle>
            <SheetDescription>Parcourez tous les beats disponibles.</SheetDescription>
          </SheetHeader>
          <ScrollView style={{ maxHeight: 400, paddingHorizontal: spacing.xl }}>
            {Array.from({ length: 20 }).map((_, index) => (
              <View
                key={index}
                style={{
                  paddingVertical: spacing.md,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <Text style={{ color: colors.textPrimary, fontSize: 16 }}>Beat #{index + 1}</Text>
                <Text style={{ color: colors.textMuted, fontSize: 14, marginTop: spacing.xs }}>
                  Trap • 140 BPM • 25,000 F
                </Text>
              </View>
            ))}
          </ScrollView>
        </SheetContent>
      )}
    </SheetDemo>
  ),
};

export const NoHandle: Story = {
  args: {
    children: <Button title="Sans Handle" onPress={() => {}} />,
  },
  render: () => (
    <SheetDemo>
      {(setOpen: any) => (
        <SheetContent showHandle={false} onClose={() => setOpen(false)}>
          <SheetHeader>
            <SheetTitle>Sheet sans handle</SheetTitle>
            <SheetDescription>
              Ce sheet ne peut être fermé qu'avec le bouton X ou en tapant à l'extérieur.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      )}
    </SheetDemo>
  ),
};

export const ShareSheet: Story = {
  args: {
    children: <Button title="Partager" onPress={() => {}} />,
  },
  render: () => (
    <SheetDemo>
      {(setOpen: any) => (
        <SheetContent onClose={() => setOpen(false)}>
          <SheetHeader>
            <SheetTitle>Partager ce beat</SheetTitle>
            <SheetDescription>Partagez ce beat avec vos amis.</SheetDescription>
          </SheetHeader>
          <View style={{ paddingHorizontal: spacing.xl, gap: spacing.sm }}>
            {[
              { icon: '📱', name: 'WhatsApp' },
              { icon: '📘', name: 'Facebook' },
              { icon: '🐦', name: 'Twitter' },
              { icon: '📧', name: 'Email' },
              { icon: '🔗', name: 'Copier le lien' },
            ].map((option, index) => (
              <Pressable
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: spacing.md,
                  borderRadius: radii.md,
                  backgroundColor: colors.muted,
                }}
                onPress={() => setOpen(false)}
              >
                <Text style={{ fontSize: 24, marginRight: spacing.md }}>{option.icon}</Text>
                <Text style={{ color: colors.textPrimary, fontSize: 16 }}>{option.name}</Text>
              </Pressable>
            ))}
          </View>
        </SheetContent>
      )}
    </SheetDemo>
  ),
};

export const ConfirmationSheet: Story = {
  args: {
    children: <Button title="Supprimer" onPress={() => {}} />,
  },
  render: () => (
    <SheetDemo>
      {(setOpen: any) => (
        <SheetContent onClose={() => setOpen(false)}>
          <View style={{ alignItems: 'center', paddingVertical: spacing.xl }}>
            <Text style={{ fontSize: 48, marginBottom: spacing.md }}>⚠️</Text>
            <SheetTitle style={{ textAlign: 'center', marginBottom: spacing.sm }}>Supprimer ce beat ?</SheetTitle>
            <SheetDescription style={{ textAlign: 'center', paddingHorizontal: spacing.xl }}>
              Cette action est irréversible. Le beat sera définitivement supprimé.
            </SheetDescription>
          </View>
          <SheetFooter>
            <Button title="Annuler" variant="outline" onPress={() => setOpen(false)} />
            <Button title="Supprimer" variant="destructive" onPress={() => setOpen(false)} />
          </SheetFooter>
        </SheetContent>
      )}
    </SheetDemo>
  ),
};
