import "../styles/globals.css";
import type {AppProps} from "next/app";
import {ThemeProvider} from "next-themes";
import {AppLayout} from "../components";
import {Provider} from "react-redux";
import store from "../services/store/store";

function PodnomsPagesApp({Component, pageProps}: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="lofi">
        <AppLayout>
          <Component {...pageProps} domain={pageProps.domain}/>
        </AppLayout>
      </ThemeProvider>
    </Provider>
  );
}

export default PodnomsPagesApp;
