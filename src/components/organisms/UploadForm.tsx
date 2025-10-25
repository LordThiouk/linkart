import React, { useState } from 'react';
import { View, ViewStyle, ScrollView } from 'react-native';
import { Title, Chip } from 'react-native-paper';
// import { useTheme } from 'react-native-paper'; // Not used
import { Input, Text, SectionCard, Button } from '../atoms';
import { tokens } from '../../theme';

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
            <Text variant="body2" style={{ marginBottom: tokens.spacing.sm }}>
              Licence
            </Text>
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
            <Button variant="outline" onPress={handleAddTag} style={{ alignSelf: 'flex-end' }}>
              Ajouter
            </Button>
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

          <Button
            variant="outline"
            icon="upload"
            onPress={() => console.log('Upload preview')}
            style={{ marginBottom: tokens.spacing.sm }}
          >
            Upload Preview (30s max)
          </Button>

          <Button variant="outline" icon="upload" onPress={() => console.log('Upload full file')}>
            Upload Fichier Complet
          </Button>
        </SectionCard>

        {/* Bouton de soumission */}
        <Button
          variant="primary"
          onPress={handleSubmit}
          loading={loading}
          disabled={!isFormValid || loading}
          style={{ marginTop: tokens.spacing.md }}
        >
          Publier le produit
        </Button>
      </View>
    </ScrollView>
  );
};
