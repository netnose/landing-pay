import { Token } from "@coinbase/onchainkit/token";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Address } from "viem";

export type PaymentOptions = {
  toName?: string;
  toAddress?: Address;
  logo?: string;
  theme?: string;
  description?: string;
  details?: string;
  buttonVerb?: string;
  amount?: string;
  token?: Partial<Token>;
};

export function usePaymentOptions() {
  const params = useParams<{ options: string }>();
  const [ options, setOptions ] = useState<PaymentOptions>();

  useEffect(() => {
    try {
      const json = atob(params.options);
      setOptions(JSON.parse(json));
    }
    catch {
      setOptions({});
    }
  }, [params.options]);

  return options;
}
