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
    <h2 className="label">Name</h2>
    <input type="text" name="recipient-name" value={paymentOptions.toName ?? ''} onChange={(e) => { updatePaymentOptions({ toName: e.target.value }); }} placeholder="Jesse Pollak"></input>
    <h2 className="label">Wallet Address</h2>
    <Providers>
        <RecipientAddress paymentOptions={paymentOptions} updatePaymentOptions={updatePaymentOptions} error={error} />
    </Providers>
  </section>
}