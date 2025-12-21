"use client";

import { memo, useState } from "react";
import { Token } from "@/lib/types/token";
import Modal from "../atoms/Modal";
import Button from "../atoms/Button";
import {
  formatCurrency,
  formatLargeNumber,
  formatTimeAgo,
} from "@/lib/utils/format";
import { ExternalLink, Copy, Check } from "lucide-react";
import Badge from "../atoms/Badge";

interface TokenDetailsModalProps {
  token: Token;
  isOpen: boolean;
  onClose: () => void;
}

const TokenDetailsModal = memo(function TokenDetailsModal({
  token,
  isOpen,
  onClose,
}: TokenDetailsModalProps) {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(token.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isPositive = token.priceChange24h >= 0;

  return (
    <Modal
      open={isOpen}
      onOpenChange={onClose}
      title="Token Details"
      className="max-w-2xl"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {token.logo || token.symbol.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-bold">{token.symbol}</h3>
                {token.isVerified && (
                  <span className="text-blue-500 text-xl">✓</span>
                )}
              </div>
              <p className="text-gray-600">{token.name}</p>
            </div>
          </div>
          <Badge variant={token.status === "new" ? "success" : "default"}>
            {token.status.toUpperCase()}
          </Badge>
        </div>

        {/* Price Info */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Current Price</p>
            <p className="text-2xl font-bold">{formatCurrency(token.price)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">24h Change</p>
            <p
              className={`text-2xl font-bold ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPositive ? "+" : ""}
              {token.priceChange24h.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Market Cap</p>
            <p className="text-lg font-semibold">
              {formatLargeNumber(token.marketCap)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">24h Volume</p>
            <p className="text-lg font-semibold">
              {formatLargeNumber(token.volume24h)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Liquidity</p>
            <p className="text-lg font-semibold">
              {formatLargeNumber(token.liquidity)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Holders</p>
            <p className="text-lg font-semibold">
              {token.holders.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Chain</p>
            <p className="text-lg font-semibold">{token.chain}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Age</p>
            <p className="text-lg font-semibold">
              {formatTimeAgo(token.timestamp)}
            </p>
          </div>
        </div>

        {/* Contract Address */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Contract Address</p>
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <code className="flex-1 text-sm font-mono">
              {token.contractAddress}
            </code>
            <button
              onClick={copyAddress}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
            <a
              href={`https://etherscan.io/address/${token.contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Trade</Button>
        </div>
      </div>
    </Modal>
  );
});

export default TokenDetailsModal;

