import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from 'react-native-paper';
import { ProductUploadForm } from '../../products/components/ProductUploadForm';
import { ServiceUploadForm } from '../../services/components/ServiceUploadForm';
import { useAuth } from '../../auth/hooks/useAuth';

type ActiveTab = 'product' | 'service';

interface ProductFormData {
  title: string;
  description: string;
  genre: string;
  bpm?: number;
  tags: string[];
  licenses: {
    type: 'basic' | 'non_exclusive' | 'exclusive' | 'lease';
    price: number;
    terms: string;
    is_available: boolean;
  }[];
}

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

export const UploadFormContainer: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('product');
  const [loading, setLoading] = useState(false);

  const canSell = user?.capabilities?.can_sell;
  const canOfferServices = user?.capabilities?.can_boost;

  const handleProductSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      console.log('Product data:', data);
      // TODO: API call quand backend ready
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simuler API call

      Alert.alert('Succès', 'Votre produit a été soumis pour validation', [{ text: 'OK' }]);
    } catch {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la soumission', [{ text: 'OK' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSubmit = async (data: ServiceFormData) => {
    setLoading(true);
    try {
      console.log('Service data:', data);
      // TODO: API call quand backend ready
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simuler API call

      Alert.alert('Succès', 'Votre service a été publié', [{ text: 'OK' }]);
    } catch {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la publication', [{ text: 'OK' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleTabPress = (tab: ActiveTab) => {
    if (tab === 'product' && !canSell) {
      Alert.alert('Capacité requise', 'Vous devez activer votre compte vendeur pour publier des produits', [
        { text: 'OK' },
      ]);
      return;
    }

    if (tab === 'service' && !canOfferServices) {
      Alert.alert('Capacité requise', 'Vous devez activer votre compte prestataire pour publier des services', [
        { text: 'OK' },
      ]);
      return;
    }

    setActiveTab(tab);
  };

  const renderCapabilityMessage = (type: 'product' | 'service') => {
    const isProduct = type === 'product';
    const capability = isProduct ? canSell : canOfferServices;
    const title = isProduct ? 'Vendeur' : 'Créateur de services';
    const description = isProduct
      ? 'Pour publier des beats, samples et kits'
      : 'Pour proposer des services (mixage, mastering, etc.)';

    if (!capability) {
      return (
        <View style={styles.capabilityMessage}>
          <Text style={[styles.capabilityTitle, { color: theme.colors.onSurface }]}>Compte {title} requis</Text>
          <Text style={[styles.capabilityDescription, { color: theme.colors.onSurfaceVariant }]}>{description}</Text>
          <TouchableOpacity
            style={[styles.activateButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => {
              Alert.alert('Activation', `Contactez l'administrateur pour activer votre compte ${title.toLowerCase()}`, [
                { text: 'OK' },
              ]);
            }}
          >
            <Text style={[styles.activateButtonText, { color: theme.colors.onPrimary }]}>
              Activer le compte {title}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            {
              backgroundColor: activeTab === 'product' ? theme.colors.primary : theme.colors.surfaceVariant,
            },
          ]}
          onPress={() => handleTabPress('product')}
          disabled={loading}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === 'product' ? theme.colors.onPrimary : theme.colors.onSurfaceVariant,
              },
            ]}
          >
            Produit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            {
              backgroundColor: activeTab === 'service' ? theme.colors.primary : theme.colors.surfaceVariant,
            },
          ]}
          onPress={() => handleTabPress('service')}
          disabled={loading}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === 'service' ? theme.colors.onPrimary : theme.colors.onSurfaceVariant,
              },
            ]}
          >
            Service
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'product' && (
          <>
            {!canSell ? (
              renderCapabilityMessage('product')
            ) : (
              <ProductUploadForm onSubmit={handleProductSubmit} loading={loading} />
            )}
          </>
        )}

        {activeTab === 'service' && (
          <>
            {!canOfferServices ? (
              renderCapabilityMessage('service')
            ) : (
              <ServiceUploadForm onSubmit={handleServiceSubmit} loading={loading} />
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  capabilityMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  capabilityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  capabilityDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  activateButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  activateButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
