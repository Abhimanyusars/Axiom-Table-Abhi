"use client";

import { memo } from "react";
import { cn } from "@/lib/utils/cn";
import { TokenStatus } from "@/lib/types/token";

interface TabButtonProps {
  label: string;
  count?: number;
  isActive: boolean;
  onClick: () => void;
}

const TabButton = memo(function TabButton({
  label,
  count,
  isActive,
  onClick,
}: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
        isActive
          ? "bg-blue-600 text-white shadow-md"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      )}
    >
      {label}
      {count !== undefined && (
        <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">
          {count}
        </span>
      )}
    </button>
  );
});

interface TabsProps {
  activeTab: TokenStatus | "all";
  onTabChange: (tab: TokenStatus | "all") => void;
  counts: Record<TokenStatus | "all", number>;
}

const Tabs = memo(function Tabs({ activeTab, onTabChange, counts }: TabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <TabButton
        label="New Pairs"
        count={counts.new}
        isActive={activeTab === "new"}
        onClick={() => onTabChange("new")}
      />
      <TabButton
        label="Final Stretch"
        count={counts["final-stretch"]}
        isActive={activeTab === "final-stretch"}
        onClick={() => onTabChange("final-stretch")}
      />
      <TabButton
        label="Migrated"
        count={counts.migrated}
        isActive={activeTab === "migrated"}
        onClick={() => onTabChange("migrated")}
      />
      <TabButton
        label="All"
        count={counts.all}
        isActive={activeTab === "all"}
        onClick={() => onTabChange("all")}
      />
    </div>
  );
});

export default Tabs;

