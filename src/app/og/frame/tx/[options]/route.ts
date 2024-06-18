import { decodePaymentOptions } from "@/utils/payment-options";
import { getToken } from "@/utils/token";
import { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import { encodeAbiParameters, erc20Abi, isAddress, isHex } from "viem";

export async function POST(request: Request, {
  params
}: {
  params : { options: string }
}) {
  const paymentOptions = await decodePaymentOptions(params.options);
  const token = getToken(paymentOptions?.token);
  if (!paymentOptions.toAddress || !isAddress(paymentOptions.toAddress) || !paymentOptions.amount || !isAddress(token.address)) return;

  const abiParameters = encodeAbiParameters(
    [
      { "name": "_to", "type": "address" },
      { "name": "_value", "type": "uint256" }
    ],
    [paymentOptions.toAddress, BigInt(paymentOptions.amount)]
  );
  const data = '0xa9059cbb' + abiParameters.substring(2);
  if (!isHex(data)) return;

  const tx: FrameTransactionResponse = {
    chainId: ('eip155:' + token.chainId.toString()) as `eip155:${string}`,
    method: 'eth_sendTransaction',
    params: {
      abi: erc20Abi,
      to: token.address,
      data,
      value: '0'
    }
  };

  return Response.json(tx);
}

export const runtime = 'edge';
