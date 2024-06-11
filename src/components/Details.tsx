import { PaymentOptions } from "@/types/PaymentOptions";
import { Dispatch } from "react";

export function Details({
  paymentOptions,
  updatePaymentOptions
}: {
  paymentOptions: PaymentOptions,
  updatePaymentOptions: Dispatch<PaymentOptions>
}) {
  return <section className="details">
    <h1 className="title">Details</h1>
    <button type="button">Preview</button>
    <button type="button">Get short link</button>
  </section>
}