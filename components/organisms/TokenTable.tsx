"use client";

import { memo, useState, useCallback } from "react";
import { Token, SortField, SortDirection } from "@/lib/types/token";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setSort } from "@/lib/store/slices/tokensSlice";
import TokenInfoCell from "../molecules/TokenInfoCell";
import PriceCell from "../molecules/PriceCell";
import SortableHeader from "../molecules/SortableHeader";
import TokenDetailsModal from "../molecules/TokenDetailsModal";
import Popover from "../atoms/Popover";
import Tooltip from "../atoms/Tooltip";
import {
  formatLargeNumber,
  formatCompactNumber,
  formatTimeAgo,
} from "@/lib/utils/format";
import { Info } from "lucide-react";
import { useIsMobile } from "@/lib/hooks/useMediaQuery";

const TokenTable = memo(function TokenTable() {
  const dispatch = useAppDispatch();
  const { filteredTokens, sort } = useAppSelector((state) => state.tokens);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const isMobile = useIsMobile();

  const handleSort = useCallback(
    (field: SortField) => {
      const newDirection: SortDirection =
        sort?.field === field && sort.direction === "desc" ? "asc" : "desc";
      dispatch(setSort({ field, direction: newDirection }));
    },
    [sort, dispatch]
  );

  const getSortDirection = (field: SortField): SortDirection | undefined => {
    return sort?.field === field ? sort.direction : undefined;
  };

  if (filteredTokens.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-6xl">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900">No tokens found</h3>
        <p className="text-gray-600">Try adjusting your filters</p>
      </div>
    );
  }

  if (isMobile) {
    return (
      <>
        <div className="space-y-3">
          {filteredTokens.map((token) => (
            <div
              key={token.id}
              onClick={() => setSelectedToken(token)}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <TokenInfoCell token={token} />
                <PriceCell price={token.price} priceChange={token.priceChange24h} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">Volume:</span>
                  <span className="ml-1 font-medium">
                    {formatCompactNumber(token.volume24h)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">MCap:</span>
                  <span className="ml-1 font-medium">
                    {formatCompactNumber(token.marketCap)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Holders:</span>
                  <span className="ml-1 font-medium">{token.holders}</span>
                </div>
                <div>
                  <span className="text-gray-500">Age:</span>
                  <span className="ml-1 font-medium">
                    {formatTimeAgo(token.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedToken && (
          <TokenDetailsModal
            token={selectedToken}
            isOpen={!!selectedToken}
            onClose={() => setSelectedToken(null)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Token
              </th>
              <th className="px-6 py-3 text-left">
                <SortableHeader
                  sortDirection={getSortDirection("price")}
                  onSort={() => handleSort("price")}
                >
                  Price
                </SortableHeader>
              </th>
              <th className="px-6 py-3 text-left">
                <SortableHeader
                  sortDirection={getSortDirection("priceChange24h")}
                  onSort={() => handleSort("priceChange24h")}
                >
                  24h %
                </SortableHeader>
              </th>
              <th className="px-6 py-3 text-left">
                <SortableHeader
                  sortDirection={getSortDirection("volume24h")}
                  onSort={() => handleSort("volume24h")}
                >
                  Volume
                </SortableHeader>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center space-x-1">
                  <SortableHeader
                    sortDirection={getSortDirection("marketCap")}
                    onSort={() => handleSort("marketCap")}
                  >
                    Market Cap
                  </SortableHeader>
                  <Popover
                    trigger={
                      <button className="text-gray-400 hover:text-gray-600">
                        <Info className="h-4 w-4" />
                      </button>
                    }
                  >
                    <div className="space-y-2">
                      <h4 className="font-semibold">Market Capitalization</h4>
                      <p className="text-sm text-gray-600">
                        The total value of all tokens in circulation, calculated
                        by multiplying the current price by the total supply.
                      </p>
                    </div>
                  </Popover>
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <SortableHeader
                  sortDirection={getSortDirection("liquidity")}
                  onSort={() => handleSort("liquidity")}
                >
                  Liquidity
                </SortableHeader>
              </th>
              <th className="px-6 py-3 text-left">
                <SortableHeader
                  sortDirection={getSortDirection("holders")}
                  onSort={() => handleSort("holders")}
                >
                  Holders
                </SortableHeader>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTokens.map((token) => (
              <tr
                key={token.id}
                onClick={() => setSelectedToken(token)}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <TokenInfoCell token={token} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <PriceCell
                    price={token.price}
                    priceChange={token.priceChange24h}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`font-medium ${
                      token.priceChange24h >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {token.priceChange24h >= 0 ? "+" : ""}
                    {token.priceChange24h.toFixed(2)}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {formatLargeNumber(token.volume24h)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {formatLargeNumber(token.marketCap)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  <Tooltip content={`$${token.liquidity.toLocaleString()}`}>
                    <span>{formatLargeNumber(token.liquidity)}</span>
                  </Tooltip>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {token.holders.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatTimeAgo(token.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedToken && (
        <TokenDetailsModal
          token={selectedToken}
          isOpen={!!selectedToken}
          onClose={() => setSelectedToken(null)}
        />
      )}
    </>
  );
});

export default TokenTable;

