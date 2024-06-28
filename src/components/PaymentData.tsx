import { PaymentOptions } from "@/types/PaymentOptions";
import { getPrice } from "@/utils/price";
import { getToken } from "@/utils/token";
import { formatUnits } from "viem";

export function PaymentData({
  paymentOptions,
  compressed
}: {
  paymentOptions: PaymentOptions,
  compressed?: boolean
}) {
  const token = getToken(paymentOptions?.token);
  const price = getPrice(paymentOptions?.amount, token);

  let className = 'payment-data';
  if (compressed) {
    className += ' compressed';
  }

  return <section className={className}>
    {paymentOptions.toName && <div className="to-name">{paymentOptions.toName}</div>}
    {price && token.symbol && <div className="price">{price} <span className="symbol">{token.symbol}</span></div>}
    {paymentOptions.description && <div className="description">{paymentOptions.description}</div>}
  </section>;
}
