/**
 * @deprecated Ce composant est obsolète et sera supprimé dans la v3.0.
 * Utilisez les nouveaux composants ProductUploadForm et ServiceUploadForm à la place.
 * @see ProductUploadForm
 * @see ServiceUploadForm
 */

import React, { useState } from 'react';
import { View, Text, ViewStyle, ScrollView, Button } from 'react-native';
import { tokens } from '../../theme';
import { Input, SectionCard } from '../atoms';
import { Chip, Title } from 'react-native-paper';

export interface UploadFormProps {
  onSubmit: (data: UploadFormData) => void;
  loading?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export interface UploadFormData {
  title: string;
  description: string;
  price: number;
  genre: string;
  bpm?: number;
  license: string;
  tags: string[];
  previewFile?: File;
  fullFile?: File;
}

const LICENSES = ['Basic', 'Premium', 'Exclusive', 'Unlimited'];

export const UploadForm: React.FC<UploadFormProps> = ({ onSubmit, loading = false, style, testID }) => {
  const [formData, setFormData] = useState<UploadFormData>({
    title: '',
    description: '',
    price: 0,
    genre: '',
    bpm: undefined,
    license: 'Basic',
    tags: [],
  });
  const [newTag, setNewTag] = useState('');

  const handleInputChange = (field: keyof UploadFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleSubmit = () => {
    if (formData.title && formData.description && formData.price && formData.genre) {
      onSubmit(formData);
    }
  };

  const isFormValid = formData.title && formData.description && formData.price && formData.genre;

  return (
    <ScrollView style={[{ flex: 1 }, style]} testID={testID}>
      <View style={{ padding: tokens.spacing.md }}>
        {/* Informations de base */}
        <SectionCard style={{ marginBottom: tokens.spacing.md }}>
          <Title style={{ marginBottom: tokens.spacing.md }}>Informations du produit</Title>

          <Input
            label="Titre *"
            placeholder="Nom de votre beat"
            value={formData.title || ''}
            onChangeText={text => handleInputChange('title', text)}
            style={{ marginBottom: tokens.spacing.md }}
          />

          <Input
            label="Description *"
            placeholder="Décrivez votre beat..."
            value={formData.description || ''}
            onChangeText={text => handleInputChange('description', text)}
            multiline
            numberOfLines={4}
            style={{ marginBottom: tokens.spacing.md }}
          />

          <Input
            label="Prix (FCFA) *"
            placeholder="0"
            value={formData.price?.toString() || ''}
            onChangeText={text => handleInputChange('price', parseInt(text) || 0)}
            keyboardType="numeric"
            style={{ marginBottom: tokens.spacing.md }}
          />
        </SectionCard>

        {/* Détails techniques */}
        <SectionCard style={{ marginBottom: tokens.spacing.md }}>
          <Title style={{ marginBottom: tokens.spacing.md }}>Détails techniques</Title>

          <View style={{ flexDirection: 'row', marginBottom: tokens.spacing.md }}>
            <View style={{ flex: 1, marginRight: tokens.spacing.sm }}>
              <Input
                label="Genre *"
                placeholder="Sélectionnez un genre"
                value={formData.genre || ''}
                onChangeText={text => handleInputChange('genre', text)}
              />
            </View>
            <View style={{ flex: 1, marginLeft: tokens.spacing.sm }}>
              <Input
                label="BPM"
                placeholder="120"
                value={formData.bpm?.toString() || ''}
                onChangeText={text => handleInputChange('bpm', parseInt(text) || undefined)}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={{ marginBottom: tokens.spacing.md }}>
            <Text style={{ marginBottom: 8 }}>Licence</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
              {LICENSES.map(license => (
                <Chip
                  key={license}
                  selected={formData.license === license}
                  onPress={() => handleInputChange('license', license)}
                >
                  {license}
                </Chip>
              ))}
            </View>
          </View>
        </SectionCard>

        {/* Tags */}
        <SectionCard style={{ marginBottom: tokens.spacing.md }}>
          <Title style={{ marginBottom: tokens.spacing.md }}>Tags</Title>

          <View style={{ flexDirection: 'row', marginBottom: tokens.spacing.md }}>
            <Input
              label="Ajouter un tag"
              placeholder="Ex: trap, afrobeat..."
              value={newTag}
              onChangeText={setNewTag}
              style={{ flex: 1, marginRight: tokens.spacing.sm }}
            />
            <Button title="Ajouter" onPress={handleAddTag} />
          </View>

          {formData.tags.length > 0 && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
              {formData.tags.map((tag: string) => (
                <Chip key={tag} onClose={() => handleRemoveTag(tag)} style={{ marginBottom: tokens.spacing.xs }}>
                  {tag}
                </Chip>
              ))}
            </View>
          )}
        </SectionCard>

        {/* Upload de fichiers */}
        <SectionCard style={{ marginBottom: tokens.spacing.md }}>
          <Title style={{ marginBottom: tokens.spacing.md }}>Fichiers</Title>

          <Button title="Upload Preview (30s max)" onPress={() => console.log('Upload preview')} />
          <Button title="Upload Fichier Complet" onPress={() => console.log('Upload full file')} />
        </SectionCard>

        {/* Bouton de soumission */}
        <Button title="Publier le produit" onPress={handleSubmit} disabled={!isFormValid || loading} />
      </View>
    </ScrollView>
  );
};
