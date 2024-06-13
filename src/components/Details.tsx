import { PaymentOptions } from "@/types/PaymentOptions";
import base64url from "base64url";
import { Dispatch } from "react";

export function Details({
  paymentOptions,
  updatePaymentOptions
}: {
  paymentOptions: PaymentOptions,
  updatePaymentOptions: Dispatch<PaymentOptions>
}) {
  const preview = () => {
    const options = base64url.encode(JSON.stringify(paymentOptions));
    window.open(window.location.origin + '/pay/' + options);
  };

  return <section className="details">
    <h1 className="title">Details</h1>
    <textarea rows={3} value={paymentOptions.details} onChange={(e) => { updatePaymentOptions({ details: e.target.value }); }}></textarea>
    <button type="button" onClick={preview}>Preview</button>
    <button type="button">Get short link</button>
  </section>
}