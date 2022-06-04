import "../styles/globals.css";
import type {AppProps} from "next/app";
import {ThemeProvider} from "next-themes";
import {AppLayout} from "../components";
import {Provider} from "react-redux";
import store from "../services/store/store";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="valentine">
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
