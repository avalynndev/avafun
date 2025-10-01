import productReducer from "@/redux/productSlicer";
import { configureStore } from "@reduxjs/toolkit";

export const createStore = () => {
  return configureStore({
    reducer: {
      product: productReducer,
    },
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
