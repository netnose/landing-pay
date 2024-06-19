import { PaymentOptions } from "@/types/PaymentOptions";
import base64url from "base64url";
import { Dispatch, useState } from "react";

export function Details({
  paymentOptions,
  updatePaymentOptions
}: {
  paymentOptions: PaymentOptions,
  updatePaymentOptions: Dispatch<PaymentOptions>
}) {
  const [shortLinkCache, setShortLinkCache] = useState<{ url: string, data: string }>();

  const preview = () => {
    const options = base64url.encode(JSON.stringify(paymentOptions));
    window.open(window.location.origin + '/pay/' + options);
  };

  const shortLink = async () => {
    try {
      const data = JSON.stringify(paymentOptions);
      let url = '';
      if (shortLinkCache && shortLinkCache.data === data) {
        url = shortLinkCache.url;
      }
      else {
        const sl = await fetch(window.location.origin + '/short-link', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: data
        });
        if (!sl.ok) {
          alert('Something went wrong');
          return;
        }
        const json = await sl.json() as { url: string };
        url = json.url;
        setShortLinkCache({ url, data });
      }
      if (navigator.canShare && navigator.canShare({ url })) {  
        navigator.share({ url });
      } else {
        window.open(url);
      }
    }
    catch {}
  };

  return <section className="details">
    <label className="title" htmlFor="details">Details</label>
    <textarea id="details" name="details" rows={3} value={paymentOptions.details} onChange={(e) => { updatePaymentOptions({ details: e.target.value }); }} placeholder="Details about this payment or donation"></textarea>
    <button type="button" onClick={preview}>Preview</button>
    <button type="button" onClick={shortLink}>{navigator.canShare && navigator.canShare({ url: window.location.origin }) ? 'Share' : 'Open'} short link</button>
  </section>
}