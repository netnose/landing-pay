import { PaymentOptions } from '@/types/PaymentOptions';
import { decodePaymentOptions } from '@/utils/payment-options';
import { getTheme } from '@/utils/themes';
import { getToken } from '@/utils/token';
import { ImageResponse } from 'next/og';
import { formatUnits } from 'viem';

function logoOrEmoji(paymentOptions: PaymentOptions) {
  let logo = paymentOptions.logo;
  if (logo?.startsWith('ipfs://')) {
    logo = 'https://ipfs.io/ipfs/' + logo.substring(7);
  } else if (logo?.startsWith('ar://')) {
    logo = 'https://arweave.net/' + logo.substring(5);
  }

  if (paymentOptions.logo) {
    return <div style={{display: 'flex', flexGrow: 1, alignItems: 'center', maxWidth: '400px'}}><img src={logo} alt="" /></div>;
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
  const token = getToken(paymentOptions?.token);

  let price;
  try {
    if (paymentOptions.amount && token.decimals) {
      price = formatUnits(BigInt(paymentOptions.amount), token.decimals);
    }
  }
  catch { }
  return new ImageResponse(
    (
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          background: getTheme(paymentOptions?.theme),
          fontSize: 40,
          color: 'black',
          width: '100%',
          height: '100%',
          padding: '16px'
        }}
      >
        {logoOrEmoji(paymentOptions)}
        <section style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgb(0, 0, 0)',
          borderRadius: '16px',
          color: 'rgb(255, 255, 255)',
          width: '100%',
          padding: '16px 24px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            {paymentOptions.toName && <div style={{fontSize: '1.2em'}}>{paymentOptions.toName}</div>}
            {paymentOptions.description && <div>{paymentOptions.description}</div>}
          </div>
          {price && token.symbol && <div style={{
            display: 'flex',
            gap: '.1em',
            fontSize: '1.5em'
          }}>{price} <span className="symbol">{token.symbol}</span></div>}
        </section>
      </main>
    ),
    {
      width: 1200,
      height: 630,

    }
  );
}

export const runtime = 'edge';
