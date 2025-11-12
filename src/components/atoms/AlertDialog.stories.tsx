/**
 * AlertDialog Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import React, { useState } from 'react';
import AlertDialog, {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from './AlertDialog';
import Button from './Button';
import { colors, spacing } from '../../theme';

const meta = {
  title: 'Atoms/AlertDialog',
  component: AlertDialog,
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
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

// Helper component pour gérer l'état
const AlertDialogDemo = ({ children, triggerText = 'Ouvrir AlertDialog' }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Button title={triggerText} onPress={() => setOpen(true)} />
      <AlertDialog open={open} onOpenChange={setOpen}>
        {children(setOpen)}
      </AlertDialog>
    </View>
  );
};

export const Default: Story = {
  args: { children: null },
  render: () => (
    <AlertDialogDemo>
      {(setOpen: any) => (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Veuillez confirmer pour continuer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button title="Annuler" variant="outline" onPress={() => setOpen(false)} />
            <Button title="Continuer" variant="primary" onPress={() => setOpen(false)} />
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialogDemo>
  ),
};

export const DeleteAccount: Story = {
  args: { children: null },
  render: () => (
    <AlertDialogDemo triggerText="Supprimer compte">
      {(setOpen: any) => (
        <AlertDialogContent>
          <View style={{ alignItems: 'center', marginBottom: spacing.md }}>
            <Text style={{ fontSize: 48, marginBottom: spacing.sm }}>⚠️</Text>
            <AlertDialogTitle>Supprimer le compte ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est définitive. Toutes vos données, beats et transactions seront perdues. Cette action ne
              peut pas être annulée.
            </AlertDialogDescription>
          </View>
          <AlertDialogFooter>
            <Button title="Annuler" variant="outline" onPress={() => setOpen(false)} />
            <Button title="Supprimer définitivement" variant="destructive" onPress={() => setOpen(false)} />
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialogDemo>
  ),
};

export const DeleteBeat: Story = {
  args: { children: null },
  render: () => (
    <AlertDialogDemo triggerText="Supprimer beat">
      {(setOpen: any) => (
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text style={{ fontSize: 40, marginBottom: spacing.sm, textAlign: 'center' }}>🗑️</Text>
            <AlertDialogTitle>Supprimer "Trap Beat 2024" ?</AlertDialogTitle>
            <AlertDialogDescription>
              Ce beat sera définitivement supprimé de votre bibliothèque. Les acheteurs pourront toujours télécharger
              leurs copies.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button title="Annuler" variant="ghost" onPress={() => setOpen(false)} />
            <Button title="Supprimer" variant="destructive" onPress={() => setOpen(false)} />
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialogDemo>
  ),
};

export const LogoutConfirmation: Story = {
  args: { children: null },
  render: () => (
    <AlertDialogDemo triggerText="Se déconnecter">
      {(setOpen: any) => (
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text style={{ fontSize: 40, marginBottom: spacing.sm, textAlign: 'center' }}>👋</Text>
            <AlertDialogTitle>Se déconnecter ?</AlertDialogTitle>
            <AlertDialogDescription>
              Vous allez être déconnecté de votre compte. Vos données sont sauvegardées en ligne.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button title="Annuler" variant="outline" onPress={() => setOpen(false)} />
            <Button title="Se déconnecter" variant="destructive" onPress={() => setOpen(false)} />
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialogDemo>
  ),
};

export const PaymentConfirmation: Story = {
  args: { children: null },
  render: () => (
    <AlertDialogDemo triggerText="Confirmer paiement">
      {(setOpen: any) => (
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text style={{ fontSize: 40, marginBottom: spacing.sm, textAlign: 'center' }}>💳</Text>
            <AlertDialogTitle>Confirmer le paiement</AlertDialogTitle>
            <AlertDialogDescription>
              Vous allez payer 50,000 F CFA pour la licence Exclusive de "Trap Beat 2024". Le paiement sera traité
              immédiatement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <View style={{ paddingVertical: spacing.md, alignItems: 'center' }}>
            <Text style={{ color: colors.textSecondary, marginBottom: spacing.xs }}>Montant total</Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: colors.secondary,
              }}
            >
              50,000 F CFA
            </Text>
          </View>
          <AlertDialogFooter>
            <Button title="Annuler" variant="outline" onPress={() => setOpen(false)} />
            <Button title="Payer maintenant" variant="primary" onPress={() => setOpen(false)} />
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialogDemo>
  ),
};

export const CancelPurchase: Story = {
  args: { children: null },
  render: () => (
    <AlertDialogDemo triggerText="Annuler achat">
      {(setOpen: any) => (
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text style={{ fontSize: 40, marginBottom: spacing.sm, textAlign: 'center' }}>❌</Text>
            <AlertDialogTitle>Annuler cet achat ?</AlertDialogTitle>
            <AlertDialogDescription>
              Votre transaction sera annulée et remboursée sous 3-5 jours ouvrables.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button title="Garder l'achat" variant="outline" onPress={() => setOpen(false)} />
            <Button title="Annuler l'achat" variant="destructive" onPress={() => setOpen(false)} />
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialogDemo>
  ),
};

export const PermissionRequest: Story = {
  args: { children: null },
  render: () => (
    <AlertDialogDemo triggerText="Demander permissions">
      {(setOpen: any) => (
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text style={{ fontSize: 40, marginBottom: spacing.sm, textAlign: 'center' }}>🔐</Text>
            <AlertDialogTitle>Autoriser l'accès ?</AlertDialogTitle>
            <AlertDialogDescription>
              Linkart a besoin d'accéder à votre bibliothèque de fichiers pour importer vos beats. Vos fichiers restent
              privés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button title="Refuser" variant="outline" onPress={() => setOpen(false)} />
            <Button title="Autoriser" variant="primary" onPress={() => setOpen(false)} />
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialogDemo>
  ),
};

export const BlockUser: Story = {
  args: { children: null },
  render: () => (
    <AlertDialogDemo triggerText="Bloquer utilisateur">
      {(setOpen: any) => (
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text style={{ fontSize: 40, marginBottom: spacing.sm, textAlign: 'center' }}>🚫</Text>
            <AlertDialogTitle>Bloquer cet utilisateur ?</AlertDialogTitle>
            <AlertDialogDescription>
              Vous ne verrez plus ses beats et il ne pourra plus vous contacter. Vous pouvez le débloquer plus tard dans
              les paramètres.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button title="Annuler" variant="outline" onPress={() => setOpen(false)} />
            <Button title="Bloquer" variant="destructive" onPress={() => setOpen(false)} />
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialogDemo>
  ),
};
