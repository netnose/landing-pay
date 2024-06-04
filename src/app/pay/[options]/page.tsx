"use client";

import { Payment } from "@/components/Payment";
import { usePaymentOptions } from "@/hooks/usePaymentOptions";

export default function Pay() {
  const paymentOptions = usePaymentOptions();

  let backgroundStyle: { background?: string } = {};
  if (paymentOptions.background) {
    backgroundStyle['background'] = paymentOptions.background;
  }

  return (
    <main style={backgroundStyle}>
      { paymentOptions.logo && <div className="logo"><img src={paymentOptions.logo} alt="" /></div> }
      <Payment paymentOptions={paymentOptions} />
    </main>
  );
}