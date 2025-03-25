import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { 
  ArrowUpDown,        // Default icon
  ArrowDownAZ,        // For name-ascending
  ArrowUpZA,          // For name-descending
  ArrowUp01,          // For tokens-ascending
  ArrowDown10,        // For tokens-descending
  ArrowUpNarrowWide,  // For date-ascending
  ArrowDownWideNarrow // For date-descending
} from "lucide-react";

// Map sort options to corresponding Lucide icons
export const sortIconMap = {
  "name-ascending": "ArrowDownAZ",
  "name-descending": "ArrowUpZA",
  "tokens-ascending": "ArrowUp01",
  "tokens-descending": "ArrowDown10",
  "date-ascending": "ArrowUpNarrowWide",
  "date-descending": "ArrowDownWideNarrow"
} as const;

// Icon component lookup for direct reference
export const iconComponents: Record<string, LucideIcon> = {
  "ArrowDownAZ": ArrowDownAZ,
  "ArrowUpZA": ArrowUpZA,
  "ArrowUp01": ArrowUp01,
  "ArrowDown10": ArrowDown10,
  "ArrowUpNarrowWide": ArrowUpNarrowWide,
  "ArrowDownWideNarrow": ArrowDownWideNarrow,
  "ArrowUpDown": ArrowUpDown  // Default
};

// Helper function to get the appropriate icon component
export const getSortIcon = (sortOrder?: string, size: number = 16): JSX.Element => {
  try {
    const iconName = sortOrder && sortIconMap[sortOrder as keyof typeof sortIconMap] 
      ? sortIconMap[sortOrder as keyof typeof sortIconMap] 
      : "ArrowUpDown";
    
    const IconComponent = iconComponents[iconName];
    return <IconComponent size={size} />;
  } catch (error) {
    console.error("Error rendering sort icon:", error);
    return <ArrowUpDown size={size} />;
  }
}; 