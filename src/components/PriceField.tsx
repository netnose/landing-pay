import { PaymentOptions } from "@/types/PaymentOptions";
import { getToken, getTokens } from "@/utils/token";
import { TokenSelectDropdown } from "@coinbase/onchainkit/token";
import { Dispatch, useEffect, useState } from "react";
import { formatUnits, parseUnits } from "viem";

export function PriceField({
  paymentOptions,
  updatePaymentOptions,
  error
}: {
  paymentOptions: PaymentOptions,
  updatePaymentOptions: Dispatch<PaymentOptions>,
  error: boolean
}) {
  const [amount, setAmount] = useState('');
  const token = getToken(paymentOptions.token);
  const decimals = token?.decimals ?? 18;

  useEffect(() => {
    let formattedAmount = '';
    if (paymentOptions.amount) {
      formattedAmount = formatUnits(BigInt(paymentOptions.amount), decimals);
    }
    setAmount(formattedAmount);
  }, []);

  useEffect(() => {
    try {
      if (amount && amount !== '') {
        let parsedAmount = parseUnits(amount, decimals).toString();
        updatePaymentOptions({ amount: parsedAmount });
        console.log(parsedAmount);
      } else {
        updatePaymentOptions({ amount: '0' });
        console.log(0);
      }
    }
    catch {}
  }, [amount, decimals]);
  
  return <div className="price-field">
    <input type="text" className={error ? 'error' : ''} name="amount" value={amount} onChange={(e) => { setAmount(e.target.value.replace(',', '.').trim()) }}></input>
    <TokenSelectDropdown options={getTokens()} token={token} setToken={(t) => { updatePaymentOptions({ token: t.symbol.toLowerCase() })}}></TokenSelectDropdown>
  </div>
}
