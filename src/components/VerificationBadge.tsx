import { getAttestations } from "@coinbase/onchainkit/identity";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { base } from "viem/chains";
import Check from "./Check";

const COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID = '0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9';

export function VerificationBadge({
  address
}: {
  address?: Address
}) {
  const [attestation, setAttestation] = useState<string>();

  useEffect(() => {
    if (address) {
      getAttestations(address, base, {
        schemas: [COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID]
      }).then((attestations) => {
        // The presence of the attestation means the account is verified
        // Revoked and expired attestations are already filtered
        // The attestation includes a boolean field that is always set to true
        if (attestations.length === 1) {
          setAttestation(attestations[0].id); 
        }
      });
    }
    else {
      setAttestation(undefined);
    }
  }, [address, setAttestation]);

  if (!attestation) {
    return '';
  }
  return <a href={'https://base.easscan.org/attestation/view/' + attestation} target="_blank" title="Verified Account">
    <Check size="11px" />
  </a>;
}