import { PaymentOptions } from '@/types/PaymentOptions';
import { decodePaymentOptions } from '@/utils/payment-options';
import { getPrice } from '@/utils/price';
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
  if (!paymentOptions) return Response.error();
  const fontRegular = await fetch(new URL('Inter-Regular.ttf', import.meta.url));
  const fontDataRegular = await fontRegular.arrayBuffer();
  const fontBold = await fetch(new URL('Inter-Bold.ttf', import.meta.url));
  const fontDataBold = await fontBold.arrayBuffer();

  const token = getToken(paymentOptions?.token);
  const price = getPrice(paymentOptions?.amount, token);
  const theme = getTheme(paymentOptions?.theme);
  const textShadow = theme.forcedContrast ? '1px 1px 20px rgb(0, 0, 0, .6)' : 'none';
  return new ImageResponse(
    (
      <main
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: theme.backgroundColor,
          color: theme.textColor,
          fontFamily: 'Inter',
          fontSize: 100,
          width: '100%',
          height: '100%',
          padding: '64px'
        }}
      >
        <section style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '.1em',
          alignItems: 'flex-start',
          justifyContent: 'center',
          maxWidth: '672px',
          paddingRight: '16px',
          textShadow
        }}>
          {paymentOptions.toName && <div style={{lineHeight: '1em', fontFamily: 'InterBold'}}>{paymentOptions.toName}</div>}
          {paymentOptions.description && <div style={{fontSize: '.6em'}}>{paymentOptions.description}</div>}
          {price && token.symbol && <div style={{
            display: 'flex',
            gap: '.1em',
            fontSize: '.8em'
          }}>{price} <span className="symbol">{token.symbol}</span></div>}
        </section>
        {logoOrEmoji(paymentOptions)}
      </main>
    ),
    {
      width: 1200,
      height: 630,
      emoji: 'fluent',
      fonts: [
        {
          name: 'Inter',
          data: fontDataRegular,
          style: 'normal'
        },
        {
          name: 'InterBold',
          data: fontDataBold,
          style: 'normal'
        }
      ]
    }
  );
}

export const runtime = 'edge';
