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
    <label className="label">Background color</label>
    <section className="themes">
      {getThemes().map((theme) => <button key={theme} type="button" className="theme" aria-label={getTheme(theme).name} style={{'--background': getTheme(theme).backgroundColor} as React.CSSProperties} onClick={() => { updatePaymentOptions({ theme }); }}></button>)}
    </section>
    <label className="label" htmlFor="logo">Logo Image URL...</label>
    <input type="text" id="logo" name="logo" value={paymentOptions.logo} onChange={(e) => { updatePaymentOptions({ logo: e.target.value }); }} placeholder="https://, ipfs://, ar://"></input>
    <label className="label">...or Emoji</label>
    <section className="emojis">
      {availableEmojis.map((emoji) => {
        const classNane = 'emoji ' + (emoji === paymentOptions.emoji ? ' selected' : '');
        return <button key={emoji} className={classNane} style={{'--background': getTheme(paymentOptions.theme).backgroundColor} as React.CSSProperties} onClick={() => { updatePaymentOptions({ emoji }) }}>{emoji}</button>
      })}
    </section>
  </section>
}