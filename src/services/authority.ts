/**
 * Authority type definitions for Zakat calculation compliance
 * 
 * Represents the different Islamic scholarly authorities whose
 * rulings can be applied to Zakat and purification calculations.
 */

export type Authority = "AAOIFI" | "PERMANENT" | "FIQH";

/**
 * Business rules configuration for a specific authority
 * 
 * Defines how calculations should be performed based on
 * the selected Islamic authority's rulings.
 */
export interface AuthorityRules {
  /** Nisab calculation method: gold-based or silver-based */
  nisabType: "gold" | "silver";
  
  /** Stock Zakat calculation method */
  stockMethod: "market_value" | "dividend_only";
  
  /** Debt deduction rule */
  debtRule: "all" | "short_term";
  
  /** Scope of purification calculation */
  purificationScope: "interest_only" | "all_haram";
}

/**
 * Converts Authority enum to human-readable display name
 * 
 * @param authority - The authority to convert
 * @returns Human-readable display name for the authority
 * 
 * @example
 * ```typescript
 * getAuthorityDisplayName("AAOIFI"); // "AAOIFI Standards"
 * ```
 */
export function getAuthorityDisplayName(authority: Authority): string {
  switch (authority) {
    case "AAOIFI":
      return "AAOIFI Standards";
    case "PERMANENT":
      return "Permanent Committee";
    case "FIQH":
      return "Fiqh Academy";
    default:
      return authority;
  }
}
