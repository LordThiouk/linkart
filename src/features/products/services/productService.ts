import { supabase } from '../../../utils/supabase/client';
import { ProductInsert, ProductUpdate } from '../../../types';

export interface CreateProductData extends Omit<ProductInsert, 'creator_id' | 'status'> {
  preview_file_key: string;
  full_file_key: string;
}

export interface UpdateProductData extends ProductUpdate {}

export class ProductService {
  static async createProduct(data: CreateProductData) {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Utilisateur non authentifié');

    const { data: product, error } = await supabase
      .from('products')
      .insert({
        ...data,
        creator_id: user.user.id,
        status: 'pending',
        is_boosted: false,
      })
      .select()
      .single();

    if (error) throw error;
    return product;
  }

  static async updateProduct(productId: string, data: UpdateProductData) {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Utilisateur non authentifié');

    const { data: product, error } = await supabase
      .from('products')
      .update(data)
      .eq('id', productId)
      .eq('creator_id', user.user.id)
      .select()
      .single();

    if (error) throw error;
    return product;
  }

  static async deleteProduct(productId: string) {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Utilisateur non authentifié');

    const { error } = await supabase.from('products').delete().eq('id', productId).eq('creator_id', user.user.id);

    if (error) throw error;
  }

  static async getProduct(productId: string) {
    const { data: product, error } = await supabase
      .from('products')
      .select(
        `
        *,
        creator:users!products_creator_id_fkey(
          id,
          name,
          avatar_url,
          rating,
          is_verified
        )
      `
      )
      .eq('id', productId)
      .single();

    if (error) throw error;
    return product;
  }

  static async getUserProducts() {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Utilisateur non authentifié');

    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('creator_id', user.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return products;
  }

  static async boostProduct(productId: string, duration: number) {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Utilisateur non authentifié');

    const boostExpiresAt = new Date();
    boostExpiresAt.setDate(boostExpiresAt.getDate() + duration);

    const { data: product, error } = await supabase
      .from('products')
      .update({
        is_boosted: true,
        boost_expires_at: boostExpiresAt.toISOString(),
      })
      .eq('id', productId)
      .eq('creator_id', user.user.id)
      .select()
      .single();

    if (error) throw error;
    return product;
  }

  static async getGenres() {
    const { data: genres, error } = await supabase
      .from('products')
      .select('genre')
      .eq('status', 'active')
      .not('genre', 'is', null);

    if (error) throw error;

    // Retourner les genres uniques
    const uniqueGenres = [...new Set(genres.map((g: { genre: string }) => g.genre))];
    return uniqueGenres;
  }

  static async getLicenses() {
    return ['Basic', 'Premium', 'Exclusive', 'Unlimited'];
  }
}
