import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { ReactElement } from "react";
import { AppLayout } from "../components";
import { NextPageWithLayout } from "types/page-with-layout";
import store from "../services/store/store";

import "../styles/globals.css";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function PodnomsPagesApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page: ReactElement) => (
      <ThemeProvider defaultTheme="bumblebee" storageKey="__theme">
        <Toaster />
        <AppLayout>{page}</AppLayout>
      </ThemeProvider>
    ));
  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} domain={pageProps.domain} />)}
    </Provider>
  );
}

export default PodnomsPagesApp;
