import { Logo } from "@/components/Logo";
import { Payment } from "@/components/Payment";
import { decodePaymentOptions } from "@/utils/payment-options";
import { getTheme } from "@/utils/themes";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { getFrameMetadata } from "@coinbase/onchainkit/core";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: { options: string }
}): Promise<Metadata> {
  const paymentOptions = await decodePaymentOptions(params.options);

  let currentTitle = 'Landing Pay';
  if (paymentOptions?.toName) {
    currentTitle = paymentOptions.toName + ' - ' + currentTitle;
  }
  if (paymentOptions?.description) {
    currentTitle = paymentOptions.description + ' - ' + currentTitle;
  }

  const requestCtx = getRequestContext();
  const frameData = getFrameMetadata({
    image: requestCtx.env.SITE_URL + '/og/image/' + params.options,
    buttons: [
      {
        action: 'tx',
        label: paymentOptions?.buttonVerb ?? 'Pay',
        target: requestCtx.env.SITE_URL + '/og/frame/tx/' + params.options,
        postUrl: requestCtx.env.SITE_URL + '/og/frame/tx-status/pending'
      }
    ]
  });

  return {
    title: currentTitle,
    description: "Pay with crypto the easy way",
    openGraph: {
      title: currentTitle,
      description: "Pay with crypto the easy way",
      images: [requestCtx.env.SITE_URL + '/og/image/' + params.options]
    },
    other: {
      ...frameData
    }
  }
}

export default async function Pay({
  params
}: {
  params: { options: string }
}) {
  const paymentOptions = await decodePaymentOptions(params.options);

  return (
    <main style={{'--background': getTheme(paymentOptions?.theme)} as React.CSSProperties}>
      <Logo paymentOptions={paymentOptions} />
      {paymentOptions && <Payment paymentOptions={paymentOptions} />}
    </main>
  );
}

export const runtime = 'edge';
