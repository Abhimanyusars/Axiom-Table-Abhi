"use client";

import { memo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { SortDirection } from "@/lib/types/token";

interface SortableHeaderProps {
  children: React.ReactNode;
  sortDirection?: SortDirection;
  onSort?: () => void;
  className?: string;
}

const SortableHeader = memo(function SortableHeader({
  children,
  sortDirection,
  onSort,
  className,
}: SortableHeaderProps) {
  return (
    <button
      onClick={onSort}
      className={cn(
        "flex items-center space-x-1 font-semibold text-gray-700 hover:text-gray-900 transition-colors group",
        className
      )}
    >
      <span>{children}</span>
      <span className="text-gray-400 group-hover:text-gray-600">
        {sortDirection === "asc" && <ArrowUp className="h-4 w-4" />}
        {sortDirection === "desc" && <ArrowDown className="h-4 w-4" />}
        {!sortDirection && <ArrowUpDown className="h-4 w-4" />}
      </span>
    </button>
  );
});

export default SortableHeader;

