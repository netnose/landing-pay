"use client";

import { Payment } from "@/components/Payment";
import { usePaymentOptions } from "@/hooks/usePaymentOptions";

export default function Pay() {
  const paymentOptions = usePaymentOptions();

  return (
    <main className={paymentOptions?.theme ?? ''}>
      { paymentOptions?.logo && <div className="logo"><img src={paymentOptions.logo} alt="" /></div> }
      { paymentOptions && <Payment paymentOptions={paymentOptions} />}
    </main>
  );
}