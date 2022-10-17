import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import { global } from "../global";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={global} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
