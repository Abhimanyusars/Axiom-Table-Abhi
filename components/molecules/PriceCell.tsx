"use client";

import { memo } from "react";
import { cn } from "@/lib/utils/cn";
import { formatCurrency, formatPercentage } from "@/lib/utils/format";
import { motion } from "framer-motion";

interface PriceCellProps {
  price: number;
  priceChange: number;
  className?: string;
}

const PriceCell = memo(function PriceCell({
  price,
  priceChange,
  className,
}: PriceCellProps) {
  const isPositive = priceChange >= 0;

  return (
    <motion.div
      className={cn("flex flex-col", className)}
      initial={false}
      animate={{
        backgroundColor: isPositive
          ? "rgba(34, 197, 94, 0.1)"
          : "rgba(239, 68, 68, 0.1)",
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="font-medium text-gray-900">{formatCurrency(price)}</div>
      <div
        className={cn(
          "text-xs font-medium",
          isPositive ? "text-green-600" : "text-red-600"
        )}
      >
        {formatPercentage(priceChange)}
      </div>
    </motion.div>
  );
});

export default PriceCell;

