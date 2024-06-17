import { Logo } from "@/components/Logo";
import { Payment } from "@/components/Payment";
import { decodePaymentOptions } from "@/utils/payment-options";
import { getTheme } from "@/utils/themes";
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

  return {
    title: currentTitle,
    description: "Pay with crypto the easy way",
    openGraph: {
      title: currentTitle
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
