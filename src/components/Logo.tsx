import { PaymentOptions } from "@/types/PaymentOptions";

export function Logo({
  paymentOptions
}: {
  paymentOptions: PaymentOptions
}) {
  let logo = paymentOptions.logo;
  if (logo?.startsWith('ipfs://')) {
    logo = 'https://ipfs.io/ipfs/' + logo.substring(7);
  } else if (logo?.startsWith('ar://')) {
    logo = 'https://arweave.net/' + logo.substring(5);
  }

  if (paymentOptions?.logo) {
    return <div className="logo">
      <img src={logo} alt="" />
    </div>;
  } else if (paymentOptions?.emoji) {
    return <div className="logo emoji">{paymentOptions.emoji}</div>;
  }
  return '';
}
