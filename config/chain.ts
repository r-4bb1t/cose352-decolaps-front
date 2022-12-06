import { ChainInfo } from "@keplr-wallet/types";
import { Bech32Address } from "@keplr-wallet/cosmos";

export const chainInfo: ChainInfo = {
  rpc: "http://0.0.0.0:26657",
  rest: "http://0.0.0.0:1317",
  chainId: "decolaps-testnet-1",
  chainName: "Decolaps",
  stakeCurrency: {
    coinDenom: "DECO",
    coinMinimalDenom: "udeco",
    coinDecimals: 6,
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "decolaps",
    bech32PrefixAccPub: "decolaps" + "pub",
    bech32PrefixValAddr: "decolaps" + "valoper",
    bech32PrefixValPub: "decolaps" + "valoperpub",
    bech32PrefixConsAddr: "decolaps" + "valcons",
    bech32PrefixConsPub: "decolaps" + "valconspub",
  },
  currencies: [
    {
      coinDenom: "DECO",
      coinMinimalDenom: "udeco",
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "DECO",
      coinMinimalDenom: "udeco",
      coinDecimals: 6,
    },
  ],
  features: ["stargate", "ibc-transfer"],
};
