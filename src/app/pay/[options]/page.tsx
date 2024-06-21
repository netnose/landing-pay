import { Logo } from "@/components/Logo";
import { Payment } from "@/components/Payment";
import { decodePaymentOptions } from "@/utils/payment-options";
import { getTheme } from "@/utils/themes";
import { getFrameMetadata } from "@coinbase/onchainkit/core";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params
}: {
  params: { options: string }
}): Promise<Metadata> {
  const paymentOptions = await decodePaymentOptions(params.options);

  let currentTitle = 'LandingPay';
  if (paymentOptions?.toName) {
    currentTitle = paymentOptions.toName + ' - ' + currentTitle;
  }
  if (paymentOptions?.description) {
    currentTitle = paymentOptions.description + ' - ' + currentTitle;
  }

  const frameData = getFrameMetadata({
    image: process.env.NEXT_PUBLIC_SITE_URL + '/og/image/' + params.options,
    buttons: [
      {
        action: 'tx',
        label: paymentOptions?.buttonVerb ?? 'Pay',
        target: process.env.NEXT_PUBLIC_SITE_URL + '/og/frame/tx/' + params.options,
        postUrl: process.env.NEXT_PUBLIC_SITE_URL + '/og/frame/tx/status/' + paymentOptions?.theme + '/pending'
      }
    ]
  });

  return {
    title: currentTitle,
    description: "Pay with crypto the easy way",
    openGraph: {
      title: currentTitle,
      description: "Pay with crypto the easy way",
      images: [process.env.NEXT_PUBLIC_SITE_URL + '/og/image/' + params.options]
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
  if (!paymentOptions) return notFound();

  return (
    <main style={{'--background': getTheme(paymentOptions?.theme).backgroundColor} as React.CSSProperties}>
      <Logo paymentOptions={paymentOptions} />
      {paymentOptions && <Payment paymentOptions={paymentOptions} />}
    </main>
  );
}

export const runtime = 'edge';
