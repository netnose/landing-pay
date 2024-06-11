import { PaymentOptions } from "@/types/PaymentOptions";
import { Dispatch } from "react";

export function PaymentSettings({
  paymentOptions,
  updatePaymentOptions
}: {
  paymentOptions: PaymentOptions,
  updatePaymentOptions: Dispatch<PaymentOptions>
}) {
  return <section className="payment-setting">
    <h1 className="title">Payment</h1>
  </section>
}