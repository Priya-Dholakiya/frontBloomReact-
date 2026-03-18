import { createSlice, nanoid } from "@reduxjs/toolkit";

const STORAGE_KEY = "stride_products";

const defaultProducts = [
  {
    id: "p1",
    name: "Urban Runner",
    brand: "Stride",
    category: "Running",
    price: 79.99,
    size: "9",
    color: "Black",
    imageUrl:
      "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
    description: "Lightweight running shoe built for daily training and comfort.",
  },
  {
    id: "p2",
    name: "Street Flex",
    brand: "Stride",
    category: "Casual",
    price: 64.99,
    size: "10",
    color: "White",
    imageUrl:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Stylish streetwear sneaker made for all-day wear.",
  },
  {
    id: "p3",
    name: "Trail Blazer",
    brand: "Stride",
    category: "Trail",
    price: 89.99,
    size: "11",
    color: "Green",
    imageUrl:
      "https://images.pexels.com/photos/1701509/pexels-photo-1701509.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Rugged trail shoe with grippy outsole for uneven terrain.",
  },
];

const loadFromStorage = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProducts;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return defaultProducts;
    return parsed;
  } catch (error) {
    console.warn("Failed to load products from localStorage", error);
    return defaultProducts;
  }
};

const saveToStorage = (products) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.warn("Failed to save products to localStorage", error);
  }
};

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: loadFromStorage(),
  },
  reducers: {
    addProduct: {
      reducer(state, action) {
        state.items.push(action.payload);
        saveToStorage(state.items);
      },
      prepare(product) {
        return {
          payload: {
            id: nanoid(),
            ...product,
          },
        };
      },
    },
    updateProduct(state, action) {
      const { id, changes } = action.payload;
      const idx = state.items.findIndex((p) => p.id === id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...changes };
        saveToStorage(state.items);
      }
    },
    deleteProduct(state, action) {
      state.items = state.items.filter((p) => p.id !== action.payload);
      saveToStorage(state.items);
    },
    resetProducts(state) {
      state.items = defaultProducts;
      saveToStorage(state.items);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct, resetProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
