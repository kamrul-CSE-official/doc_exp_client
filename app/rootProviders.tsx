"use client";
import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/state/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";

const RootProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </PersistGate>
      </Provider>
    </>
  );
};

export default RootProviders;
