import { Authority } from "./authority";
import { resolveAuthorityRules } from "./authorityEngine";

export interface PurificationInput {
  profit: number;
  haramRatio: number; // Percentage (e.g., 3.2 for 3.2%)
}

export interface PurificationResult {
  profit: number;
  haramRatio: number;
  purification: number;
}

/**
 * Calculates purification for a single input item
 * 
 * @param input - Purification input with profit and haram ratio
 * @param authority - Selected Islamic authority whose rules to apply
 * @returns Purification calculation result
 */
export function calculatePurification(
  input: PurificationInput,
  authority: Authority = "AAOIFI"
): PurificationResult {
  const rules = resolveAuthorityRules(authority);
  
  let purification: number;
  if (rules.purificationScope === "all_haram") {
    // Calculate purification for all haram income
    purification = input.profit * (input.haramRatio / 100);
  } else {
    // interest_only: haramRatio represents interest portion only
    purification = input.profit * (input.haramRatio / 100);
  }
  
  return {
    profit: input.profit,
    haramRatio: input.haramRatio,
    purification,
  };
}

/**
 * Calculates purification from an array of items
 * 
 * Applies authority-specific rules to determine the scope of purification.
 * 
 * @param items - Array of items with profit and haram ratio
 * @param authority - Selected Islamic authority whose rules to apply
 * @returns Aggregated purification calculation result
 * 
 * @example
 * ```typescript
 * const result = calculatePurificationFromArray(items, "AAOIFI");
 * ```
 */
export function calculatePurificationFromArray(
  items: Array<{ profit: number; haramRatio: number }>,
  authority: Authority = "AAOIFI"
): PurificationResult {
  const rules = resolveAuthorityRules(authority);
  
  let totalProfit = 0;
  let totalPurification = 0;
  
  items.forEach(item => {
    totalProfit += item.profit;
    
    if (rules.purificationScope === "all_haram") {
      // Calculate purification for all haram income
      totalPurification += item.profit * (item.haramRatio / 100);
    } else {
      // interest_only: haramRatio represents interest portion only
      totalPurification += item.profit * (item.haramRatio / 100);
    }
  });
  
  const avgHaramRatio = totalProfit > 0 
    ? (totalPurification / totalProfit) * 100 
    : 0;
  
  return {
    profit: totalProfit,
    haramRatio: avgHaramRatio,
    purification: totalPurification,
  };
}


