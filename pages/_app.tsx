import "../styles/globals.css";
import { SWRConfig } from "swr";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { lightTheme } from "../themes";
import { AuthProvider, CartProvider, UiProvider } from "../context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          refreshInterval: 86400,
          fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
        }}
      >
        <AuthProvider>
          <CartProvider>
            <UiProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline>
                  <Component {...pageProps} />
                </CssBaseline>
              </ThemeProvider>
            </UiProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
