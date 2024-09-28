import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '@/store/auth-stores/authStore';

const API_URL = "https://api.mark8.awesomity.rw";

const apiClient = (serverSideToken?: string): AxiosInstance => {
  const api: AxiosInstance = axios.create({
    baseURL: API_URL,
  });

  api.interceptors.request.use(
    (config: any) => {
      const isServer = typeof window === 'undefined';
      let token: string | null = null;

      if (isServer && serverSideToken) {
        token = serverSideToken;
      } else if (!isServer) {
        token = useAuthStore.getState().accessToken;
      }

      config.headers = {
        ...config.headers,
        'Content-Type': config.data instanceof FormData ? 'multipart/form-data' : 'application/json',
        Accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      };

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = useAuthStore.getState().refreshToken;
          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          const response = await api.get(
            `${API_URL}/auth/get-new-access-token`,
            {
              headers: {
                "refresh-token": refreshToken,
              },
            }
          );

          const newAccessToken = response.data.data.accessToken;
          const newRefreshToken = response.data.data.refreshToken;

          useAuthStore.getState().setTokens(newAccessToken, newRefreshToken);

          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          }

          return api(originalRequest);
        } catch (refreshError) {
          console.error("Failed to refresh access token:", refreshError);
          useAuthStore.getState().logout();
          if (typeof window !== 'undefined') {
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};

// Fetch products
export const fetchProducts = async (params: {
  pageNumber?: number;
  recordsPerPage?: number;
  name?: string;
  category?: string;
  minUnitPrice?: number;
  maxUnitPrice?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  storeId?: string;
}, serverSideToken?: string) => {
  try {
    const validParams = {
      ...params,
      pageNumber: params.pageNumber ? Number(params.pageNumber) : undefined,
      recordsPerPage: params.recordsPerPage
        ? Number(params.recordsPerPage)
        : undefined,
    };

    const api = apiClient(serverSideToken);
    const response = await api.get("/products", { params: validParams });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch single product
export const fetchProductById = async (id: string, serverSideToken?: string) => {
  try {
    const api = apiClient(serverSideToken);
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

// Fetch stores
export const fetchStores = async (serverSideToken?: string) => {
  try {
    const api = apiClient(serverSideToken);
    const response = await api.get("/store");
    return response.data;
  } catch (error) {
    console.error("Error fetching stores:", error);
    throw error;
  }
};

// Fetch single store by id
export const fetchStoreById = async (id: string, serverSideToken?: string) => {
  try {
    const api = apiClient(serverSideToken);
    const response = await api.get(`/store/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching store by ID:", error);
    throw error;
  }
};


export default apiClient;