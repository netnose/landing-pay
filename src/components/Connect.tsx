import { Avatar, Name } from "@coinbase/onchainkit/identity";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function Connect({
  setStep
}: {
  setStep: Dispatch<SetStateAction<string>>
}) {
  const { connectors, connect } = useConnect({ mutation: { onSuccess: () => { setStep('transact'); }}});
  const coinbaseWalletConnector = connectors.filter((connector) => connector.id === 'coinbaseWalletSDK');

  return <section className="connect">
    <h1 className="connect-title">Connect a wallet</h1>
    {connectors.map((connector) => (
      <button key={connector.id} type="button" onClick={() => connect({ connector })}>{connector.name}</button>
    ))}
    { coinbaseWalletConnector && coinbaseWalletConnector[0] && <button className="secondary" type="button" onClick={() => connect({ connector: coinbaseWalletConnector[0] })}><span className="soft">Don&apos;t have a wallet?</span> Create a Smart Wallet</button>}
  </section>;
}