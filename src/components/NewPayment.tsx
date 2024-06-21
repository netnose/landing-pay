"use client";

import { Details } from "@/components/Details";
import { Logo } from "@/components/Logo";
import { PaymentData } from "@/components/PaymentData";
import { PaymentSettings } from "@/components/PaymentSettings";
import { RecipientSettings } from "@/components/RecipientSettings";
import { ThemeSettings } from "@/components/ThemeSettings";
import { Wizard } from "@/components/Wizard";
import { usePaymentOptionsReducer } from "@/hooks/usePaymentOptionsReducer";
import { getTheme } from "@/utils/themes";
import { useState } from "react";
import { ShortLink } from "./ShortLink";

export default function NewPayment() {
  const [paymentOptions, updatePaymentOptions] = usePaymentOptionsReducer();
  const [recipientError, setRecipientError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [shortLinkCache, setShortLinkCache] = useState<{ url: string, data: string }>({ url: '', data: ''});

  const getNextLabel = (step: number) => {
    if (step === 3) {
      return 'Get short link';
    } 
    return 'Next'
  };

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
    <main style={{'--background': getTheme(paymentOptions?.theme).backgroundColor} as React.CSSProperties}>
      <Logo paymentOptions={paymentOptions} />
      <Wizard nextLabel={getNextLabel} prevLabel={<><span className="soft">Want to change something? </span>Go back</>} canProceed={canProceed}>
        <ThemeSettings paymentOptions={paymentOptions} updatePaymentOptions={updatePaymentOptions} />
        <RecipientSettings paymentOptions={paymentOptions} updatePaymentOptions={updatePaymentOptions} error={recipientError} />
        <PaymentSettings paymentOptions={paymentOptions} updatePaymentOptions={updatePaymentOptions} error={priceError} />
        <>
          <PaymentData paymentOptions={paymentOptions} />
          <Details paymentOptions={paymentOptions} updatePaymentOptions={updatePaymentOptions} />
        </>
        <>
          <PaymentData paymentOptions={paymentOptions} />
          <ShortLink paymentOptions={paymentOptions} shortLinkCache={shortLinkCache} setShortLinkCache={setShortLinkCache} />
        </>
      </Wizard>
    </main>
  );
}
