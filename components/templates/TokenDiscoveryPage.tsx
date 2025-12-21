"use client";

import { useEffect, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setTokens, setActiveTab, setLoading } from "@/lib/store/slices/tokensSlice";
import { useTokens } from "@/lib/hooks/useTokens";
import { useWebSocketPriceUpdates } from "@/lib/hooks/useWebSocketPriceUpdates";
import TokenTable from "../organisms/TokenTable";
import Tabs from "../molecules/Tabs";
import { TableSkeleton } from "../atoms/Skeleton";
import ErrorBoundary from "../organisms/ErrorBoundary";
import { TokenStatus } from "@/lib/types/token";
import { Search } from "lucide-react";
import { useState } from "react";
import { setFilters } from "@/lib/store/slices/tokensSlice";

export default function TokenDiscoveryPage() {
  const dispatch = useAppDispatch();
  const { data: tokens, isLoading, error } = useTokens();
  const { activeTab, filteredTokens, tokens: allTokens } = useAppSelector(
    (state) => state.tokens
  );
  const [searchTerm, setSearchTerm] = useState("");

  // Load tokens into Redux store
  useEffect(() => {
    if (tokens) {
      dispatch(setTokens(tokens));
      dispatch(setLoading(false));
    }
  }, [tokens, dispatch]);

  // Set up WebSocket price updates
  useWebSocketPriceUpdates(allTokens);

  // Handle search
  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      dispatch(setFilters({ searchTerm: term }));
    },
    [dispatch]
  );

  // Calculate tab counts
  const counts = useMemo(() => {
    if (!allTokens.length) {
      return { new: 0, "final-stretch": 0, migrated: 0, all: 0 };
    }
    return {
      new: allTokens.filter((t) => t.status === "new").length,
      "final-stretch": allTokens.filter((t) => t.status === "final-stretch")
        .length,
      migrated: allTokens.filter((t) => t.status === "migrated").length,
      all: allTokens.length,
    };
  }, [allTokens]);

  const handleTabChange = useCallback(
    (tab: TokenStatus | "all") => {
      dispatch(setActiveTab(tab));
    },
    [dispatch]
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="text-6xl">❌</div>
        <h2 className="text-2xl font-bold text-gray-900">Failed to load tokens</h2>
        <p className="text-gray-600">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Token Discovery
          </h1>
          <p className="text-gray-600">
            Real-time token trading data with live price updates
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search tokens by name, symbol, or address..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <Tabs
            activeTab={activeTab}
            onTabChange={handleTabChange}
            counts={counts}
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <ErrorBoundary>
            {isLoading ? (
              <div className="p-6">
                <TableSkeleton rows={10} />
              </div>
            ) : (
              <TokenTable />
            )}
          </ErrorBoundary>
        </div>

        {/* Stats Footer */}
        {filteredTokens.length > 0 && (
          <div className="mt-4 text-sm text-gray-500 text-center">
            Showing {filteredTokens.length} of {allTokens.length} tokens
          </div>
        )}
      </div>
    </div>
  );
}

