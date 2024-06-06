import { PaymentOptions } from "@/hooks/usePaymentOptions";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { erc20Abi } from "viem";
import { useDisconnect, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export function Transact({
  paymentOptions,
  setStep
}: {
  paymentOptions: PaymentOptions,
  setStep: Dispatch<SetStateAction<string>>
}) {
  const [id, setId] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const { disconnect } = useDisconnect({
    mutation: { onSuccess: () => { setStep('connect'); } }
  });
  const { writeContract } = useWriteContract({
    mutation: { onSuccess: (id) => { setId(id); }, onError: (error) => { setError('wallet') } },
  });
  const { isSuccess, isError } = useWaitForTransactionReceipt({
    hash: id as `0x${string}` | undefined
  });

  useEffect(() => {
    if (!paymentOptions?.token?.address || paymentOptions?.token?.chainId !== 8453 || !paymentOptions?.toAddress || !paymentOptions?.amount) return;
    writeContract({
      address: paymentOptions.token.address,
      chainId: 8453,
      abi: erc20Abi,
      functionName: "transfer",
      args: [paymentOptions.toAddress, BigInt(paymentOptions.amount)]
    });
  }, []);

  useEffect(() => {
    if (isError) {
      setError('transaction');
    }
  }, [isError]);
  
  const reset = () => { setError(undefined); disconnect(); };
  const showTransaction = () => { window.open('https://onceupon.xyz/' + id); };
  return <section className="transact">
    {!id && !error && <h1 className="title">Waiting for Wallet response...</h1>}
    {id && !isSuccess && !error && <h1 className="title">Waiting transaction completion...</h1>}
    {error === 'wallet' && <h1 className="title">Wallet error</h1>}
    {error === 'transaction' && <h1 className="title">Transaction error</h1>}
    {isSuccess && <h1 className="title">Transaction completed</h1>}
    {!error && !isSuccess && <div className="loading">⏳</div>}
    {error && <div className="error">❌</div>}
    {isSuccess && <div className="success">✅</div>}
    {(!id || error === 'transaction') && <button type="button" className="secondary" onClick={reset}>{!error && <span className="soft">Wallet not responding? </span>}Retry</button>}
    {id && <button type="button" className="secondary" onClick={showTransaction}><span className="soft">Check transaction on</span> Once Upon</button>}
  </section>;
}
