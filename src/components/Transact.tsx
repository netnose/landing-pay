import { useTransactionStatus } from "@/hooks/useTransactionStatus";
import { PaymentOptions } from "@/types/PaymentOptions";
import { getToken } from "@/utils/token";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { erc20Abi } from "viem";
import { useAccount, useDisconnect, useWriteContract } from "wagmi";
import { useCapabilities, useWriteContracts } from "wagmi/experimental";

export function Transact({
  paymentOptions,
  setStep
}: {
  paymentOptions: PaymentOptions,
  setStep: Dispatch<SetStateAction<string>>
}) {
  const [id, setId] = useState<string | undefined>(undefined);
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const account = useAccount();
  const { status: availabilityStatus, data: availableCapabilities } = useCapabilities({
    account: account.address
  });
  const capabilities = useMemo(() => {
    if (!availableCapabilities || !account.chainId) return {};
    const capabilitiesForChain = availableCapabilities[account.chainId];
    if (capabilitiesForChain["paymasterService"] && capabilitiesForChain["paymasterService"].supported) {
      return {
        paymasterService: {
          url: window.location.origin + '/paymaster-proxy'
        }
      };
    }
    return {};
  }, [availableCapabilities, account.chainId]);

  const { disconnect } = useDisconnect({
    mutation: { onSuccess: () => { setStep('connect'); } }
  });
  const { writeContract } = useWriteContract({
    mutation: { onSuccess: (id) => { setHash(id); }, onError: (error) => { setError('wallet') } }
  });
  const { writeContracts } = useWriteContracts({
    mutation: { onSuccess: (id) => { setId(id); }, onError: (error) => { setError('wallet') } }
  });
  const { isSuccess, isError, trxHash } = useTransactionStatus(id, hash);

  const token = getToken(paymentOptions?.token);

  useEffect(() => {
    if (!token.address || token.chainId !== 8453 || !paymentOptions?.toAddress || !paymentOptions?.amount) return;
    if (availabilityStatus === 'pending') return;
    if (capabilities.paymasterService) {
      writeContracts({
        contracts: [
          {
            address: token.address,
            abi: erc20Abi,
            functionName: "transfer",
            args: [paymentOptions.toAddress, BigInt(paymentOptions.amount)]
          },
        ],
        capabilities
      });
    }
    else {
      writeContract({
        address: token.address,
        chainId: 8453,
        abi: erc20Abi,
        functionName: "transfer",
        args: [paymentOptions.toAddress, BigInt(paymentOptions.amount)]
      });
    }
  }, [availabilityStatus]);

  useEffect(() => {
    if (isError) {
      setError('transaction');
    }
  }, [isError]);
  
  const reset = () => { setError(undefined); disconnect(); };
  const showTransaction = () => { window.open('https://onceupon.xyz/' + trxHash); };
  return <section className="transact">
    {!error && !isSuccess && <div className="loading">⏳</div>}
    {error && <div className="error">❌</div>}
    {isSuccess && <div className="success">✅</div>}
    {!id && !hash && !error && <h1 className="title">Waiting for Wallet response...</h1>}
    {(id || hash) && !isSuccess && !error && <h1 className="title">Waiting transaction completion...</h1>}
    {error === 'wallet' && <h1 className="title">Wallet error</h1>}
    {error === 'transaction' && <h1 className="title">Transaction error</h1>}
    {isSuccess && <h1 className="title">Transaction completed</h1>}
    {((!id && !hash) || error === 'transaction') && <button type="button" className="secondary" onClick={reset}>{!error && <span className="soft">Wallet not responding? </span>}Retry</button>}
    {trxHash && <button type="button" className="secondary" onClick={showTransaction}><span className="soft">Check transaction on</span> Once Upon</button>}
  </section>;
}
