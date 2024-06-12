import { PaymentOptions } from "@/types/PaymentOptions";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { isValidButtonVerb, validButtonVerbs } from "./button-verbs";

export async function decodePaymentOptions(options: string): Promise<PaymentOptions> {
  let decodedOptions: PaymentOptions = {};
  try {
    if (options.length <= 64) {
      try {
        const shortUrls = getRequestContext().env.SHORTURLS;
        const foundOptions = await shortUrls.get(options);
        if (foundOptions !== null) {
          options = foundOptions;
        }
      }
      catch {}
    }
    const json = atob(options);
    decodedOptions = JSON.parse(json) as PaymentOptions;
    if (!isValidButtonVerb(decodedOptions?.buttonVerb)) {
      decodedOptions.buttonVerb = validButtonVerbs[0] ?? 'Pay';
    }
  }
  catch {}

  return decodedOptions;
}
