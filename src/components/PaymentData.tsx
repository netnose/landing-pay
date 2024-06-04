import { PaymentOptions } from "@/hooks/usePaymentOptions";
import { formatUnits } from "viem";

export function PaymentData({
  paymentOptions
}: {
  paymentOptions: PaymentOptions
}) {
  let price;
  try {
    if (paymentOptions.amount && paymentOptions.token?.decimals) {
      price = formatUnits(BigInt(paymentOptions.amount), paymentOptions.token.decimals);
    }
  }
  catch { }

  return <section className="payment-data">
    {paymentOptions.toName && <div className="to-name">{paymentOptions.toName}</div>}
    {price && paymentOptions.token?.symbol && <div className="price">{price} <span className="symbol">{paymentOptions.token.symbol}</span></div>}
    {paymentOptions.description && <div className="">{paymentOptions.description}</div>}
  </section>;
}
