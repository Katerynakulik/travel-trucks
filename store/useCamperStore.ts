import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CamperState {
  items: any[];
  currentCamper: any | null;
  total: number;
  favorites: string[]; // Масив ID обраних кемперів
  isLoading: boolean;

  // Екшени
  setItems: (items: any[], isNewSearch: boolean) => void;
  setTotal: (total: number) => void;
  toggleFavorite: (id: string) => void;
  setLoading: (status: boolean) => void;
  resetItems: () => void;
  fetchCamperById: (id: string) => Promise<void>;
}

export const useCamperStore = create<CamperState>()(
  persist(
    (set) => ({
      items: [],
      currentCamper: null,
      total: 0,
      favorites: [],
      isLoading: false,
      fetchCamperById: async (id: string) => {
        set({ isLoading: true, currentCamper: null }); // Скидаємо перед завантаженням
        try {
          const res = await fetch(
            `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`
          );
          if (!res.ok) throw new Error("Not found");
          const data = await res.json();
          set({ currentCamper: data });
        } catch (error) {
          console.error(error);
          set({ currentCamper: null });
        } finally {
          set({ isLoading: false });
        }
      },
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
