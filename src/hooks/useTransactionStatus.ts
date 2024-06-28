import { useEffect, useState } from "react";
import { useWaitForTransactionReceipt } from "wagmi";
import { useCallsStatus } from "wagmi/experimental";

export function useTransactionStatus(id?: string, hash?: `0x${string}`): {
  isSuccess: boolean,
  isError: boolean,
  trxHash?: `0x${string}`
} {
  const [trxHash, setTrxHash] = useState<`0x${string}` | undefined>();

  const { isSuccess, isError } = useWaitForTransactionReceipt({ hash: trxHash });
  const { data: callsStatus } = useCallsStatus({
    id: id ?? '',
    query: {
      refetchInterval: (data) => {
        return data.state.data?.status === "CONFIRMED" ? false : 1000;
      }
    },
  });

  useEffect(() => {
    if (hash) {
      setTrxHash(hash);
    }
  }, [hash]);

  useEffect(() => {
    if (callsStatus?.status) {
      if (callsStatus.status === 'CONFIRMED') {
        if (callsStatus.receipts && callsStatus.receipts.length > 0) {
          setTrxHash(callsStatus.receipts[0].transactionHash);
        }
      }
    }
  }, [callsStatus?.status]);

  return { isSuccess, isError, trxHash };
}