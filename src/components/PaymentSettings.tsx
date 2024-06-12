import { PaymentOptions } from "@/types/PaymentOptions";
import { validButtonVerbs } from "@/utils/button-verbs";
import { Dispatch } from "react";
import { PriceField } from "./PriceField";

export function PaymentSettings({
  paymentOptions,
  updatePaymentOptions
}: {
  paymentOptions: PaymentOptions,
  updatePaymentOptions: Dispatch<PaymentOptions>
}) {
  return <section className="payment-setting">
    <h1 className="title">Payment details</h1>
    <h2 className="label">Recipient Name</h2>
    <input type="text" name="recipient-name" value={paymentOptions.toName ?? ''} onChange={(e) => {
      const toName = e.target.value;
      updatePaymentOptions({ toName })
    }} placeholder="Jesse Pollak"></input>
    <h2 className="label">Description</h2>
    <input type="text" name="description" value={paymentOptions.description ?? ''} onChange={(e) => {
      const description = e.target.value;
      updatePaymentOptions({ description })
    }} placeholder="Order #69420, Donation"></input>
    <h2 className="label">Price</h2>
    <PriceField paymentOptions={paymentOptions} updatePaymentOptions={updatePaymentOptions} />
    <h2 className="label">Button label</h2>
    <select name="button-verb" value={paymentOptions.buttonVerb} onChange={(e) => {
      const buttonVerb = e.target.value;
      updatePaymentOptions({ buttonVerb })
    }}>
      {validButtonVerbs.map((verb) => <option key={verb} value={verb}>{verb}</option>)}
    </select>
  </section>
}