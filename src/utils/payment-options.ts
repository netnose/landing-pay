import { PaymentOptions } from "@/types/PaymentOptions";
import { getRequestContext } from "@cloudflare/next-on-pages";

export async function decodePaymentOptions(options: string): Promise<PaymentOptions> {
  let decodedOptions = {};
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
    decodedOptions = JSON.parse(json);
  }
  catch {}

  return decodedOptions;
}
