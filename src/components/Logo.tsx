import { PaymentOptions } from "@/types/PaymentOptions";

export function Logo({
  paymentOptions
}: {
  paymentOptions: PaymentOptions
}) {
  if (paymentOptions?.logo) {
    return <div className="logo">
      <img src={paymentOptions.logo} alt="" />
    </div>;
  } else if (paymentOptions?.emoji) {
    return <div className="logo emoji">{paymentOptions.emoji}</div>;
  }
  return '';
}
