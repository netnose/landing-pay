"use client";

import { Providers } from "@/components/Providers";
import { PaymentOptions } from "@/types/PaymentOptions";
import { useState } from "react";
import { Connect } from "./Connect";
import { Intro } from "./Intro";
import { PaymentData } from "./PaymentData";
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
