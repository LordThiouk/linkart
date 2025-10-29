/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Button } from '../../../components/atoms/Button';
import { Input } from '../../../components/atoms/Input';
import { Badge } from '../../../components/atoms/Badge';

interface ServiceFormData {
  title: string;
  description: string;
  category: 'mixage' | 'mastering' | 'recording' | 'production' | 'coaching' | 'sound_design';
  pricing_type: 'fixed' | 'on_demand' | 'tiered';
  fixed_pricing?: {
    price: number;
    unit: 'hour' | 'track' | 'project';
  };
  on_demand_message?: string;
  tiered_pricing?: {
    name: string;
    price: number;
    description: string;
    duration_estimate?: number;
  }[];
  tags: string[];
}

interface ServiceUploadFormProps {
  onSubmit: (data: ServiceFormData) => void;
  loading?: boolean;
}

const SERVICE_CATEGORIES = [
  { key: 'mixage', label: 'Mixage' },
  { key: 'mastering', label: 'Mastering' },
  { key: 'recording', label: 'Enregistrement' },
  { key: 'production', label: 'Production' },
  { key: 'coaching', label: 'Coaching' },
  { key: 'sound_design', label: 'Sound Design' },
];

const PRICING_TYPES = [
  { key: 'fixed', label: 'Prix fixe', description: 'Un prix fixe par unité' },
  { key: 'on_demand', label: 'À la demande', description: 'Contactez-moi pour discuter' },
  { key: 'tiered', label: 'Multi-tiers', description: 'Plusieurs options de prix' },
];

const PRICING_UNITS = [
  { key: 'hour', label: 'Par heure' },
  { key: 'track', label: 'Par titre' },
  { key: 'project', label: 'Par projet' },
];

export const ServiceUploadForm: React.FC<ServiceUploadFormProps> = ({ onSubmit, loading = false }) => {
  const theme = useTheme();

  const [formData, setFormData] = useState<ServiceFormData>({
    title: '',
    description: '',
    category: 'mixage',
    pricing_type: 'fixed',
    fixed_pricing: {
      price: 0,
      unit: 'hour',
    },
    on_demand_message: '',
    tiered_pricing: [],
    tags: [],
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

    if (formData.pricing_type === 'fixed' && (!formData.fixed_pricing?.price || formData.fixed_pricing.price <= 0)) {
      newErrors.fixed_price = 'Le prix doit être supérieur à 0';
    }

    if (formData.pricing_type === 'on_demand' && !formData.on_demand_message?.trim()) {
      newErrors.on_demand_message = 'Le message de contact est requis';
    }

    if (formData.pricing_type === 'tiered' && formData.tiered_pricing?.length === 0) {
      newErrors.tiered_pricing = 'Veuillez ajouter au moins un tier';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const updateField = (field: keyof ServiceFormData, value: any) => {
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

  const removeTag = (tagToRemove: string) => {
    updateField(
      'tags',
      formData.tags.filter(tag => tag !== tagToRemove)
    );
  };

  const addTier = () => {
    const newTier = {
      name: '',
      price: 0,
      description: '',
      duration_estimate: undefined,
    };
    updateField('tiered_pricing', [...(formData.tiered_pricing || []), newTier]);
  };

  const removeTier = (index: number) => {
    const updatedTiers = formData.tiered_pricing?.filter((_, i) => i !== index) || [];
    updateField('tiered_pricing', updatedTiers);
  };

  const updateTier = (
    index: number,
    field: keyof NonNullable<ServiceFormData['tiered_pricing']>[0],
    value: number | string | undefined
  ) => {
    const updatedTiers =
      formData.tiered_pricing?.map((tier, i) => (i === index ? { ...tier, [field]: value } : tier)) || [];
    updateField('tiered_pricing', updatedTiers);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.form}>
        {/* Titre */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>Titre du service *</Text>
          <Input
            value={formData.title}
            onChangeText={text => updateField('title', text)}
            placeholder="Ex: Mixage professionnel"
            error={!!errors.title}
            testID="service-title-input"
          />
          {errors.title && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.title}</Text>}
        </View>

        {/* Description */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>Description *</Text>
          <Input
            value={formData.description}
            onChangeText={text => updateField('description', text)}
            placeholder="Décrivez votre service..."
            multiline
            numberOfLines={4}
            error={!!errors.description}
            testID="service-description-input"
          />
          {errors.description && (
            <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.description}</Text>
          )}
        </View>

        {/* Catégorie */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>Catégorie *</Text>
          <View style={styles.categoryContainer}>
            {SERVICE_CATEGORIES.map(category => (
              <TouchableOpacity
                key={category.key}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor:
                      formData.category === category.key ? theme.colors.primary : theme.colors.surfaceVariant,
                  },
                ]}
                onPress={() => updateField('category', category.key)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    {
                      color:
                        formData.category === category.key ? theme.colors.onPrimary : theme.colors.onSurfaceVariant,
                    },
                  ]}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Type de tarification */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>Type de tarification *</Text>
          <View style={styles.pricingTypeContainer}>
            {PRICING_TYPES.map(pricingType => (
              <TouchableOpacity
                key={pricingType.key}
                style={[
                  styles.pricingTypeButton,
                  {
                    backgroundColor:
                      formData.pricing_type === pricingType.key ? theme.colors.primary : theme.colors.surfaceVariant,
                  },
                ]}
                onPress={() => updateField('pricing_type', pricingType.key)}
              >
                <Text
                  style={[
                    styles.pricingTypeTitle,
                    {
                      color:
                        formData.pricing_type === pricingType.key
                          ? theme.colors.onPrimary
                          : theme.colors.onSurfaceVariant,
                    },
                  ]}
                >
                  {pricingType.label}
                </Text>
                <Text
                  style={[
                    styles.pricingTypeDescription,
                    {
                      color:
                        formData.pricing_type === pricingType.key
                          ? theme.colors.onPrimary
                          : theme.colors.onSurfaceVariant,
                    },
                  ]}
                >
                  {pricingType.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Configuration du prix fixe */}
        {formData.pricing_type === 'fixed' && (
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.colors.onSurface }]}>Configuration Prix Fixe</Text>
            <View style={styles.fixedPricingContainer}>
              <View style={styles.priceInputContainer}>
                <Text style={[styles.configLabel, { color: theme.colors.onSurface }]}>Prix (FCFA)</Text>
                <Input
                  value={formData.fixed_pricing?.price.toString() || ''}
                  onChangeText={text =>
                    updateField('fixed_pricing', {
                      ...formData.fixed_pricing,
                      price: parseInt(text) || 0,
                    })
                  }
                  placeholder="0"
                  keyboardType="numeric"
                  error={!!errors.fixed_price}
                  testID="fixed-price-input"
                />
                {errors.fixed_price && (
                  <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.fixed_price}</Text>
                )}
              </View>
              <View style={styles.unitContainer}>
                <Text style={[styles.configLabel, { color: theme.colors.onSurface }]}>Unité</Text>
                <View style={styles.unitButtons}>
                  {PRICING_UNITS.map(unit => (
                    <TouchableOpacity
                      key={unit.key}
                      style={[
                        styles.unitButton,
                        {
                          backgroundColor:
                            formData.fixed_pricing?.unit === unit.key
                              ? theme.colors.primary
                              : theme.colors.surfaceVariant,
                        },
                      ]}
                      onPress={() =>
                        updateField('fixed_pricing', {
                          ...formData.fixed_pricing,
                          unit: unit.key as 'hour' | 'track' | 'project',
                        })
                      }
                    >
                      <Text
                        style={[
                          styles.unitButtonText,
                          {
                            color:
                              formData.fixed_pricing?.unit === unit.key
                                ? theme.colors.onPrimary
                                : theme.colors.onSurfaceVariant,
                          },
                        ]}
                      >
                        {unit.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Configuration à la demande */}
        {formData.pricing_type === 'on_demand' && (
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.colors.onSurface }]}>Message de Contact</Text>
            <Input
              value={formData.on_demand_message || ''}
              onChangeText={text => updateField('on_demand_message', text)}
              placeholder="Ex: Contactez-moi pour discuter de vos besoins et obtenir un devis personnalisé..."
              multiline
              numberOfLines={4}
              error={!!errors.on_demand_message}
              testID="on-demand-message-input"
            />
            {errors.on_demand_message && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.on_demand_message}</Text>
            )}
          </View>
        )}

        {/* Configuration multi-tiers */}
        {formData.pricing_type === 'tiered' && (
          <View style={styles.field}>
            <View style={styles.tieredHeader}>
              <Text style={[styles.label, { color: theme.colors.onSurface }]}>Options de Prix</Text>
              <Button title="+ Ajouter" onPress={addTier} variant="secondary" size="small" testID="add-tier-button" />
            </View>

            {formData.tiered_pricing?.map((tier, index) => (
              <View key={index} style={styles.tierContainer}>
                <View style={styles.tierHeader}>
                  <Text style={[styles.tierTitle, { color: theme.colors.onSurface }]}>Tier {index + 1}</Text>
                  <TouchableOpacity onPress={() => removeTier(index)} style={styles.removeTierButton}>
                    <Text style={[styles.removeTierText, { color: theme.colors.error }]}>Supprimer</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.tierFields}>
                  <Input
                    value={tier.name}
                    onChangeText={text => updateTier(index, 'name', text)}
                    placeholder="Nom du tier (ex: Basic, Standard, Premium)"
                    testID={`tier-${index}-name`}
                  />
                  <Input
                    value={tier.price.toString()}
                    onChangeText={text => updateTier(index, 'price', parseInt(text) || 0)}
                    placeholder="Prix (FCFA)"
                    keyboardType="numeric"
                    testID={`tier-${index}-price`}
                  />
                  <Input
                    value={tier.description}
                    onChangeText={text => updateTier(index, 'description', text)}
                    placeholder="Description des services inclus..."
                    multiline
                    numberOfLines={3}
                    testID={`tier-${index}-description`}
                  />
                  <Input
                    value={tier.duration_estimate?.toString() || ''}
                    onChangeText={text => updateTier(index, 'duration_estimate', text ? parseInt(text) : undefined)}
                    placeholder="Durée estimée (heures)"
                    keyboardType="numeric"
                    testID={`tier-${index}-duration`}
                  />
                </View>
              </View>
            ))}

            {errors.tiered_pricing && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.tiered_pricing}</Text>
            )}
          </View>
        )}

        {/* Tags */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>Compétences/Tags</Text>
          <View style={styles.tagInputContainer}>
            <Input
              value={currentTag}
              onChangeText={setCurrentTag}
              placeholder="Ajouter une compétence..."
              style={styles.tagInput}
              testID="service-tag-input"
            />
            <Button
              title="+"
              onPress={addTag}
              variant="secondary"
              size="small"
              disabled={!currentTag.trim()}
              testID="add-service-tag-button"
            />
          </View>
          <View style={styles.tagsContainer}>
            {formData.tags.map(tag => (
              <TouchableOpacity key={tag} onPress={() => removeTag(tag)} testID={`service-tag-${tag}`}>
                <Badge>{tag}</Badge>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upload portfolio (placeholder) */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>Portfolio</Text>
          <View style={[styles.uploadPlaceholder, { backgroundColor: theme.colors.surfaceVariant }]}>
            <Text style={[styles.uploadText, { color: theme.colors.onSurfaceVariant }]}>
              Upload Portfolio (exemples de travaux) - À implémenter
            </Text>
          </View>
        </View>

        {/* Submit Button */}
        <Button
          title="Publier le Service"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
          testID="submit-service-button"
        />
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
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  pricingTypeContainer: {
    gap: 12,
  },
  pricingTypeButton: {
    padding: 16,
    borderRadius: 8,
  },
  pricingTypeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  pricingTypeDescription: {
    fontSize: 12,
  },
  fixedPricingContainer: {
    gap: 16,
  },
  priceInputContainer: {
    flex: 1,
  },
  unitContainer: {
    flex: 1,
  },
  configLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  unitButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  unitButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  unitButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  tieredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tierContainer: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tierTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  removeTierButton: {
    padding: 4,
  },
  removeTierText: {
    fontSize: 12,
  },
  tierFields: {
    gap: 12,
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
  uploadPlaceholder: {
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
