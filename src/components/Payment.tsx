import { PaymentOptions } from "@/hooks/usePaymentOptions";
import { PaymentData } from "./PaymentData";

export function Payment({
  paymentOptions
}: {
  paymentOptions: PaymentOptions
}) {
  const handlePay = () => {};

  return <section className="payment">
    <PaymentData paymentOptions={paymentOptions} />
    <p className="details">{paymentOptions.details ?? ''}</p>
    <button type="button" onClick={handlePay}>{paymentOptions.buttonVerb ?? 'Pay'}</button>
  </section>;
}
