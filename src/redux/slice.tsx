import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  images: string[];
  displayPrice: {
    priceRange: {
      from: number;
      to: number;
    };
  };
  company: {
    name: string;
    slug: string;
  };
  address: {
    fullAddress: string;
  };
  configuration: string[];
}

type CartState = CartItem[];

const initialState: CartState = [];

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<CartItem>) {
      state.push(action.payload);
    },
    removeCartItem(state, action: PayloadAction<string>) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addCartItem, removeCartItem } = CartSlice.actions;

export default CartSlice.reducer;
