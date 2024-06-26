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
    <label id="themes-label" className="label">Background color</label>
    <section className="themes" role="radiogroup" aria-labelledby="themes-label">
      {getThemes().map((theme) => <button key={theme} type="button" className="theme" role="radio" aria-checked={theme === paymentOptions.theme} aria-label={getTheme(theme).name} style={{'--background': getTheme(theme).backgroundColor} as React.CSSProperties} onClick={() => { updatePaymentOptions({ theme }); }}></button>)}
    </section>
    <label className="label" htmlFor="logo">Logo Image URL...</label>
    <input type="text" id="logo" name="logo" value={paymentOptions.logo} onChange={(e) => { updatePaymentOptions({ logo: e.target.value }); }} placeholder="https://, ipfs://, ar://"></input>
    <label id="emojis-label" className="label">...or Emoji</label>
    <section className="emojis" role="radiogroup" aria-labelledby="emojis-label">
      {availableEmojis.map((emoji) => {
        const classNane = 'emoji ' + (emoji === paymentOptions.emoji ? ' selected' : '');
        return <button key={emoji} className={classNane} role="radio" aria-checked={emoji === paymentOptions.emoji} style={{'--background': getTheme(paymentOptions.theme).backgroundColor} as React.CSSProperties} onClick={() => { updatePaymentOptions({ emoji }) }}>{emoji}</button>
      })}
    </section>
  </section>
}