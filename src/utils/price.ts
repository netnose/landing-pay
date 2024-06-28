import { Token } from "@coinbase/onchainkit/token";
import { formatUnits } from "viem";

export function getPrice(amount?: string, token?: Token): string | undefined {
  let price: string | undefined;
  try {
    if (amount && token && token.decimals) {
      price = formatUnits(BigInt(amount), token.decimals);
    }
  }
  catch { }
  return price;
}
