import { Address } from "viem";

export type PaymentOptions = {
  toName?: string;
  toAddress?: Address;
  logo?: string;
  emoji?: string;
  theme?: string;
  description?: string;
  details?: string;
  buttonVerb?: string;
  amount?: string;
  token?: string;
};
