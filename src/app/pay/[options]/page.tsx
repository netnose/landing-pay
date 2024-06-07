import { Payment } from "@/components/Payment";
import { decodePaymentOptions } from "@/utils/payment-options";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: { options: string }
}): Promise<Metadata> {
  const paymentOptions = decodePaymentOptions(params.options);

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

export default function Pay({
  params
}: {
  params: { options: string }
}) {
  const paymentOptions = decodePaymentOptions(params.options);

  return (
    <main className={paymentOptions?.theme ?? ''}>
      { paymentOptions?.logo && <div className="logo"><img src={paymentOptions.logo} alt="" /></div> }
      { paymentOptions && <Payment paymentOptions={paymentOptions} />}
    </main>
  );
}

export const runtime = 'edge';
