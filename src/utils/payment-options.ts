import { PaymentOptions } from "@/types/PaymentOptions";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { isValidButtonVerb, validButtonVerbs } from "./button-verbs";
import base64url from "base64url";
import { availableEmojis, getThemes } from "./themes";

export async function decodePaymentOptions(options: string): Promise<PaymentOptions | undefined> {
  let decodedOptions: PaymentOptions = {};
  try {
    if (options.length <= 64) {
      try {
        const shortUrls = getRequestContext().env.SHORTURLS;
        const foundOptions = await shortUrls.get(options);
        if (foundOptions !== null) {
          options = foundOptions;
        }
        else {
          return;
        }
      }
      catch {
        return;
      }
    }
    try {
      const json = base64url.decode(options, 'utf8');
      decodedOptions = JSON.parse(json) as PaymentOptions;
    }
    catch {
      return;
    }
    const availableThemes = getThemes();
    if (availableThemes.indexOf(decodedOptions.theme ?? '') === -1) {
      decodedOptions.theme = availableThemes[0] ?? 'based';
    }
    if (availableEmojis.indexOf(decodedOptions.emoji ?? '') === -1) {
      decodedOptions.emoji = availableEmojis[0] ?? '😎';
    }
    if (!isValidButtonVerb(decodedOptions?.buttonVerb)) {
      decodedOptions.buttonVerb = validButtonVerbs[0] ?? 'Pay';
    }
  }
  catch {}

  return decodedOptions;
}
