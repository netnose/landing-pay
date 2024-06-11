"use client";

import { Details } from "@/components/Details";
import { Logo } from "@/components/Logo";
import { PaymentData } from "@/components/PaymentData";
import { PaymentSettings } from "@/components/PaymentSettings";
import { ThemeSettings } from "@/components/ThemeSettings";
import { Wizard } from "@/components/Wizard";
import { usePaymentOptionsReducer } from "@/hooks/usePaymentOptionsReducer";
import Head from "next/head";

export default function NewPayment() {
  const [paymentOptions, updatePaymentOptions] = usePaymentOptionsReducer();
  return (
    <main className={paymentOptions?.theme ?? ''}>
      <Head>
        <title>Create a new Landing Pay</title>
        <meta name="description" content="Anybody can create a Landing Pay and get paid in crypto" />
        <meta name="og:title" content="Create a new Landing Pay" />
      </Head>
      <Logo paymentOptions={paymentOptions} />
      <Wizard nextLabel="Next" prevLabel={<><span className="soft">Want to change something? </span>Go back</>}>
        <ThemeSettings paymentOptions={paymentOptions} updatePaymentOptions={updatePaymentOptions} />
        <PaymentSettings paymentOptions={paymentOptions} updatePaymentOptions={updatePaymentOptions} />
        <>
          <PaymentData paymentOptions={paymentOptions} />
          <Details paymentOptions={paymentOptions} updatePaymentOptions={updatePaymentOptions} />
        </>
      </Wizard>
    </main>
  );
}

export const runtime = 'edge';
