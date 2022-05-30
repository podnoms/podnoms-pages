import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { AppLayout, ThemeChanger } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider defaultTheme="valentine">
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
