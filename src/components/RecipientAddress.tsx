import { PaymentOptions } from "@/types/PaymentOptions";
import { Dispatch, useEffect, useState } from "react";
import { isAddress } from "viem";
import { useAccount } from "wagmi";
import { Connect } from "./Connect";

export function RecipientAddress({
  paymentOptions,
  updatePaymentOptions
}: {
  paymentOptions: PaymentOptions,
  updatePaymentOptions: Dispatch<PaymentOptions>
}) {
  const [addressValue, setAddressValue] = useState<string>(paymentOptions?.toAddress ?? '');
  const { address } = useAccount();

  useEffect(() => {
    if (address && isAddress(address)) {
      updatePaymentOptions({ toAddress: address });
      setAddressValue(address);
    }
  }, [address, updatePaymentOptions]);

  return <div className="recipient-address">
    <h2 className="label">Recipient Address</h2>
    <input type="text" name="recipient-address" value={addressValue} onChange={(e) => {
      const toAddress = e.target.value;
      if (isAddress(toAddress)) {
        updatePaymentOptions({ toAddress })
      }
      setAddressValue(toAddress);
    }} placeholder="0x... or ENS"></input>
    <Connect />
  </div>;
}