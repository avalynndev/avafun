import products from "@/data/products.json";
import { createSlice } from "@reduxjs/toolkit";

const data = products.products;

const productSlice = createSlice({
  name: "product",
  initialState: {
    items: data,
    currentMoney: 100000000000,
    initialMoney: 100000000000,
  },
  reducers: {
    updateCount: (state, action) => {
      const { id, count } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.count = count;
      }

      let price = 0;

      state.items.map((item) => {
        price += Number(item.count) * Number(item.productPrice);
      });

      state.currentMoney = Number(state.initialMoney) - Number(price);
    },
  },
});

export const { updateCount } = productSlice.actions;
export default productSlice.reducer;
