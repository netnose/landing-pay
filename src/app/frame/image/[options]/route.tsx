import { PaymentOptions } from '@/types/PaymentOptions';
import { decodePaymentOptions } from '@/utils/payment-options';
import { getTheme } from '@/utils/themes';
import { ImageResponse } from 'next/og';

function logoOrEmoji(paymentOptions: PaymentOptions) {
  let logo = paymentOptions.logo;
  if (logo?.startsWith('ipfs://')) {
    logo = 'https://ipfs.io/ipfs/' + logo.substring(7);
  } else if (logo?.startsWith('ar://')) {
    logo = 'https://arweave.net/' + logo.substring(5);
  }

  if (paymentOptions.logo) {
    return <div style={{display: 'flex', flexGrow: 1, alignItems: 'center', maxWidth: '300px'}}><img src={logo} alt="" /></div>;
  } else if (paymentOptions?.emoji) {
    return <div style={{display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center', maxWidth: '300px', fontSize: '6rem'}}>{paymentOptions.emoji}</div>;
  }
  return <></>;
}
 
export async function GET(
  request: Request, {
    params
  }: {
    params: { options: string }
  }) {
  const paymentOptions = await decodePaymentOptions(params.options);
  return new ImageResponse(
    (
      <main
        style={{
          background: getTheme(paymentOptions?.theme),
          fontSize: 40,
          color: 'black',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {logoOrEmoji(paymentOptions)}
      </main>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

export const runtime = 'edge';
