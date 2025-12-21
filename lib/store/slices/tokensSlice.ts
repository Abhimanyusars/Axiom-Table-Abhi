import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token, TokenStatus, TableSort, TokenFilters } from "../../types/token";

interface TokensState {
  tokens: Token[];
  filteredTokens: Token[];
  activeTab: TokenStatus | "all";
  sort: TableSort | null;
  filters: TokenFilters;
  isLoading: boolean;
  error: string | null;
}

const initialState: TokensState = {
  tokens: [],
  filteredTokens: [],
  activeTab: "new",
  sort: null,
  filters: {},
  isLoading: false,
  error: null,
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
      state.filteredTokens = filterAndSortTokens(
        action.payload,
        state.activeTab,
        state.sort,
        state.filters
      );
    },
    updateTokenPrice: (
      state,
      action: PayloadAction<{ tokenId: string; price: number; priceChange: number }>
    ) => {
      const token = state.tokens.find((t) => t.id === action.payload.tokenId);
      if (token) {
        token.price = action.payload.price;
        token.priceChange24h = action.payload.priceChange;
      }
      const filteredToken = state.filteredTokens.find(
        (t) => t.id === action.payload.tokenId
      );
      if (filteredToken) {
        filteredToken.price = action.payload.price;
        filteredToken.priceChange24h = action.payload.priceChange;
      }
    },
    setActiveTab: (state, action: PayloadAction<TokenStatus | "all">) => {
      state.activeTab = action.payload;
      state.filteredTokens = filterAndSortTokens(
        state.tokens,
        action.payload,
        state.sort,
        state.filters
      );
    },
    setSort: (state, action: PayloadAction<TableSort | null>) => {
      state.sort = action.payload;
      state.filteredTokens = filterAndSortTokens(
        state.tokens,
        state.activeTab,
        action.payload,
        state.filters
      );
    },
    setFilters: (state, action: PayloadAction<TokenFilters>) => {
      state.filters = action.payload;
      state.filteredTokens = filterAndSortTokens(
        state.tokens,
        state.activeTab,
        state.sort,
        action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Helper function to filter and sort tokens
function filterAndSortTokens(
  tokens: Token[],
  activeTab: TokenStatus | "all",
  sort: TableSort | null,
  filters: TokenFilters
): Token[] {
  let filtered = [...tokens];

  // Filter by tab
  if (activeTab !== "all") {
    filtered = filtered.filter((token) => token.status === activeTab);
  }

  // Apply filters
  if (filters.searchTerm) {
    const search = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(
      (token) =>
        token.symbol.toLowerCase().includes(search) ||
        token.name.toLowerCase().includes(search) ||
        token.contractAddress.toLowerCase().includes(search)
    );
  }

  if (filters.isVerified !== undefined) {
    filtered = filtered.filter((token) => token.isVerified === filters.isVerified);
  }

  if (filters.isTrending !== undefined) {
    filtered = filtered.filter((token) => token.isTrending === filters.isTrending);
  }

  if (filters.minVolume !== undefined) {
    filtered = filtered.filter((token) => token.volume24h >= filters.minVolume!);
  }

  if (filters.maxVolume !== undefined) {
    filtered = filtered.filter((token) => token.volume24h <= filters.maxVolume!);
  }

  // Apply sorting
  if (sort) {
    filtered.sort((a, b) => {
      const aVal = a[sort.field];
      const bVal = b[sort.field];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sort.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sort.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return 0;
    });
  }

  return filtered;
}

export const {
  setTokens,
  updateTokenPrice,
  setActiveTab,
  setSort,
  setFilters,
  setLoading,
  setError,
} = tokensSlice.actions;

export default tokensSlice.reducer;

