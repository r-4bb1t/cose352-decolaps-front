import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import { global } from "../global";
import "../styles/global.css";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Global styles={global} />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
