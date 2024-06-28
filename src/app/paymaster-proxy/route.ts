import { paymasterClient } from "@/paymaster";
 
export async function POST(r: Request) {
  const req = await r.json() as { method: any, params: any[] };
  const method = req.method;
  const [userOp] = req.params;
 
  if (method === "pm_getPaymasterStubData") {
    const result = await paymasterClient.getPaymasterStubData({
      userOperation: userOp,
    });
    return Response.json({ result });
  } else if (method === "pm_getPaymasterData") {
    const result = await paymasterClient.getPaymasterData({
      userOperation: userOp,
    });
    return Response.json({ result });
  }
  return Response.json({ error: "Method not found" });
}

export const runtime = 'edge';
