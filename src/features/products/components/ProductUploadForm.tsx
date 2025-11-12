import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import Button from '../../../components/atoms/Button';
import Input from '../../../components/atoms/Input';
import Badge from '../../../components/atoms/Badge';

interface ProductFormData {
  title: string;
  description: string;
  genre: string;
  bpm?: number;
  tags: string[];
  artworkUrl?: string;
  licenses: {
    type: 'basic' | 'non_exclusive' | 'exclusive' | 'lease';
    price: number;
    terms: string;
    is_available: boolean;
  }[];
}

interface ProductUploadFormProps {
  onSubmit: (data: ProductFormData) => void;
  loading?: boolean;
}

const LICENSE_TYPES = [
  { key: 'basic', label: 'Basic', description: 'Usage non-commercial uniquement' },
  { key: 'non_exclusive', label: 'Non-Exclusive', description: 'Usage commercial autorisé' },
  { key: 'exclusive', label: 'Exclusive', description: 'Droits exclusifs complets' },
  { key: 'lease', label: 'Lease', description: 'Location temporaire' },
];

const GENRES = ['Trap', 'Hip Hop', 'Afrobeat', 'R&B', 'Pop', 'Electronic', 'Jazz', 'Rock', 'Reggae', 'Folk'];

export const ProductUploadForm: React.FC<ProductUploadFormProps> = ({ onSubmit, loading = false }) => {
  const theme = useTheme();

  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    description: '',
    genre: '',
    bpm: undefined,
    tags: [],
    licenses: [],
  });

  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim() || formData.title.length < 3) {
      newErrors.title = 'Le titre doit contenir au moins 3 caractères';
    }

    if (!formData.description.trim() || formData.description.length < 10) {
      newErrors.description = 'La description doit contenir au moins 10 caractères';
    }

    if (!formData.genre) {
      newErrors.genre = 'Veuillez sélectionner un genre';
    }

    if (formData.bpm && (formData.bpm < 60 || formData.bpm > 200)) {
      newErrors.bpm = 'Le BPM doit être entre 60 et 200';
    }

    if (!formData.artworkUrl?.trim()) {
      newErrors.artwork = "L'artwork est requis";
    }

    if (formData.licenses.length === 0) {
      newErrors.licenses = 'Veuillez configurer au moins une licence';
    }

    formData.licenses.forEach((license, index) => {
      if (license.price <= 0) {
        newErrors[`license_${index}_price`] = 'Le prix doit être supérieur à 0';
      }
      if (!license.terms.trim()) {
        newErrors[`license_${index}_terms`] = 'Les termes sont requis';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const updateField = (
    field: keyof ProductFormData,
    value: string | number | string[] | ProductFormData['licenses']
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      updateField('tags', [...formData.tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const toggleLicense = (licenseType: string) => {
    const existingLicense = formData.licenses.find(l => l.type === licenseType);

    if (existingLicense) {
      // Retirer la licence
      updateField(
        'licenses',
        formData.licenses.filter(l => l.type !== licenseType)
      );
    } else {
      // Ajouter la licence
      const newLicense = {
        type: licenseType as ProductFormData['licenses'][0]['type'],
        price: 0,
        terms: '',
        is_available: true,
      };
      updateField('licenses', [...formData.licenses, newLicense]);
    }
  };

  const updateLicense = (licenseType: string, field: 'price' | 'terms', value: string | number) => {
    const updatedLicenses = formData.licenses.map(license => {
      if (license.type === licenseType) {
        return { ...license, [field]: value };
      }
      return license;
    });
    updateField('licenses', updatedLicenses);
  };

  const getLicenseConfig = (licenseType: string) => {
    return formData.licenses.find(l => l.type === licenseType);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.form}>
        {/* Titre */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>Titre du produit *</Text>
          <Input
            value={formData.title}
            onChangeText={(text: string) => updateField('title', text)}
            placeholder="Ex: Dark Trap Beat"
            error={errors.title || undefined}
            testID="product-title-input"
          />
          {errors.title && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.title}</Text>}
        </View>

        {/* Description */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>Description *</Text>
          <Input
            value={formData.description}
            onChangeText={(text: string) => updateField('description', text)}
            placeholder="Décrivez votre beat..."
            multiline
            numberOfLines={4}
            error={errors.description || undefined}
            testID="product-description-input"
          />
          {errors.description && (
            <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.description}</Text>
          )}
        </View>

        {/* Genre */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>Genre *</Text>
          <View style={styles.genreContainer}>
            {GENRES.map(genre => (
              <TouchableOpacity
                key={genre}
                style={[
                  styles.genreButton,
                  {
                    backgroundColor: formData.genre === genre ? theme.colors.primary : theme.colors.surfaceVariant,
                  },
                ]}
                onPress={() => updateField('genre', genre)}
              >
                <Text
                  style={[
                    styles.genreButtonText,
                    {
                      color: formData.genre === genre ? theme.colors.onPrimary : theme.colors.onSurfaceVariant,
                    },
                  ]}
                >
                  {genre}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.genre && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.genre}</Text>}
        </View>

        {/* BPM */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>BPM (optionnel)</Text>
          <Input
            value={formData.bpm?.toString() || ''}
            onChangeText={(text: string) => updateField('bpm', text ? parseInt(text) : 0)}
            placeholder="Ex: 140"
            keyboardType="numeric"
            error={errors.bpm || undefined}
            testID="product-bpm-input"
          />
          {errors.bpm && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.bpm}</Text>}
        </View>

        {/* Tags */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>Tags</Text>
          <View style={styles.tagInputContainer}>
            <Input
              value={currentTag}
              onChangeText={setCurrentTag}
              placeholder="Ajouter un tag..."
              style={styles.tagInput}
              testID="product-tag-input"
            />
            <Button title="+" onPress={addTag} variant="secondary" size="sm" disabled={!currentTag.trim()} />
          </View>
          <View style={styles.tagsContainer}>
            {formData.tags.map(tag => (
              <Badge key={tag} children={tag} variant="default" size="sm" visible={true} testID={`tag-${tag}`} />
            ))}
          </View>
        </View>

        {/* Licences et Prix */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>Licences et Prix *</Text>
          <Text style={[styles.subLabel, { color: theme.colors.onSurfaceVariant }]}>
            Sélectionnez les types de licences disponibles pour votre produit
          </Text>

          {LICENSE_TYPES.map(licenseType => {
            const isSelected = getLicenseConfig(licenseType.key);
            return (
              <View key={licenseType.key} style={styles.licenseContainer}>
                <TouchableOpacity
                  style={[
                    styles.licenseHeader,
                    {
                      backgroundColor: isSelected ? theme.colors.primary : theme.colors.surfaceVariant,
                    },
                  ]}
                  onPress={() => toggleLicense(licenseType.key)}
                >
                  <View style={styles.licenseInfo}>
                    <Text
                      style={[
                        styles.licenseTitle,
                        {
                          color: isSelected ? theme.colors.onPrimary : theme.colors.onSurfaceVariant,
                        },
                      ]}
                    >
                      {licenseType.label}
                    </Text>
                    <Text
                      style={[
                        styles.licenseDescription,
                        {
                          color: isSelected ? theme.colors.onPrimary : theme.colors.onSurfaceVariant,
                        },
                      ]}
                    >
                      {licenseType.description}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.checkbox,
                      {
                        backgroundColor: isSelected ? theme.colors.onPrimary : 'transparent',
                        borderColor: isSelected ? theme.colors.onPrimary : theme.colors.outline,
                      },
                    ]}
                  >
                    {isSelected && <Text style={{ color: theme.colors.primary }}>✓</Text>}
                  </View>
                </TouchableOpacity>

                {isSelected && (
                  <View style={styles.licenseConfig}>
                    <View style={styles.priceInputContainer}>
                      <Text style={[styles.configLabel, { color: theme.colors.onSurface }]}>Prix (FCFA)</Text>
                      <Input
                        value={isSelected.price.toString()}
                        onChangeText={(text: string) => updateLicense(licenseType.key, 'price', parseInt(text) || 0)}
                        placeholder="0"
                        keyboardType="numeric"
                        error={errors[`license_${formData.licenses.indexOf(isSelected)}_price`] || undefined}
                        testID={`license-${licenseType.key}-price`}
                      />
                    </View>
                    <View style={styles.termsInputContainer}>
                      <Text style={[styles.configLabel, { color: theme.colors.onSurface }]}>Termes et conditions</Text>
                      <Input
                        value={isSelected.terms}
                        onChangeText={(text: string) => updateLicense(licenseType.key, 'terms', text)}
                        placeholder="Décrivez les termes de cette licence..."
                        multiline
                        numberOfLines={3}
                        error={errors[`license_${formData.licenses.indexOf(isSelected)}_terms`] || undefined}
                        testID={`license-${licenseType.key}-terms`}
                      />
                    </View>
                  </View>
                )}
              </View>
            );
          })}

          {errors.licenses && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.licenses}</Text>}
        </View>

        {/* Artwork Upload */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>Artwork *</Text>
          <Text style={[styles.subLabel, { color: theme.colors.onSurfaceVariant }]}>
            Image de couverture pour votre beat (recommandé: 1000x1000px, formats: JPG, PNG)
          </Text>
          <View style={[styles.uploadPlaceholder, { backgroundColor: theme.colors.surfaceVariant }]}>
            <Text style={[styles.uploadText, { color: theme.colors.onSurfaceVariant }]}>
              📷 Upload Artwork - À implémenter
            </Text>
            <Text style={[styles.uploadSubText, { color: theme.colors.onSurfaceVariant }]}>
              Glissez-déposez ou cliquez pour sélectionner
            </Text>
          </View>
          {formData.artworkUrl && (
            <View style={styles.artworkPreview}>
              <Text style={[styles.previewLabel, { color: theme.colors.onSurface }]}>Aperçu:</Text>
              <View style={styles.artworkContainer}>
                <Image source={{ uri: formData.artworkUrl }} style={styles.artworkImage} resizeMode="cover" />
                <TouchableOpacity style={styles.removeArtworkButton} onPress={() => updateField('artworkUrl', '')}>
                  <Text style={[styles.removeArtworkText, { color: theme.colors.error }]}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {errors.artwork && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.artwork}</Text>}
        </View>

        {/* Upload sections (placeholder) */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>Fichiers Audio</Text>
          <View style={[styles.uploadPlaceholder, { backgroundColor: theme.colors.surfaceVariant }]}>
            <Text style={[styles.uploadText, { color: theme.colors.onSurfaceVariant }]}>
              🎵 Upload Preview (30s max) - À implémenter
            </Text>
            <Text style={[styles.uploadSubText, { color: theme.colors.onSurfaceVariant }]}>Format: MP3, WAV, M4A</Text>
          </View>
          <View style={[styles.uploadPlaceholder, { backgroundColor: theme.colors.surfaceVariant }]}>
            <Text style={[styles.uploadText, { color: theme.colors.onSurfaceVariant }]}>
              📦 Upload Fichier Complet - À implémenter
            </Text>
            <Text style={[styles.uploadSubText, { color: theme.colors.onSurfaceVariant }]}>
              Format: ZIP, RAR (avec stems, MIDI, etc.)
            </Text>
          </View>
        </View>

        {/* Submit Button */}
        <Button title="Publier le Produit" onPress={handleSubmit} loading={loading} disabled={loading} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  field: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  subLabel: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 18,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  genreButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tagInputContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  tagInput: {
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  licenseContainer: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  licenseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  licenseInfo: {
    flex: 1,
  },
  licenseTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  licenseDescription: {
    fontSize: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  licenseConfig: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    gap: 16,
  },
  priceInputContainer: {
    flex: 1,
  },
  termsInputContainer: {
    flex: 1,
  },
  configLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  uploadPlaceholder: {
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 14,
    textAlign: 'center',
  },
  uploadSubText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    opacity: 0.7,
  },
  artworkPreview: {
    marginTop: 12,
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  artworkContainer: {
    position: 'relative',
    alignSelf: 'center',
  },
  artworkImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#333333',
  },
  removeArtworkButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  removeArtworkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
