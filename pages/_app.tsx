import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider defaultTheme="valentine">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="text-xl normal-case btn btn-ghost">PodNoms Pages</a>
          </div>
          <div className="flex-none gap-2">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered"
              />
            </div>
          </div>
        </div>
        <main className="px-6">
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
