import { supabase } from './supabase';
import { Product, products as dummyProducts } from './products';

const dummyShopProducts = dummyProducts.filter((product) => product.type === 'ready');
const dummyCollectionItems = dummyProducts.filter((product) => product.type === 'custom');
const featuredDummyProducts = dummyProducts.filter((product) =>
    ["Bestseller", "Featured", "Most Popular", "Top Rated", "Festive Pick"].includes(product.tag)
);

export const api = {
    // Shop Products API
    async getShopProducts() {
        try {
            const { data, error } = await supabase
                .from('shop_products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching shop products:', error);
                return dummyShopProducts as Product[];
            }

            if (!data || data.length === 0) {
                return dummyShopProducts as Product[];
            }

            return data as Product[];
        } catch (e) {
            console.error('Unexpected error in getShopProducts:', e);
            return dummyShopProducts as Product[];
        }
    },

    async getShopProduct(slug: string) {
        try {
            const { data, error } = await supabase
                .from('shop_products')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) {
                console.error('Error fetching shop product:', error);
                const fallbackProduct = dummyShopProducts.find((product) => product.slug === slug);
                if (fallbackProduct) return fallbackProduct;
                throw error;
            }

            return data as Product;
        } catch (e) {
            console.error('Unexpected error in getShopProduct:', e);
            const fallbackProduct = dummyShopProducts.find((product) => product.slug === slug);
            if (fallbackProduct) return fallbackProduct;
            throw e;
        }
    },

    // Collection Items API
    async getCollectionItems() {
        const { data, error } = await supabase
            .from('collection_items')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching collection items:', error);
            return dummyCollectionItems as Product[];
        }

        if (!data || data.length === 0) {
            return dummyCollectionItems as Product[];
        }

        return data as Product[];
    },

    async getCollectionItem(slug: string) {
        const { data, error } = await supabase
            .from('collection_items')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) {
            console.error('Error fetching collection item:', error);
            const fallbackProduct = dummyCollectionItems.find((product) => product.slug === slug);
            if (fallbackProduct) return fallbackProduct;
            throw error;
        }

        return data as Product;
    },

    // Unified Product Fetcher (tries both tables)
    async getProduct(slug: string) {
        // Try Shop Products first
        const { data: shopData } = await supabase
            .from('shop_products')
            .select('*')
            .eq('slug', slug)
            .single();

        if (shopData) return { ...shopData, type: 'ready' } as Product;

        const fallbackShopProduct = dummyShopProducts.find((product) => product.slug === slug);
        if (fallbackShopProduct) return fallbackShopProduct;

        // Try Collection Items
        const { data: collectionData, error } = await supabase
            .from('collection_items')
            .select('*')
            .eq('slug', slug)
            .single();

        if (collectionData) {
            return { ...collectionData, type: 'custom' } as Product;
        }

        const fallbackCollectionProduct = dummyCollectionItems.find((product) => product.slug === slug);
        if (fallbackCollectionProduct) return fallbackCollectionProduct;

        if (error) {
            console.error('Error fetching product from both tables:', error);
            throw error;
        }

        throw new Error(`Product not found for slug: ${slug}`);
    },

    // Unified Products Fetcher (returns all)
    async getProducts() {
        try {
            // Fetch Shop Products
            const { data: shopData, error: shopError } = await supabase
                .from('shop_products')
                .select('*')
                .order('created_at', { ascending: false });

            // Fetch Collection Items
            const { data: collectionData, error: collectionError } = await supabase
                .from('collection_items')
                .select('*')
                .order('created_at', { ascending: false });

            if (shopError) console.error('Shop products error:', shopError);
            if (collectionError) console.error('Collection items error:', collectionError);

            const shopProducts = (shopData || []).map(p => ({ ...p, type: 'ready' }));
            const collectionItems = (collectionData || []).map(p => ({ ...p, type: 'custom' }));

            if (shopProducts.length === 0 && collectionItems.length === 0) {
                return dummyProducts as Product[];
            }

            return [...shopProducts, ...collectionItems] as Product[];
        } catch (e) {
            console.error('Unexpected error in getProducts:', e);
            return dummyProducts as Product[];
        }
            .select('*')
            .eq('is_featured', true);

        const { data: collectionData, error: collectionError } = await supabase
            .from('collection_items')
            .select('*')
            .eq('is_featured', true);

        if (shopError) throw shopError;
        if (collectionError) throw collectionError;

        // Combine and map types
        const shopProducts = (shopData || []).map(p => ({ ...p, type: 'ready' }));
        const collectionItems = (collectionData || []).map(p => ({ ...p, type: 'custom' }));

        if (shopProducts.length === 0 && collectionItems.length === 0) {
            return featuredDummyProducts as Product[];
        }

        return [...shopProducts, ...collectionItems] as Product[];
    }
};
