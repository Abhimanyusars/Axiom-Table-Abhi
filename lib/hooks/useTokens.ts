import { useQuery } from "@tanstack/react-query";
import { Token } from "../types/token";
import { generateMockTokens } from "../utils/mockData";

/**
 * Custom hook to fetch tokens using React Query
 */
export function useTokens() {
  return useQuery<Token[]>({
    queryKey: ["tokens"],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return generateMockTokens();
    },
    staleTime: 30000, // 30 seconds
  });
}

