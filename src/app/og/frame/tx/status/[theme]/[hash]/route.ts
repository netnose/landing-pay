import { FrameButtonMetadata, FrameRequest, getFrameHtmlResponse, getFrameMessage } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http, isHex } from 'viem';
import { base } from 'viem/chains';

export function GET(req: NextRequest, { params }: { params: { hash: string }}): Response {
  return NextResponse.redirect('https://onceupon.xyz/' + params.hash);
}
 
export async function POST(req: NextRequest, { params }: { params: { theme: string, hash: string }}): Promise<Response> {
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
  let image = process.env.NEXT_PUBLIC_SITE_URL + '/og/frame/tx/status/' + params.theme + '/pending.jpg';

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

    image = process.env.NEXT_PUBLIC_SITE_URL + '/og/frame/tx/status/' + params.theme + '/' + (transaction.status === 'success' ? 'complete' : 'error') + '.jpg';
  }
  catch {}

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [button],
      image,
      postUrl: process.env.NEXT_PUBLIC_SITE_URL + '/og/frame/tx/status/' + params.theme + '/' + txHash
    }),
  );
}

export const runtime = 'edge';
