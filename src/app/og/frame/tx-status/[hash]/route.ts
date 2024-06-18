import { getRequestContext } from '@cloudflare/next-on-pages';
import { FrameButtonMetadata, FrameRequest, getFrameHtmlResponse, getFrameMessage } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http, isHex } from 'viem';
import { base } from 'viem/chains';

export function GET(req: NextRequest, { params }: { params: { hash: string }}): Response {
  return NextResponse.redirect('https://onceupon.xyz/' + params.hash);
}
 
export async function POST(req: NextRequest, { params }: { params: { hash: string }}): Promise<Response> {
  const requestCtx = getRequestContext();
  const frameRequest: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(frameRequest);
  if (!isValid) return Response.error();

  let txHash = '';
  if (params.hash && isHex(params.hash)) {
    txHash = params.hash;
  }
  else if (message.transaction !== null && message.transaction.hash) {
    txHash = message.transaction.hash;
  }
  if (txHash === '') return Response.error();

  let button: FrameButtonMetadata = {
    action: 'post',
    label: 'Refresh'
  };
  let image = requestCtx.env.SITE_URL + '/tx-pending.jpg';

  try {
    const publicClient = createPublicClient({
      chain: base,
      transport: http()
    });
  
    const transaction = await publicClient.getTransactionReceipt({ 
      hash: txHash as `0x${string}`
    });

    button = {
      action: 'link',
      label: 'Check transaction on Once Upon',
      target: 'https://onceupon.xyz/' + txHash
    };

    image = transaction.status === 'success' ? requestCtx.env.SITE_URL + '/tx-complete.jpg' : requestCtx.env.SITE_URL + '/tx-error.jpg';
  }
  catch {}

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [button],
      image,
      postUrl: requestCtx.env.SITE_URL + '/og/frame/tx-status/' + txHash
    }),
  );
}

export const runtime = 'edge';
