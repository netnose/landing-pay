import { PaymentOptions } from "@/types/PaymentOptions";
import { availableEmojis, getTheme, getThemes } from "@/utils/themes";
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
      {getThemes().map((theme) => <button key={theme} type="button" className="theme" style={{'--background': getTheme(theme)} as React.CSSProperties} onClick={() => { updatePaymentOptions({ theme }); }}></button>)}
    </section>
    <h2 className="label">Logo Image URL...</h2>
    <input type="text" name="logo" value={paymentOptions.logo} onChange={(e) => { updatePaymentOptions({ logo: e.target.value }); }} placeholder="https://, ipfs://, ar://"></input>
    <h2 className="label">...or Emoji</h2>
    <section className="emojis">
      {availableEmojis.map((emoji) => {
        const classNane = 'emoji ' + (emoji === paymentOptions.emoji ? ' selected' : '');
        return <button key={emoji} className={classNane} style={{'--background': getTheme(paymentOptions.theme)} as React.CSSProperties} onClick={() => { updatePaymentOptions({ emoji }) }}>{emoji}</button>
      })}
    </section>
  </section>
}