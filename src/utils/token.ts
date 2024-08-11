import { Token } from "@coinbase/onchainkit/token"
import { base } from "viem/chains";

const supportedTokens: {
  [key: string]: Token
} = {
  'usdc': {
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    image: 'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/44/2b/442b80bd16af0c0d9b22e03a16753823fe826e5bfd457292b55fa0ba8c1ba213-ZWUzYjJmZGUtMDYxNy00NDcyLTg0NjQtMWI4OGEwYjBiODE2',
    chainId: base.id,
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6
  },
  'eurc': {
    address: '0x60a3E35Cc302bFA44Cb288Bc5a4F316Fdb1adb42',
    image: 'https://coin-images.coingecko.com/coins/images/26045/large/euro.png?1696525125',
    chainId: base.id,
    name: 'EUR Coin',
    symbol: 'EURC',
    decimals: 6
  },
  'dai': {
    name: 'Dai',
    address: '0x50c5725949a6f0c72e6c4a641f24049a917db0cb',
    symbol: 'DAI',
    decimals: 18,
    image: 'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/d0/d7/d0d7784975771dbbac9a22c8c0c12928cc6f658cbcf2bbbf7c909f0fa2426dec-NmU4ZWViMDItOTQyYy00Yjk5LTkzODUtNGJlZmJiMTUxOTgy',
    chainId: base.id,
  },
  'weth': {
    name: 'Wrapped Ether',
    address: '0x4200000000000000000000000000000000000006',
    symbol: 'WETH',
    decimals: 18,
    image: 'https://ethereum-optimism.github.io/data/WETH/logo.png',
    chainId: base.id
  },
  'nogs': {
    name: 'Noggles',
    address: '0x13741c5df9ab03e7aa9fb3bf1f714551dd5a5f8a',
    symbol: 'NOGS',
    decimals: 18,
    image: 'https://ethereum-optimism.github.io/data/NOGS/logo.png',
    chainId: base.id
  },
  'degen': {
    name: 'Degen',
    address: '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed',
    symbol: 'DEGEN',
    decimals: 18,
    image: 'https://coin-images.coingecko.com/coins/images/34515/large/android-chrome-512x512.png?1706198225',
    chainId: base.id
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
