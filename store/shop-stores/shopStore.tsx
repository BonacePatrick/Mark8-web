import { create } from "zustand";
import { fetchStores, fetchProducts, fetchStoreById } from "@/services/api-client";

export interface Store {
  id: string;
  name: string;
  numberOfProducts: number;
  logoUrl: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface StoreState {
  stores: Store[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  searchQuery: string;
  category: string;
  currentPage: number;
  fetchStoreById: (id: string) => Promise<Store | null>;
  searchStores: (query: string) => Promise<void>;
  totalStores: () => number;
  setStores: (stores: Store[]) => void;
  setSearchTerm: (term: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  fetchTopStores: () => Promise<void>;
  getFilteredStores: () => Store[];
  loadMoreStores: () => Promise<void>;
  getTopProducts: (storeId: string) => Promise<Product[]>;
  clearSearchAndFetch: () => Promise<void>;
  setCategory: (category: string) => void;
  resetStores: () => void;
  searchStore: (query: string) => Promise<Store[]>;
  resetStore: () => void;
  currentStore: Store | null;
  fetchSingleStore: (id: string) => Promise<void>;
}

export const useShopStore = create<StoreState>((set, get) => ({
  stores: [],
  searchTerm: "",
  isLoading: false,
  error: null,
  page: 1,
  hasMore: true,
  searchQuery: "",
  category: "all",
  currentPage: 1,
  currentStore: null,
  totalStores: () => get().stores.length,
  resetStores: () => set({ stores: [], currentPage: 1, hasMore: true }),

  setStores: (stores) => set({ stores }),
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().searchStores(term);
  },
  setCategory: (category) => set({ category, currentPage: 1, stores: [] }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  fetchStoreById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchStores(`id=${id}`);
      if (response && Array.isArray(response.data.stores) && response.data.stores.length > 0) {
        const store = response.data.stores[0];
        return {
          id: store.id,
          name: store.name,
          numberOfProducts: store.numberOfProducts || 0,
          logoUrl: store.image || "",
          description: store.description || "",
          rating: store.rating,
          reviewCount: store.reviewCount,
        };
      }
      return null;
    } catch (error: any) {
      set({
        error: error.message || "An error occurred while fetching the store",
      });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  searchStores: async (query: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchStores(`name=${query}&pageNumber=1&recordsPerPage=10&sortBy=createdAt&sortOrder=DESC`);
      if (response && Array.isArray(response.data.stores)) {
        const storesData = response.data.stores.map((item: any) => ({
          id: item.id,
          name: item.name,
          numberOfProducts: item.numberOfProducts || 0,
          logoUrl: item.image || "",
          description: item.description || "",
          rating: item.rating,
          reviewCount: item.reviewCount,
        }));
        set({
          stores: storesData,
          hasMore: storesData.length === 10,
        });
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error: any) {
      set({
        error: error.message || "An error occurred while searching stores",
        stores: [],
      });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchTopStores: async () => {
    const { page, searchTerm } = get();
    set({ isLoading: true, error: null });
    try {
      const query = new URLSearchParams({
        name: searchTerm,
        pageNumber: page.toString(),
        recordsPerPage: "10",
        sortBy: "createdAt",
        sortOrder: "DESC",
      }).toString();

      const response = await fetchStores(query);
      if (response && Array.isArray(response.data.stores)) {
        const storesData = response.data.stores.map((item: any) => ({
          id: item.id,
          name: item.name,
          numberOfProducts: item.numberOfProducts || 0,
          logoUrl: item.image || "",
          description: item.description || "",
          rating: item.rating,
          reviewCount: item.reviewCount,
        }));
        set((state) => ({
          stores: page === 1 ? storesData : [...state.stores, ...storesData],
          hasMore: storesData.length === 10,
        }));
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error: any) {
      set({
        error: error.message || "An error occurred while fetching stores",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  getFilteredStores: () => {
    const { stores, searchTerm } = get();
    if (!searchTerm.trim()) return stores;
    const lowercasedTerm = searchTerm.toLowerCase().trim();
    return stores.filter((store) =>
      store.name.toLowerCase().includes(lowercasedTerm)
    );
  },

  loadMoreStores: async () => {
    const { page } = get();
    set({ page: page + 1 });
    await get().fetchTopStores();
  },

  clearSearchAndFetch: async () => {
    set({ 
      searchTerm: "", 
      searchQuery: "", 
      category: "all", 
      currentPage: 1, 
      stores: [],
      page: 1,
      hasMore: true
    });
    await get().fetchTopStores();
  },

  getTopProducts: async (storeId: string) => {
    try {
      const response = await fetchProducts({
        pageNumber: 1,
        recordsPerPage: 3,
        name: "",
        category: "",
        minUnitPrice: 0,
        maxUnitPrice: 0,
        sortBy: "",
        sortOrder: "ASC",
        storeId,
      });
      return response.data.products;
    } catch (error) {
      console.error("Error fetching top products:", error);
      return [];
    }
  },
  // Fetch store from General search input
  searchStore: async (query: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchStores(`name=${query}&pageNumber=1&recordsPerPage=10&sortBy=createdAt&sortOrder=DESC`);
      if (response && Array.isArray(response.data.stores)) {
        const storesData = response.data.stores.map((item: any) => ({
          id: item.id,
          name: item.name,
          numberOfProducts: item.numberOfProducts || 0,
          logoUrl: item.image || "",
          description: item.description || "",
          rating: item.rating,
          reviewCount: item.reviewCount,
        }));
        set({
          stores: storesData,
          hasMore: storesData.length === 10,
          isLoading: false,
          searchTerm: query,
        });
        return storesData;
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error: any) {
      set({
        error: error.message || "An error occurred while searching stores",
        stores: [],
        isLoading: false,
      });
      return [];
    }
  },
  fetchSingleStore: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchStoreById(id);
      if (response && response.data) {
        const store = response.data;
        set({
          currentStore: {
            id: store.id,
            name: store.name,
            numberOfProducts: store.numberOfProducts || 0,
            logoUrl: store.image || "",
            description: store.description || "",
            rating: store.rating,
            reviewCount: store.reviewCount,
          },
        });
      } else {
        throw new Error("Store not found");
      }
    } catch (error: any) {
      set({
        error: error.message || "An error occurred while fetching the store",
        currentStore: null,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  resetStore: () => {
    set({
      stores: [],
      hasMore: false,
      isLoading: false,
      error: null,
      searchTerm: "",
    });
  },
}));