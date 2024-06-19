import { PaymentOptions } from "@/types/PaymentOptions";
import { Dispatch } from "react";
import { RecipientAddress } from "./RecipientAddress";
import { Providers } from "./Providers";

export function RecipientSettings({
  paymentOptions,
  updatePaymentOptions,
  error
}: {
  paymentOptions: PaymentOptions,
  updatePaymentOptions: Dispatch<PaymentOptions>,
  error: boolean
}) {
  return <section className="recipient-setting">
    <h1 className="title">Recipient</h1>
    <label className="label" htmlFor="recipient-name">Name</label>
    <input type="text" id="recipient-name" name="recipient-name" value={paymentOptions.toName ?? ''} onChange={(e) => { updatePaymentOptions({ toName: e.target.value }); }} placeholder="Jesse Pollak"></input>
    <Providers>
      <RecipientAddress paymentOptions={paymentOptions} updatePaymentOptions={updatePaymentOptions} error={error} />
    </Providers>
  </section>
}