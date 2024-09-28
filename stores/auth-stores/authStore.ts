import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { setCookies } from "@/cookieUtility";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

const isServer = typeof window === "undefined";

const getInitialState = () => ({
  accessToken: null,
  refreshToken: null,
  user: null,
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...getInitialState(),
      setTokens: (accessToken: string, refreshToken: string) => {
        set({ accessToken, refreshToken });
        if (!isServer) {
          setCookies(accessToken, refreshToken);
          localStorage.setItem("user-token", accessToken);
          localStorage.setItem("user-refresh-token", refreshToken);
        }
      },
      setUser: (user: User) => set({ user }),
      logout: () => {
        set(getInitialState());
        if (!isServer) {
          localStorage.removeItem("user-token");
          localStorage.removeItem("user-refresh-token");
          setCookies("", "");
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          if (isServer) return null;
          return localStorage.getItem(key);
        },
        setItem: (key, value) => {
          if (!isServer) {
            localStorage.setItem(key, value);
          }
        },
        removeItem: (key) => {
          if (!isServer) {
            localStorage.removeItem(key);
          }
        },
      })),
    }
  )
);