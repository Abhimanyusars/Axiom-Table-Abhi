"use client";

import { memo, useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { formatCurrency, formatPercentage } from "@/lib/utils/format";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  delay: number;
}

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
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  // Generate sparkles on price update
  useEffect(() => {
    const newSparkles: Sparkle[] = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.2,
    }));

    setSparkles(newSparkles);

    const timer = setTimeout(() => setSparkles([]), 1000);
    return () => clearTimeout(timer);
  }, [price]);

  return (
    <motion.div
      className={cn("relative flex flex-col overflow-hidden p-2", className)}
      initial={false}
      animate={{
        backgroundColor: isPositive
          ? "rgba(34, 197, 94, 0.1)"
          : "rgba(239, 68, 68, 0.1)",
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated pulse effect on price change */}
      <motion.div
        className={cn(
          "absolute inset-0 pointer-events-none rounded-md",
          isPositive ? "bg-green-400" : "bg-red-400"
        )}
        initial={{ opacity: 0.4, scale: 0.9 }}
        animate={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        key={`pulse-${price}`}
      />

      {/* Sparkle particles */}
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute pointer-events-none"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
            }}
            initial={{ scale: 0, rotate: 0, opacity: 1 }}
            animate={{
              scale: [0, 1, 0],
              rotate: 180,
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: sparkle.delay,
              ease: "easeOut",
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z"
                fill={isPositive ? "#22c55e" : "#ef4444"}
                fillOpacity="0.8"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Price with animated arrow */}
      <div className="relative flex items-center gap-1.5 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={isPositive ? "up" : "down"}
            initial={{ y: isPositive ? 8 : -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: isPositive ? -8 : 8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="font-medium text-gray-900"
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 0.4 }}
          key={`price-${price}`}
        >
          {formatCurrency(price)}
        </motion.div>
      </div>

      {/* Percentage with animation */}
      <motion.div
        className={cn(
          "relative z-10 text-xs font-bold flex items-center gap-1 mt-0.5",
          isPositive ? "text-green-600" : "text-red-600"
        )}
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        key={`change-${priceChange}`}
      >
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.3 }}
        >
          {isPositive ? "▲" : "▼"}
        </motion.span>
        {formatPercentage(priceChange)}
      </motion.div>
    </motion.div>
  );
});

export default PriceCell;

