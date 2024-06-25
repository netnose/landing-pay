import { PaymentOptions } from "@/types/PaymentOptions";
import { Dispatch, useEffect, useState } from "react";

export function ShortLink({
  paymentOptions,
  shortLinkCache,
  setShortLinkCache
}: {
  paymentOptions: PaymentOptions,
  shortLinkCache: { url: string, data: string },
  setShortLinkCache: Dispatch<{ url: string, data: string }>
}) {
  const [shortLink, setShortLink] = useState<string>();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setShortLink(undefined);
    const data = JSON.stringify(paymentOptions);
    if (shortLinkCache && shortLinkCache.data === data) {
      setShortLink(shortLinkCache.url);
    }
    else {
      fetch(window.location.origin + '/short-link', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: data
      }).then((sl) => {
        if (!sl.ok) {
          throw 'Something went wrong';
        }
        return sl.json();
      }).then((json) => {
        const jsonData = json as { url: string };
        setShortLinkCache({ url: jsonData.url, data });
        setShortLink(jsonData.url);
      }).catch(() => {
        alert('Something went wrong');
      });
    }
  }, [paymentOptions, setShortLink]);

  const copy = async () => {
    if (!shortLink) return;
    const type = "text/plain";
    const blob = new Blob([shortLink], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    await navigator.clipboard.write(data);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const share = () => {
    navigator.share({ url: shortLink });
  };

  return <section className="short-link">
    <h1 className="title">Your short link is</h1>
    {!shortLink && <div className="link">Loading...</div>}
    {shortLink && <>
      <a className="link" href={shortLink} target="_blank">{shortLink}</a>
      <div className="buttons">
        {navigator && navigator.clipboard && <button type="button" onClick={copy}>{copied ? 'Copied!' : 'Copy'}</button>}
        {navigator && navigator.canShare && navigator.canShare({ url: shortLink }) && <button type="button" onClick={share}>Share</button>}
      </div>
    </>}
  </section>
}