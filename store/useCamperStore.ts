import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CamperState {
  items: any[];
  currentCamper: any | null;
  total: number;
  favorites: string[];
  isLoading: boolean;

  // Екшени для даних
  fetchCampers: (params: {
    page: number;
    limit: number;
    [key: string]: any;
  }) => Promise<void>;
  fetchCamperById: (id: string) => Promise<void>;

  // Допоміжні екшени
  toggleFavorite: (id: string) => void;
  resetItems: () => void;
  setLoading: (status: boolean) => void;
  setItems: (items: any[], isNewSearch: boolean) => void;
  setTotal: (total: number) => void;
}

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const useCamperStore = create<CamperState>()(
  persist(
    (set, get) => ({
      items: [],
      currentCamper: null,
      total: 0,
      favorites: [],
      isLoading: false,

      // 1. Завантаження списку кемперів (з фільтрами та пагінацією)
      fetchCampers: async ({
        page,
        limit,
        isNewSearch = false, // Витягуємо це окремо
        ...filters // Тут залишаться ТІЛЬКИ фільтри для API
      }) => {
        set({ isLoading: true });

        try {
          const url = new URL(BASE_URL);

          url.searchParams.set("page", String(page));
          url.searchParams.set("limit", String(limit));

          // Додаємо тільки ті фільтри, які реально існують у базі
          Object.entries(filters).forEach(([key, value]) => {
            if (
              value !== "" &&
              value !== null &&
              value !== undefined &&
              value !== false
            ) {
              url.searchParams.set(key, String(value));
            }
          });

          console.log("🔗 Clean Request URL:", url.toString());

          const res = await fetch(url.toString());

          if (res.status === 404) {
            if (isNewSearch) set({ items: [], total: 0 });
            return;
          }

          if (!res.ok) throw new Error(`HTTP ${res.status}`);

          const data = await res.json();

          // ГАРАНТІЯ: MockAPI може повернути масив або об'єкт з items
          const fetchedItems = Array.isArray(data) ? data : data.items || [];
          // Для MockAPI total зазвичай 32, якщо він не повертає його явно
          const totalCount = data.total || 32;

          set((state) => ({
            items: isNewSearch
              ? fetchedItems
              : [...state.items, ...fetchedItems],
            total: isNewSearch ? totalCount : state.total,
          }));
        } catch (error: any) {
          console.error("❌ Fetch error:", error.message);
          if (isNewSearch) set({ items: [], total: 0 });
        } finally {
          set({ isLoading: false });
        }
      },

      // 2. Завантаження одного кемпера за ID
      fetchCamperById: async (id: string) => {
        set({ isLoading: true, currentCamper: null });
        try {
          const res = await fetch(`${BASE_URL}/${id}`);
          if (!res.ok) throw new Error("Camper not found");
          const data = await res.json();
          set({ currentCamper: data });
        } catch (error) {
          console.error("Fetch one error:", error);
          set({ currentCamper: null });
        } finally {
          set({ isLoading: false });
        }
      },

      // 3. Робота з обраним (LocalStorage)
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),

      // Інші сетери (якщо знадобляться для ручного керування)
      setItems: (newItems, isNewSearch) =>
        set((state) => ({
          items: isNewSearch ? newItems : [...state.items, ...newItems],
        })),

      setTotal: (total) => set({ total }),

      setLoading: (status) => set({ isLoading: status }),

      resetItems: () => set({ items: [], total: 0 }),
    }),
    {
      name: "camper-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ favorites: state.favorites }), // Зберігаємо тільки масив ID
    }
  )
);
