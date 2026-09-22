"use client";
import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/state/store";
import { PersistGate } from "redux-persist/integration/react";

const RootProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </>
  );
};

export default RootProviders;
