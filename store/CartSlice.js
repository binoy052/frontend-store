import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [],
//   totalAmount: 0,
// };
const items = localStorage.getItem("cart");
let initialState;
if (items) {
  // console.log(JSON.parse(items));
  // initialState = {
  //   items: [],
  //   totalAmount: 0,
  // };
  initialState = JSON.parse(items);
} else {
  initialState = {
    items: [],
    totalAmount: 0,
  };
}

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.totalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const existingCartItem = state.items[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };

        state.items[existingCartItemIndex] = updatedItem;
      } else {
        state.items = state.items.concat(action.payload);
      }
    },
    removeItem: (state, action) => {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const existingItem = state.items[existingCartItemIndex];

      state.totalAmount = state.totalAmount - existingItem.price;

      if (existingItem.amount === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        state.items = [...state.items];
        state.items[existingCartItemIndex] = updatedItem;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const cartActions = CartSlice.actions;
export default CartSlice;
