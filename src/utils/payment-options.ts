import { PaymentOptions } from "@/types/PaymentOptions";

export function decodePaymentOptions(options: string): PaymentOptions {
  let decodedOptions = {};
  try {
    const json = atob(options);
    decodedOptions = JSON.parse(json);
  }
  catch {}

  return decodedOptions;
}
