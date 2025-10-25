import React, { useState } from 'react';
import { View, ViewStyle, ScrollView } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { Input, Text } from '../../../components/atoms';
import { RatingStars } from '../../../components/molecules';

export interface RatingFormProps {
  productTitle: string;
  onSubmit: (data: RatingFormData) => void;
  loading?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export interface RatingFormData {
  rating: number;
  comment?: string;
}

export const RatingForm: React.FC<RatingFormProps> = ({ productTitle, onSubmit, loading = false, style, testID }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState<Partial<RatingFormData>>({
    rating: 0,
    comment: '',
  });

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleCommentChange = (comment: string) => {
    setFormData(prev => ({ ...prev, comment }));
  };

  const handleSubmit = () => {
    if (formData.rating && formData.rating > 0) {
      onSubmit(formData as RatingFormData);
    }
  };

  const isFormValid = formData.rating && formData.rating > 0;

  return (
    <ScrollView style={[{ flex: 1 }, style]} testID={testID}>
      <View style={{ padding: 16 }}>
        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Title style={{ marginBottom: 16 }}>Noter votre achat</Title>
            <Text variant="body2" style={{ marginBottom: 16 }}>
              Comment évaluez-vous "{productTitle}" ?
            </Text>

            <View style={{ alignItems: 'center', marginBottom: 24 }}>
              <RatingStars
                rating={formData.rating ?? 0}
                onRatingChange={handleRatingChange}
                size={32}
                readonly={false}
              />
              <Text variant="body2" style={{ marginTop: 8, color: theme.colors.onSurfaceVariant }}>
                {formData.rating === 0 && 'Sélectionnez une note'}
                {formData.rating === 1 && 'Très décevant'}
                {formData.rating === 2 && 'Décevant'}
                {formData.rating === 3 && 'Correct'}
                {formData.rating === 4 && 'Très bien'}
                {formData.rating === 5 && 'Excellent'}
              </Text>
            </View>

            <Input
              label="Commentaire (optionnel)"
              placeholder="Partagez votre expérience..."
              value={formData.comment || ''}
              onChangeText={handleCommentChange}
              multiline
              numberOfLines={4}
              style={{ marginBottom: 16 }}
            />

            <Button mode="contained" onPress={handleSubmit} loading={loading} disabled={!isFormValid || loading}>
              Envoyer la note
            </Button>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Title style={{ marginBottom: 16 }}>Pourquoi noter ?</Title>
            <View style={{ marginBottom: 12 }}>
              <Text variant="body2" style={{ fontWeight: '600', marginBottom: 4 }}>
                🎯 Aidez les autres
              </Text>
              <Text variant="body2" style={{ color: theme.colors.onSurfaceVariant }}>
                Votre avis aide les autres utilisateurs à faire leur choix.
              </Text>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text variant="body2" style={{ fontWeight: '600', marginBottom: 4 }}>
                Améliorez la qualité
              </Text>
              <Text variant="body2" style={{ color: theme.colors.onSurfaceVariant }}>
                Les notes encouragent les créateurs à proposer du contenu de qualité.
              </Text>
            </View>
            <View>
              <Text variant="body2" style={{ fontWeight: '600', marginBottom: 4 }}>
                🤝 Communauté
              </Text>
              <Text variant="body2" style={{ color: theme.colors.onSurfaceVariant }}>
                Participez à la construction d'une communauté musicale de confiance.
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};
