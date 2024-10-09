"use client";

import { useRef } from "react";
import { AppStore, createStore } from "@/redux/store";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = createStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
