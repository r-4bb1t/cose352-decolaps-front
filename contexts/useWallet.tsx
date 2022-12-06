import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { Keplr } from "@keplr-wallet/types";
import { getKeplrFromWindow } from "@keplr-wallet/stores";
import { chainInfo } from "../config/chain";

interface Props {
  children: ReactNode;
}

const KeyAccountAutoConnect = "account_auto_connect";


export const WalletContext = createContext({});

export const useWallet = () =>
  useContext<{
    loading: boolean;
    keplr: Keplr | null;
    connectWallet: () => Promise<void>;
  }>(WalletContext as any);

export const WalletProvider = ({ children }: Props) => {
  const [keplr, setKeplr] = useState<Keplr | null>(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    setLoading(true);
    try {
      const newKeplr = await getKeplrFromWindow();
      if (!newKeplr) {
        throw new Error("Keplr extension not found");
      }

      await newKeplr.experimentalSuggestChain(chainInfo);
      await newKeplr.enable(chainInfo.chainId);

      localStorage?.setItem(KeyAccountAutoConnect, "true");
      setKeplr(newKeplr);

      console.log("login success");
    } catch (e) {
      setLoading(false);
      alert(e);
    }
  };

  useEffect(() => {
    const shouldAutoConnectAccount =
      localStorage?.getItem(KeyAccountAutoConnect) != null;
    if (shouldAutoConnectAccount) {
      connectWallet();
    }
  }, [keplr]);

  return (
    <WalletContext.Provider value={{ loading, keplr, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

