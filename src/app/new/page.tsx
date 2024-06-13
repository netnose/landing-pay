"use client";

import { Details } from "@/components/Details";
import { Logo } from "@/components/Logo";
import { PaymentData } from "@/components/PaymentData";
import { PaymentSettings } from "@/components/PaymentSettings";
import { RecipientSettings } from "@/components/RecipientSettings";
import { ThemeSettings } from "@/components/ThemeSettings";
import { Wizard } from "@/components/Wizard";
import { usePaymentOptionsReducer } from "@/hooks/usePaymentOptionsReducer";
import Head from "next/head";
import { useState } from "react";

export default function NewPayment() {
  const [paymentOptions, updatePaymentOptions] = usePaymentOptionsReducer();
  const [recipientError, setRecipientError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const canProceed = (step: number) => {
    switch (step) {
      case 1:
        const errorRecipient = !paymentOptions.toAddress
        setRecipientError(errorRecipient);
        return !errorRecipient;
      case 2:
        const errorPrice = !paymentOptions.amount || paymentOptions.amount === '0';
        setPriceError(errorPrice);
        return !errorPrice;
      default: return true;
    }
  };

  return (
    <main className={paymentOptions?.theme ?? ''}>
      <Head>
        <title>Create a new Landing Pay</title>
        <meta name="description" content="Anybody can create a Landing Pay and get paid in crypto" />
        <meta name="og:title" content="Create a new Landing Pay" />
      </Head>
      <Logo paymentOptions={paymentOptions} />
      <Wizard nextLabel="Next" prevLabel={<><span className="soft">Want to change something? </span>Go back</>} canProceed={canProceed}>
        <ThemeSettings paymentOptions={paymentOptions} updatePaymentOptions={updatePaymentOptions} />
        <RecipientSettings paymentOptions={paymentOptions} updatePaymentOptions={updatePaymentOptions} error={recipientError} />
        <PaymentSettings paymentOptions={paymentOptions} updatePaymentOptions={updatePaymentOptions} error={priceError} />
        <>
          <PaymentData paymentOptions={paymentOptions} />
          <Details paymentOptions={paymentOptions} updatePaymentOptions={updatePaymentOptions} />
        </>
      </Wizard>
    </main>
  );
}

export const runtime = 'edge';
