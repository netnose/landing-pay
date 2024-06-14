import { PaymentOptions } from "@/types/PaymentOptions";
import { getRequestContext } from "@cloudflare/next-on-pages";
import base64url from "base64url";
import { isAddress } from "viem";

function createRandomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function validMinimumPaymentOptions(paymentOptions: PaymentOptions) {
  try {
    if (!paymentOptions.amount || BigInt(paymentOptions.amount) === BigInt(0)) {
      return false;
    }
    if (!paymentOptions.toAddress || !isAddress(paymentOptions.toAddress)) return false;
    return true;
  }
  catch {
    return false;
  }
}

export async function POST(request: Request) {
  const json = await request.json() as PaymentOptions;
  if (!validMinimumPaymentOptions(json)) return Response.error();
  const data = base64url.encode(JSON.stringify(json));
  const shortUrls = getRequestContext().env.SHORTURLS;
  let tries = 0;
  let randomString;
  do {
    randomString = createRandomString(8);
    tries++;
  }
  while ((await shortUrls.get(randomString)) !== null && tries < 15);
  if (tries === 15) return Response.error();
  await shortUrls.put(randomString, data);
  return Response.json({ url: new URL(request.url).origin + '/pay/' + randomString });
}

export const runtime = 'edge';
