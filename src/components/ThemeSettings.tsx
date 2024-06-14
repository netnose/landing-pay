import { PaymentOptions } from "@/types/PaymentOptions";
import { availableEmojis, availableThemes } from "@/utils/themes";
import { Dispatch } from "react";

export function ThemeSettings({
  paymentOptions,
  updatePaymentOptions
}: {
  paymentOptions: PaymentOptions,
  updatePaymentOptions: Dispatch<PaymentOptions>
}) {
  return <section className="theme">
    <h1 className="title">Choose the theme</h1>
    <h2 className="label">Background color</h2>
    <section className="themes">
      {availableThemes.map((theme) => {
        const classNane = 'theme ' + theme;
        return <button key={theme} type="button" className={classNane} onClick={() => { updatePaymentOptions({ theme }); }}></button>;
      })}
    </section>
    <h2 className="label">Logo Image URL...</h2>
    <input type="text" name="logo" value={paymentOptions.logo} onChange={(e) => { updatePaymentOptions({ logo: e.target.value }); }} placeholder="https://, ipfs://, ar://"></input>
    <h2 className="label">...or Emoji</h2>
    <section className="emojis">
      {availableEmojis.map((emoji) => {
        const classNane = 'emoji ' + paymentOptions.theme + (emoji === paymentOptions.emoji ? ' selected' : ''); 
        return <button key={emoji} className={classNane} onClick={() => { updatePaymentOptions({ emoji }) }}>{emoji}</button>
      })}
    </section>
  </section>
}