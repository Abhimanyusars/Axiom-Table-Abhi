import { useEffect, useRef } from "react";
import { useAppDispatch } from "../store/hooks";
import { updateTokenPrice } from "../store/slices/tokensSlice";
import { simulatePriceChange } from "../utils/mockData";
import { Token } from "../types/token";

/**
 * Custom hook to simulate WebSocket price updates
 * Updates token prices every 3-5 seconds with smooth transitions
 */
export function useWebSocketPriceUpdates(tokens: Token[]) {
  const dispatch = useAppDispatch();
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (tokens.length === 0) return;

    const updatePrices = () => {
      // Randomly select 3-5 tokens to update
      const numToUpdate = Math.floor(Math.random() * 3) + 3;
      const tokensToUpdate = [...tokens]
        .sort(() => Math.random() - 0.5)
        .slice(0, numToUpdate);

      tokensToUpdate.forEach((token) => {
        const newPrice = simulatePriceChange(token.price);
        const priceChange =
          ((newPrice - token.price) / token.price) * 100 + token.priceChange24h;

        dispatch(
          updateTokenPrice({
            tokenId: token.id,
            price: newPrice,
            priceChange,
          })
        );
      });
    };

    // Update prices every 3-5 seconds
    const startUpdates = () => {
      const delay = Math.random() * 2000 + 3000; // 3-5 seconds
      intervalRef.current = setTimeout(() => {
        updatePrices();
        startUpdates();
      }, delay);
    };

    startUpdates();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [tokens, dispatch]);
}

