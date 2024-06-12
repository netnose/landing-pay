import { Token } from "@coinbase/onchainkit/token"

const supportedTokens: {
  [key: string]: Token
} = {
  'usdc': {
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    image: 'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/44/2b/442b80bd16af0c0d9b22e03a16753823fe826e5bfd457292b55fa0ba8c1ba213-ZWUzYjJmZGUtMDYxNy00NDcyLTg0NjQtMWI4OGEwYjBiODE2',
    chainId: 8453,
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6
  }
};

export function getTokens(): Token[] {
  let array = [];
  for (const key in supportedTokens) {
    array.push(supportedTokens[key]);
  }
  return array;
}

export function getToken(tokenId?: string): Token {
  if (!tokenId || !(tokenId in supportedTokens)) {
    tokenId = 'usdc';
  }
  return supportedTokens[tokenId];
}
