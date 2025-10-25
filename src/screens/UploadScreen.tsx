import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput, Card, Title, Paragraph, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';

export function UploadScreen() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    price: '',
    license: '',
    genre: '',
    bpm: '',
    description: '',
  });

  const handleSubmit = () => {
    console.log('Uploading product:', formData);
  };

  const canSell = (user?.capabilities as Record<string, boolean>)?.can_sell;

  if (!canSell) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centeredContent}>
          <Card style={styles.activationCard}>
            <Card.Content style={styles.activationContent}>
              <Text style={styles.activationEmoji}>🎵</Text>
              <Title style={styles.activationTitle}>Activez votre compte vendeur</Title>
              <Paragraph style={styles.activationDescription}>
                Pour publier vos créations, vous devez d'abord activer votre compte vendeur.
              </Paragraph>
              <Button mode="contained" style={styles.activationButton}>
                Activer la vente
              </Button>
            </Card.Content>
          </Card>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.formCard}>
          <Card.Content>
            <Title style={styles.formTitle}>Publier un produit</Title>

            <View style={styles.formContent}>
              {/* Title */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Titre du produit *</Text>
                <TextInput
                  mode="outlined"
                  placeholder="Ex: Mon Beat Afrobeat"
                  value={formData.title}
                  onChangeText={text => setFormData({ ...formData, title: text })}
                  style={styles.textInput}
                />
              </View>

              {/* Type */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Type de produit *</Text>
                <Surface style={styles.selectSurface}>
                  <Text style={styles.selectText}>
                    {formData.type ? formData.type.charAt(0).toUpperCase() + formData.type.slice(1) : 'Choisir le type'}
                  </Text>
                </Surface>
              </View>

              {/* Price */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Prix (FCFA) *</Text>
                <TextInput
                  mode="outlined"
                  placeholder="Ex: 15000"
                  value={formData.price}
                  onChangeText={text => setFormData({ ...formData, price: text })}
                  keyboardType="numeric"
                  style={styles.textInput}
                />
              </View>

              {/* License */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Type de licence</Text>
                <Surface style={styles.selectSurface}>
                  <Text style={styles.selectText}>
                    {formData.license
                      ? formData.license.charAt(0).toUpperCase() + formData.license.slice(1)
                      : 'Choisir la licence'}
                  </Text>
                </Surface>
              </View>

              {/* Genre */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Genre musical</Text>
                <TextInput
                  mode="outlined"
                  placeholder="Ex: Afrobeat, Trap, Mbalax"
                  value={formData.genre}
                  onChangeText={text => setFormData({ ...formData, genre: text })}
                  style={styles.textInput}
                />
              </View>

              {/* BPM */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>BPM</Text>
                <TextInput
                  mode="outlined"
                  placeholder="Ex: 120"
                  value={formData.bpm}
                  onChangeText={text => setFormData({ ...formData, bpm: text })}
                  keyboardType="numeric"
                  style={styles.textInput}
                />
              </View>

              {/* Description */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  mode="outlined"
                  placeholder="Décrivez votre produit..."
                  value={formData.description}
                  onChangeText={text => setFormData({ ...formData, description: text })}
                  multiline
                  numberOfLines={4}
                  style={styles.textArea}
                />
              </View>

              {/* Upload Buttons */}
              <View style={styles.uploadButtons}>
                <Button mode="outlined" style={styles.uploadButton}>
                  📁 Ajouter un fichier audio (30s max)
                </Button>
                <Button mode="outlined" style={styles.uploadButton}>
                  📁 Ajouter le fichier complet
                </Button>
              </View>

              {/* Submit Button */}
              <Button
                mode="contained"
                onPress={handleSubmit}
                disabled={!formData.title || !formData.price}
                style={styles.submitButton}
                contentStyle={styles.submitButtonContent}
              >
                Publier le produit
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  activationCard: {
    maxWidth: 400,
    width: '100%',
  },
  activationContent: {
    alignItems: 'center',
  },
  activationEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  activationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  activationDescription: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#6b7280',
  },
  activationButton: {
    marginTop: 8,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  formCard: {
    elevation: 2,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  formContent: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: 'white',
  },
  textArea: {
    backgroundColor: 'white',
    minHeight: 100,
  },
  selectSurface: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  selectText: {
    fontSize: 16,
    color: '#6b7280',
  },
  uploadButtons: {
    gap: 12,
  },
  uploadButton: {
    marginBottom: 8,
  },
  submitButton: {
    marginTop: 16,
  },
  submitButtonContent: {
    paddingVertical: 12,
  },
});
