import { PaymentOptions } from "@/types/PaymentOptions";
import { validButtonVerbs } from "@/utils/button-verbs";
import { Dispatch } from "react";
import { PriceField } from "./PriceField";

export function PaymentSettings({
  paymentOptions,
  updatePaymentOptions,
  error
}: {
  paymentOptions: PaymentOptions,
  updatePaymentOptions: Dispatch<PaymentOptions>,
  error: boolean
}) {
  return <section className="payment-setting">
    <h1 className="title">Payment details</h1>
    <h2 className="label">Description</h2>
    <input type="text" name="description" value={paymentOptions.description ?? ''} onChange={(e) => { updatePaymentOptions({ description: e.target.value }); }} placeholder="Order #69420, Donation"></input>
    <h2 className="label">Price</h2>
    <PriceField paymentOptions={paymentOptions} updatePaymentOptions={updatePaymentOptions} error={error} />
    <h2 className="label">Button label</h2>
    <select className="button-verb" name="button-verb" value={paymentOptions.buttonVerb} onChange={(e) => { updatePaymentOptions({ buttonVerb: e.target.value }); }}>
      {validButtonVerbs.map((verb) => <option key={verb} value={verb}>{verb}</option>)}
    </select>
  </section>
}