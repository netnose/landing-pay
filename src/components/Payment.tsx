import { PaymentOptions } from "@/hooks/usePaymentOptions";
import { PaymentData } from "./PaymentData";
import { useState } from "react";
import { Intro } from "./Intro";
import { Connect } from "./Connect";
import { Providers } from "@/app/Providers";
import { Transact } from "./Transact";

export function Payment({
  paymentOptions
}: {
  paymentOptions: PaymentOptions
}) {
  const [step, setStep] = useState<string>('intro');

  return <section className="payment">
    <PaymentData paymentOptions={paymentOptions} compressed={step !== 'intro'} />
    <Providers>
      {step === 'intro' && <Intro paymentOptions={paymentOptions} setStep={setStep} />}
      {step === 'connect' && <Connect setStep={setStep} />}
      {step === 'transact' && <Transact paymentOptions={paymentOptions} setStep={setStep} />}
    </Providers>
  </section>;
}
