
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface FilterOptions {
  productTypes: Array<{ name: string; count: number }>;
  colors: Array<{ name: string; count: number }>;
  materials: Array<{ name: string; count: number }>;
  ringStyles?: Array<{ name: string; count: number }>;
  chainTypes?: Array<{ name: string; count: number }>;
}

export const useProductFilters = (tableName: string) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    productTypes: [],
    colors: [],
    materials: [],
    ringStyles: [],
    chainTypes: []
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from(tableName as any)
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error(`Error fetching ${tableName}:`, error);
          return;
        }

        setProducts(data || []);
        generateFilters(data || []);
      } catch (error) {
        console.error(`Error fetching ${tableName}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [tableName]);

  const generateFilters = (productData: any[]) => {
    const productTypeCounts = new Map();
    const colorCounts = new Map();
    const materialCounts = new Map();
    const ringStyleCounts = new Map();
    const chainTypeCounts = new Map();

    productData.forEach(product => {
      // Count product types
      if (product.product_type) {
        productTypeCounts.set(
          product.product_type,
          (productTypeCounts.get(product.product_type) || 0) + 1
        );
      }

      // Count colors
      if (product.color) {
        colorCounts.set(
          product.color,
          (colorCounts.get(product.color) || 0) + 1
        );
      }

      // Count materials
      if (product.material) {
        materialCounts.set(
          product.material,
          (materialCounts.get(product.material) || 0) + 1
        );
      }

      // Count ring styles (if exists)
      if (product.style) {
        ringStyleCounts.set(
          product.style,
          (ringStyleCounts.get(product.style) || 0) + 1
        );
      }

      // Count chain types (if exists)
      if (product.chain_type) {
        chainTypeCounts.set(
          product.chain_type,
          (chainTypeCounts.get(product.chain_type) || 0) + 1
        );
      }
    });

    const newFilters: FilterOptions = {
      productTypes: Array.from(productTypeCounts.entries()).map(([name, count]) => ({ name, count })),
      colors: Array.from(colorCounts.entries()).map(([name, count]) => ({ name, count })),
      materials: Array.from(materialCounts.entries()).map(([name, count]) => ({ name, count })),
      ringStyles: Array.from(ringStyleCounts.entries()).map(([name, count]) => ({ name, count })),
      chainTypes: Array.from(chainTypeCounts.entries()).map(([name, count]) => ({ name, count }))
    };

    setFilters(newFilters);
  };

  return { products, filters, loading };
};
