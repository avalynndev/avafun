"use client";

import type { AppDispatch, AppStore, RootState } from "@/redux/store";
import { useDispatch, useSelector, useStore } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
