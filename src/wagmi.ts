import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      preference: "all"
    }),
    walletConnect({
      projectId: process.env.WCPROJID ?? ''
    })
  ],
  ssr: true,
  transports: {
    [base.id]: http()
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
