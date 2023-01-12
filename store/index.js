import CartSlice from "./CartSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { cart: CartSlice.reducer },
});

export default store;
