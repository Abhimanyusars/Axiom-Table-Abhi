/**
 * Core token types for the trading table
 */

export type TokenStatus = "new" | "final-stretch" | "migrated";

export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  holders: number;
  age: string;
  status: TokenStatus;
  contractAddress: string;
  chain: string;
  logo?: string;
  tags?: string[];
  isVerified: boolean;
  isTrending: boolean;
  timestamp: number;
}

export interface PriceUpdate {
  tokenId: string;
  price: number;
  priceChange: number;
  timestamp: number;
}

export interface TokenFilters {
  status?: TokenStatus[];
  minVolume?: number;
  maxVolume?: number;
  minMarketCap?: number;
  maxMarketCap?: number;
  isVerified?: boolean;
  isTrending?: boolean;
  searchTerm?: string;
}

export type SortField = keyof Pick<
  Token,
  "price" | "priceChange24h" | "volume24h" | "marketCap" | "liquidity" | "holders" | "age"
>;

export type SortDirection = "asc" | "desc";

export interface TableSort {
  field: SortField;
  direction: SortDirection;
}

