import { create } from "zustand";

interface CartStore {
  count: number;
  items: Array<{ id: string; qty: number }>;
  addItem: (id: string) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  count: 1,
  items: [{ id: "prod-1", qty: 1 }],
  addItem: (id: string) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === id);
      let newItems;
      if (existing) {
        newItems = state.items.map((i) =>
          i.id === id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        newItems = [...state.items, { id, qty: 1 }];
      }
      return {
        count: state.count + 1,
        items: newItems,
      };
    }),
}));
