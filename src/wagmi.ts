import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      preference: "all",
      appName: 'LandingPay',
      appLogoUrl: process.env.NEXT_PUBLIC_SITE_URL + '/logo.jpg'
    }),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WCPROJID ?? '',
      metadata: {
        name: 'LandingPay',
        description: 'Pay with crypto the easy way',
        url: process.env.NEXT_PUBLIC_SITE_URL ?? '',
        icons: [process.env.NEXT_PUBLIC_SITE_URL + '/logo.jpg']
      }
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
