import { PaymentOptions } from "@/types/PaymentOptions";
import { Dispatch, useEffect, useState } from "react";
import { isAddress } from "viem";
import { useAccount, useDisconnect } from "wagmi";
import { Connect } from "./Connect";

export function RecipientAddress({
  paymentOptions,
  updatePaymentOptions,
  error
}: {
  paymentOptions: PaymentOptions,
  updatePaymentOptions: Dispatch<PaymentOptions>,
  error: boolean
}) {
  const [addressValue, setAddressValue] = useState<string>(paymentOptions?.toAddress ?? '');
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (address && isAddress(address)) {
      updatePaymentOptions({ toAddress: address });
      setAddressValue(address);
      disconnect();
    }
  }, [address, updatePaymentOptions]);

  return <section className="recipient-address">
    <input type="text" className={error ? 'error' : ''} name="recipient-address" value={addressValue} onChange={(e) => {
      const toAddress = e.target.value;
      if (isAddress(toAddress)) {
        updatePaymentOptions({ toAddress })
      }
      setAddressValue(toAddress);
    }} placeholder="0x..."></input>
    <Connect compact />
  </section>;
}