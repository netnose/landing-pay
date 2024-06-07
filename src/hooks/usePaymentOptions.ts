import { PaymentOptions } from "@/types/PaymentOptions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
