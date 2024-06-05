import { PaymentOptions } from "@/hooks/usePaymentOptions";
import { formatUnits } from "viem";

export function PaymentData({
  paymentOptions,
  compressed
}: {
  paymentOptions: PaymentOptions,
  compressed?: boolean
}) {
  let price;
  try {
    if (paymentOptions.amount && paymentOptions.token?.decimals) {
      price = formatUnits(BigInt(paymentOptions.amount), paymentOptions.token.decimals);
    }
  }
  catch { }

  let className = 'payment-data';
  if (compressed) {
    className += ' compressed';
  }

  return <section className={className}>
    {paymentOptions.toName && <div className="to-name">{paymentOptions.toName}</div>}
    {price && paymentOptions.token?.symbol && <div className="price">{price} <span className="symbol">{paymentOptions.token.symbol}</span></div>}
    {paymentOptions.description && <div className="description">{paymentOptions.description}</div>}
  </section>;
}
