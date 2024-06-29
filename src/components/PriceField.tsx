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
      } else {
        updatePaymentOptions({ amount: '0' });
      }
    }
    catch {}
  }, [amount, decimals]);
  
  let className = 'price-field';
  if (error) {
    className += ' error';
  }

  return <>
    <label className="label" htmlFor="amount">Price</label>
    <div className={className}>
      <input type="text" id="amount" name="amount" value={amount} onChange={(e) => { setAmount(e.target.value.replace(',', '.').trim()) }}></input>
      <TokenSelectDropdown options={getTokens()} token={token} setToken={(t) => { updatePaymentOptions({ token: t.symbol.toLowerCase() })}}></TokenSelectDropdown>
    </div>
  </>;
}
