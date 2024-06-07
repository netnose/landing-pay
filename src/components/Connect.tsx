import { Dispatch, SetStateAction } from "react";
import { base } from "viem/chains";
import { useConnect } from "wagmi";

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
      <button key={connector.id} type="button" onClick={() => connect({ chainId: base.id, connector })}>{connector.name}</button>
    ))}
    { coinbaseWalletConnector && coinbaseWalletConnector[0] && <button className="secondary" type="button" onClick={() => connect({ connector: coinbaseWalletConnector[0] })}><span className="soft">Don&apos;t have a wallet?</span> Create a Smart Wallet</button>}
  </section>;
}