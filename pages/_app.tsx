import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import { global } from "../global";
import "../styles/global.css";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import {WalletProvider} from "../contexts/useWallet";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <WalletProvider>
        <Global styles={global} />
        <Component {...pageProps} />
      </WalletProvider>
    </SessionProvider>
  );
}

export default MyApp;
