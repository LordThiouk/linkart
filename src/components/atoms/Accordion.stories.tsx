/**
 * Accordion Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import Accordion, { AccordionItem } from './Accordion';
import { colors, spacing } from '../../theme';

const meta: Meta<typeof Accordion> = {
  title: 'Atoms/Accordion',
  component: Accordion,
  decorators: [
    Story => (
      <View
        style={{
          flex: 1,
          padding: spacing.lg,
          backgroundColor: colors.background,
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Accordion de base avec un seul item
 */
export const Default: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="Qu'est-ce que Linkart ?">
        <Text style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 20 }}>
          Linkart est une plateforme de marketplace musicale qui permet aux beatmakers, studios et ingénieurs du son de
          vendre leurs créations et services.
        </Text>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * Accordion avec plusieurs items
 */
export const Multiple: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="Comment vendre mes beats ?">
        <Text style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 20 }}>
          Pour vendre vos beats, vous devez d'abord activer votre compte vendeur. Ensuite, vous pouvez uploader vos
          beats avec une preview de 30 secondes. Une fois validés par l'admin, ils seront visibles sur le marketplace.
        </Text>
      </AccordionItem>

      <AccordionItem title="Quelles sont les commissions ?">
        <Text style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 20 }}>
          La commission plateforme est de 5% sur les ventes de beats et kits uniquement. Les services professionnels
          sont gratuits (pas de commission).
        </Text>
      </AccordionItem>

      <AccordionItem title="Comment retirer mes gains ?">
        <Text style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 20 }}>
          Vous pouvez demander un retrait depuis votre wallet. Les retraits sont traités manuellement par l'admin et
          envoyés via Wave ou Orange Money.
        </Text>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * Accordion avec variant outline
 */
export const Outline: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="Variant Outline" variant="outline">
        <Text style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 20 }}>
          Ce variant utilise une bordure au lieu d'un fond coloré.
        </Text>
      </AccordionItem>

      <AccordionItem title="Item 2" variant="outline">
        <Text style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 20 }}>Contenu du deuxième item.</Text>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * Accordion avec variant ghost
 */
export const Ghost: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="Variant Ghost" variant="ghost">
        <Text style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 20 }}>
          Ce variant n'a pas de fond ni de bordure, parfait pour un style minimaliste.
        </Text>
      </AccordionItem>

      <AccordionItem title="Item 2" variant="ghost">
        <Text style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 20 }}>Contenu du deuxième item.</Text>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * Accordion avec items ouverts par défaut
 */
export const DefaultOpen: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="Item ouvert par défaut" defaultOpen>
        <Text style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 20 }}>
          Cet item est ouvert par défaut.
        </Text>
      </AccordionItem>

      <AccordionItem title="Item fermé par défaut">
        <Text style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 20 }}>
          Cet item est fermé par défaut.
        </Text>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * Accordion avec contenu riche
 */
export const RichContent: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="FAQ Complète">
        <View style={{ gap: spacing.md }}>
          <Text style={{ color: colors.textPrimary, fontSize: 16, fontWeight: '600', marginBottom: spacing.xs }}>
            Questions fréquentes
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 20 }}>
            Voici une liste de questions fréquemment posées sur la plateforme Linkart.
          </Text>
          <View style={{ marginTop: spacing.sm, gap: spacing.xs }}>
            <Text style={{ color: colors.primary, fontSize: 14, fontWeight: '500' }}>• Comment créer un compte ?</Text>
            <Text style={{ color: colors.primary, fontSize: 14, fontWeight: '500' }}>• Comment activer la vente ?</Text>
            <Text style={{ color: colors.primary, fontSize: 14, fontWeight: '500' }}>
              • Quels formats de fichiers sont acceptés ?
            </Text>
          </View>
        </View>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * Accordion désactivé
 */
export const Disabled: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="Item désactivé" disabled>
        <Text style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 20 }}>
          Cet item ne peut pas être ouvert.
        </Text>
      </AccordionItem>

      <AccordionItem title="Item actif">
        <Text style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 20 }}>
          Cet item fonctionne normalement.
        </Text>
      </AccordionItem>
    </Accordion>
  ),
};
