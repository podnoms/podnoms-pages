import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { AppLayout } from "../components";
import { Provider } from "react-redux";
import store from "../services/store/store";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import "../styles/globals.css";
import { NextPageWithLayout } from "types/page-with-layout";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function PodnomsPagesApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page: ReactElement) => (
      <ThemeProvider defaultTheme="bumblebee">
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
