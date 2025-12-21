import { Token, TokenStatus } from "../types/token";

/**
 * Generate mock token data for testing
 */

const TOKEN_NAMES = [
  { symbol: "PEPE", name: "Pepe Coin", logo: "🐸" },
  { symbol: "WOJAK", name: "Wojak Finance", logo: "😐" },
  { symbol: "DOGE", name: "Dogecoin", logo: "🐕" },
  { symbol: "SHIB", name: "Shiba Inu", logo: "🐶" },
  { symbol: "FLOKI", name: "Floki Inu", logo: "🐕" },
  { symbol: "BONK", name: "Bonk Inu", logo: "🐶" },
  { symbol: "WIF", name: "Dogwifhat", logo: "🐕" },
  { symbol: "MEME", name: "Meme Coin", logo: "😂" },
  { symbol: "TURBO", name: "Turbo Token", logo: "⚡" },
  { symbol: "AIDOGE", name: "ArbDoge AI", logo: "🤖" },
];

const CHAINS = ["ETH", "BSC", "SOL", "BASE", "ARB"];

function generateAddress(): string {
  return "0x" + Array.from({ length: 40 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
}

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function generateMockToken(
  status: TokenStatus,
  index: number
): Token {
  const tokenInfo = TOKEN_NAMES[index % TOKEN_NAMES.length];
  const basePrice = randomInRange(0.0001, 100);
  const priceChange = randomInRange(-50, 150);
  
  return {
    id: `token-${status}-${index}`,
    symbol: `${tokenInfo.symbol}${index}`,
    name: `${tokenInfo.name} ${index}`,
    price: basePrice,
    priceChange24h: priceChange,
    volume24h: randomInRange(10000, 10000000),
    marketCap: randomInRange(100000, 100000000),
    liquidity: randomInRange(50000, 5000000),
    holders: Math.floor(randomInRange(100, 50000)),
    age: `${Math.floor(randomInRange(1, 48))}h`,
    status,
    contractAddress: generateAddress(),
    chain: CHAINS[Math.floor(Math.random() * CHAINS.length)],
    logo: tokenInfo.logo,
    tags: Math.random() > 0.7 ? ["🔥 Trending"] : undefined,
    isVerified: Math.random() > 0.5,
    isTrending: Math.random() > 0.7,
    timestamp: Date.now() - Math.floor(randomInRange(0, 172800000)), // 0-48 hours ago
  };
}

export function generateMockTokens(): Token[] {
  const tokens: Token[] = [];
  
  // Generate new pairs (15 tokens)
  for (let i = 0; i < 15; i++) {
    tokens.push(generateMockToken("new", i));
  }
  
  // Generate final stretch tokens (12 tokens)
  for (let i = 0; i < 12; i++) {
    tokens.push(generateMockToken("final-stretch", i));
  }
  
  // Generate migrated tokens (10 tokens)
  for (let i = 0; i < 10; i++) {
    tokens.push(generateMockToken("migrated", i));
  }
  
  return tokens;
}

/**
 * Simulate price change for a token
 */
export function simulatePriceChange(currentPrice: number): number {
  const changePercent = randomInRange(-5, 5); // -5% to +5% change
  return currentPrice * (1 + changePercent / 100);
}

