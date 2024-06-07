import { PaymentOptions } from "@/types/PaymentOptions";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import { Dispatch, SetStateAction } from "react";
import { useAccount, useDisconnect } from "wagmi";

export function Intro({
    paymentOptions,
    setStep
}: {
    paymentOptions: PaymentOptions,
    setStep: Dispatch<SetStateAction<string>>
}) {
  const account = useAccount();
  const { disconnect } = useDisconnect({
    mutation: { onSuccess: () => { setStep('connect'); } }
  });

  const connectWallet = () => {
    setStep('connect');
  };

  const transact = () => {
    setStep('transact');
  };

  const changeWallet = () => {
    disconnect();
  }

  return <section className="intro">
    <p className="details">{paymentOptions.details ?? ''}</p>
    { account?.status === 'connected' ?
      <>
        <button type="button" onClick={transact}>{paymentOptions.buttonVerb ?? 'Pay'} with <Avatar address={account.address} /> <Name address={account.address} /></button>
        <button type="button" className="secondary" onClick={changeWallet}><span className="soft">Not the right wallet?</span> Change wallet</button>
      </>
      :
      <button type="button" onClick={connectWallet}>{paymentOptions.buttonVerb ?? 'Pay'}</button>
    }
  </section>
}