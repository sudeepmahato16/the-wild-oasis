"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

import { DarkModeProvider } from "@/context/DarkModeContext";
import { GlobalContextProvider } from "@/context/GlobalContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalContextProvider>
          <DarkModeProvider>
            <NextTopLoader showSpinner={false} color="#4f46e5" height={2.5} />
            {children}
            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 3000,
                },
                error: {
                  duration: 5000,
                },
                style: {
                  fontSize: "14px",
                  maxWidth: "500px",
                  backgroundColor: "#fff",
                  color: "#334155",
                },
              }}
            />
          </DarkModeProvider>
        </GlobalContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
