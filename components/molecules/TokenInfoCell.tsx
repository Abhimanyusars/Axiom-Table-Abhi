"use client";

import { memo } from "react";
import { Token } from "@/lib/types/token";
import Tooltip from "../atoms/Tooltip";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import Badge from "../atoms/Badge";

interface TokenInfoCellProps {
  token: Token;
}

const TokenInfoCell = memo(function TokenInfoCell({ token }: TokenInfoCellProps) {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(token.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
        {token.logo || token.symbol.charAt(0)}
      </div>
      <div className="flex flex-col min-w-0">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-900 truncate">
            {token.symbol}
          </span>
          {token.isVerified && (
            <Tooltip content="Verified Token">
              <span className="text-blue-500">✓</span>
            </Tooltip>
          )}
          {token.tags && token.tags.length > 0 && (
            <Badge variant="warning" className="text-xs">
              {token.tags[0]}
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span className="truncate">{token.name}</span>
          <button
            onClick={copyAddress}
            className="hover:text-gray-700 transition-colors"
            aria-label="Copy address"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-600" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
          <a
            href={`https://etherscan.io/address/${token.contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors"
            aria-label="View on explorer"
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
});

export default TokenInfoCell;

