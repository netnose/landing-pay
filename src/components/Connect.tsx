import { Dispatch, SetStateAction } from "react";
import { base } from "viem/chains";
import { useConnect } from "wagmi";

export function Connect({
  onSuccess,
  compact
}: {
  onSuccess?: () => void,
  compact?: boolean
}) {
  const { connectors, connect } = useConnect({ mutation: { onSuccess }});
  const coinbaseWalletConnector = connectors.filter((connector) => connector.id === 'coinbaseWalletSDK');

  let className = 'connect';
  if (compact) {
    className += ' compact';
  }

  return <section className={className}>
    {!compact && <h1 className="connect-title">Connect a wallet</h1>}
    {connectors.map((connector) => (
      <button key={connector.id} type="button" onClick={() => connect({ chainId: base.id, connector })}>{connector.name}</button>
    ))}
    {!compact && coinbaseWalletConnector && coinbaseWalletConnector[0] && <button className="secondary" type="button" onClick={() => connect({ connector: coinbaseWalletConnector[0] })}><span className="soft">Don&apos;t have a wallet?</span> Create a Smart Wallet</button>}
  </section>;
}