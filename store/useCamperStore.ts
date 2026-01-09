import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CamperState {
  items: any[];
  total: number;
  favorites: string[]; // Масив ID обраних кемперів
  isLoading: boolean;

  // Екшени
  setItems: (items: any[], isNewSearch: boolean) => void;
  setTotal: (total: number) => void;
  toggleFavorite: (id: string) => void;
  setLoading: (status: boolean) => void;
  resetItems: () => void;
}

export const useCamperStore = create<CamperState>()(
  persist(
    (set) => ({
      items: [],
      total: 0,
      favorites: [],
      isLoading: false,

      setItems: (newItems, isNewSearch) =>
        set((state) => ({
          items: isNewSearch ? newItems : [...state.items, ...newItems],
        })),

      setTotal: (total) => set({ total }),

      setLoading: (status) => set({ isLoading: status }),

      resetItems: () => set({ items: [], total: 0 }),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),
    }),
    {
      name: "camper-storage", // Назва ключа в LocalStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ favorites: state.favorites }), // Зберігаємо ТІЛЬКИ обране
    }
  )
);
