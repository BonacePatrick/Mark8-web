import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { fetchProducts, fetchProductById } from "@/services/api-client";
import { useAuthStore } from "../auth-stores/authStore";

interface Store {
  id: string;
  name: string;
  logoUrl: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  thumbnail: string[];
  category: {
    id: string;
    name: string;
  };
  reviews: {
    rating: number;
    comment: string;
  }[];
  store: Store;
}

interface ProductsResponse {
  status: number;
  message: string;
  data: {
    products: Product[];
    pagination: {
      totalPages: number;
      recordsPerPage: number;
      totalRecords: number;
      currentPage: number;
    };
  };
}

interface ProductDetailResponse {
  status: number;
  message: string;
  data: Product;
}

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  savedProducts: Product[];
  totalProducts: number;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  category: string;
  currentPage: number;
  hasNextPage: boolean;

  fetchProducts: (serverSideToken?: string) => Promise<void>;
  fetchProductById: (id: string, serverSideToken?: string) => Promise<void>;
  loadMoreProducts: () => Promise<void>;
  resetProducts: () => void;
  clearSearchAndFetch: () => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  saveProduct: (product: Product) => void;
  removeSavedProduct: (productId: string) => void;
  isSaved: (productId: string) => boolean;
  getSavedProductsCount: () => number;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      currentProduct: null,
      savedProducts: [],
      totalProducts: 0,
      isLoading: false,
      error: null,
      searchQuery: "",
      category: "all",
      currentPage: 1,
      hasNextPage: true,

      searchProducts: async (query: string) => {
        set({ searchQuery: query, currentPage: 1, products: [], isLoading: true, error: null });
        try {
          const response: ProductsResponse = await fetchProducts(
            {
              pageNumber: 1,
              recordsPerPage: 9,
              name: query,
            },
            useAuthStore.getState()?.accessToken ?? ""
          );

          set({
            products: response.data.products,
            totalProducts: response.data.pagination.totalRecords,
            currentPage: response.data.pagination.currentPage,
            hasNextPage:
              response.data.pagination.currentPage <
              response.data.pagination.totalPages,
            isLoading: false,
          });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      setSearchQuery: (query) =>
        set({ searchQuery: query, currentPage: 1, products: [] }),
      setCategory: (category) =>
        set({ category, currentPage: 1, products: [] }),

      fetchProducts: async (serverSideToken?: string) => {
        const { searchQuery, category, currentPage } = get();
        set({ isLoading: true, error: null });
        try {
          const response: ProductsResponse = await fetchProducts(
            {
              pageNumber: currentPage,
              recordsPerPage: 9,
              name: searchQuery,
              category: category !== "all" ? category : undefined,
            },
            serverSideToken || (useAuthStore.getState()?.accessToken ?? "")
          );

          set((state) => ({
            products:
              currentPage === 1
                ? response.data.products
                : [...state.products, ...response.data.products],
            totalProducts: response.data.pagination.totalRecords,
            currentPage: response.data.pagination.currentPage,
            hasNextPage:
              response.data.pagination.currentPage <
              response.data.pagination.totalPages,
            isLoading: false,
          }));
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      fetchProductById: async (id: string, serverSideToken?: string) => {
        set({ isLoading: true, error: null });
        try {
          const response: ProductDetailResponse = await fetchProductById(
            id,
            serverSideToken || (useAuthStore.getState()?.accessToken ?? "")
          );
          set({ currentProduct: response.data, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      loadMoreProducts: async () => {
        const { hasNextPage, currentPage } = get();
        if (hasNextPage) {
          set({ currentPage: currentPage + 1 });
          await get().fetchProducts();
        }
      },

      resetProducts: () =>
        set({ products: [], currentPage: 1, hasNextPage: true }),

      clearSearchAndFetch: async () => {
        set({ searchQuery: "", category: "all", currentPage: 1, products: [] });
        await get().fetchProducts();
      },

      saveProduct: (product: Product) => {
        set((state) => ({
          savedProducts: [...state.savedProducts, product],
        }));
      },

      removeSavedProduct: (productId: string) => {
        set((state) => ({
          savedProducts: state.savedProducts.filter((p) => p.id !== productId),
        }));
      },

      isSaved: (productId: string) => {
        return get().savedProducts.some((p) => p.id === productId);
      },

      getSavedProductsCount: () => {
        return get().savedProducts.length;
      },
    }),
    {
      name: "product-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ savedProducts: state.savedProducts }),
    }
  )
);
