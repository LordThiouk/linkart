/**
 * Dialog Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Dialog, { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './Dialog';
import Button from './Button';
import { colors, spacing, radii } from '../../theme';

const meta = {
  title: 'Atoms/Dialog',
  component: Dialog,
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
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

// Helper component pour gérer l'état
const DialogDemo = ({ children, triggerText = 'Ouvrir Dialog' }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Button title={triggerText} onPress={() => setOpen(true)} />
      <Dialog open={open} onOpenChange={setOpen}>
        {children(setOpen)}
      </Dialog>
    </View>
  );
};

export const Default: Story = {
  args: {
    children: <Text style={{ color: colors.textPrimary }}>Contenu du dialog</Text>,
  },
  render: () => (
    <DialogDemo>
      {(setOpen: any) => (
        <DialogContent onClose={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>
              This is a dialog description. It provides more context about the dialog content.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      )}
    </DialogDemo>
  ),
};

export const WithActions: Story = {
  args: {
    children: <Text style={{ color: colors.textPrimary }}>Contenu du dialog</Text>,
  },
  render: () => (
    <DialogDemo>
      {(setOpen: any) => (
        <DialogContent onClose={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Confirmer l'action</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir continuer ? Cette action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button title="Annuler" variant="ghost" onPress={() => setOpen(false)} />
            <Button title="Confirmer" variant="primary" onPress={() => setOpen(false)} />
          </DialogFooter>
        </DialogContent>
      )}
    </DialogDemo>
  ),
};

export const DeleteConfirmation: Story = {
  args: {
    children: <Text style={{ color: colors.textPrimary }}>Contenu du dialog</Text>,
  },
  render: () => (
    <DialogDemo>
      {(setOpen: any) => (
        <DialogContent onClose={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Supprimer le beat ?</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. Le beat sera définitivement supprimé de votre compte.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button title="Annuler" variant="outline" onPress={() => setOpen(false)} />
            <Button title="Supprimer" variant="destructive" onPress={() => setOpen(false)} />
          </DialogFooter>
        </DialogContent>
      )}
    </DialogDemo>
  ),
};

export const PurchaseConfirmation: Story = {
  args: {
    children: <Text style={{ color: colors.textPrimary }}>Contenu du dialog</Text>,
  },
  render: () => (
    <DialogDemo>
      {(setOpen: any) => (
        <DialogContent onClose={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Confirmer l'achat</DialogTitle>
            <DialogDescription>
              Vous êtes sur le point d'acheter "Trap Beat 2024" pour 25,000 F CFA. Le fichier sera disponible
              immédiatement après le paiement.
            </DialogDescription>
          </DialogHeader>
          <View style={{ paddingVertical: spacing.md }}>
            <Text style={{ color: colors.textSecondary, marginBottom: spacing.xs }}>Prix : 25,000 F CFA</Text>
            <Text style={{ color: colors.textSecondary }}>Licence : Non-Exclusive</Text>
          </View>
          <DialogFooter>
            <Button title="Annuler" variant="outline" onPress={() => setOpen(false)} />
            <Button title="Payer" variant="primary" onPress={() => setOpen(false)} />
          </DialogFooter>
        </DialogContent>
      )}
    </DialogDemo>
  ),
};

export const SuccessMessage: Story = {
  args: {
    children: <Text style={{ color: colors.textPrimary }}>Contenu du dialog</Text>,
  },
  render: () => (
    <DialogDemo>
      {(setOpen: any) => (
        <DialogContent onClose={() => setOpen(false)} showClose={false}>
          <View style={{ alignItems: 'center', paddingVertical: spacing.md }}>
            <Text style={{ fontSize: 48, marginBottom: spacing.md }}>✓</Text>
            <DialogTitle style={{ textAlign: 'center', marginBottom: spacing.sm }}>Paiement réussi !</DialogTitle>
            <DialogDescription style={{ textAlign: 'center' }}>
              Votre achat a été confirmé. Vous pouvez maintenant télécharger votre beat.
            </DialogDescription>
          </View>
          <DialogFooter style={{ justifyContent: 'center' }}>
            <Button title="Télécharger" variant="primary" fullWidth onPress={() => setOpen(false)} />
          </DialogFooter>
        </DialogContent>
      )}
    </DialogDemo>
  ),
};

export const FormDialog: Story = {
  args: {
    children: <Text style={{ color: colors.textPrimary }}>Contenu du dialog</Text>,
  },
  render: () => (
    <DialogDemo>
      {(setOpen: any) => (
        <DialogContent onClose={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Nouveau Beat</DialogTitle>
            <DialogDescription>Remplissez les informations pour créer un nouveau beat.</DialogDescription>
          </DialogHeader>
          <View style={{ gap: spacing.md, paddingVertical: spacing.md }}>
            <View>
              <Text style={{ color: colors.textPrimary, marginBottom: spacing.xs }}>Titre du beat</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: radii.md,
                  padding: spacing.md,
                  backgroundColor: colors.muted,
                }}
              >
                <Text style={{ color: colors.textMuted }}>Ex: Trap Beat 2024</Text>
              </View>
            </View>
            <View>
              <Text style={{ color: colors.textPrimary, marginBottom: spacing.xs }}>Prix (F CFA)</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: radii.md,
                  padding: spacing.md,
                  backgroundColor: colors.muted,
                }}
              >
                <Text style={{ color: colors.textMuted }}>25000</Text>
              </View>
            </View>
          </View>
          <DialogFooter>
            <Button title="Annuler" variant="outline" onPress={() => setOpen(false)} />
            <Button title="Créer" variant="primary" onPress={() => setOpen(false)} />
          </DialogFooter>
        </DialogContent>
      )}
    </DialogDemo>
  ),
};

export const LongContent: Story = {
  args: {
    children: <Text style={{ color: colors.textPrimary }}>Contenu du dialog</Text>,
  },
  render: () => (
    <DialogDemo>
      {(setOpen: any) => (
        <DialogContent onClose={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Conditions d'utilisation</DialogTitle>
            <DialogDescription>Veuillez lire attentivement nos conditions avant de continuer.</DialogDescription>
          </DialogHeader>
          <View style={{ maxHeight: 300, paddingVertical: spacing.md }}>
            <Text style={{ color: colors.textSecondary, lineHeight: 24 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
              {'\n\n'}
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
              {'\n\n'}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </Text>
          </View>
          <DialogFooter>
            <Button title="J'accepte" variant="primary" fullWidth onPress={() => setOpen(false)} />
          </DialogFooter>
        </DialogContent>
      )}
    </DialogDemo>
  ),
};

export const NoCloseButton: Story = {
  args: {
    children: <Text style={{ color: colors.textPrimary }}>Contenu du dialog</Text>,
  },
  render: () => (
    <DialogDemo>
      {(setOpen: any) => (
        <DialogContent showClose={false}>
          <DialogHeader>
            <DialogTitle>Action requise</DialogTitle>
            <DialogDescription>Vous devez choisir une option pour continuer.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button title="Option 1" variant="outline" onPress={() => setOpen(false)} />
            <Button title="Option 2" variant="primary" onPress={() => setOpen(false)} />
          </DialogFooter>
        </DialogContent>
      )}
    </DialogDemo>
  ),
};
