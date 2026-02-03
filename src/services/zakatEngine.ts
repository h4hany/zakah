import { Authority } from "./authority";
import { resolveAuthorityRules } from "./authorityEngine";

export interface ZakatInputs {
  cash: number;
  bankBalance: number;
  goldGrams: number;
  goldPricePerGram: number;
  silverGrams: number;
  silverPricePerGram: number;
  stocks: number;
  crypto: number;
  funds: number;
  inventory: number;
  receivables: number;
  businessCash: number;
  liabilities: number;
}

export interface ZakatResult {
  zakatable: number;
  nisab: number;
  nisabMet: boolean;
  zakat: number;
  breakdown: {
    cash: number;
    gold: number;
    silver: number;
    investments: number;
    businessAssets: number;
    liabilities: number;
  };
}

const GOLD_NISAB_GRAMS = 87.48; // Standard gold nisab
const SILVER_NISAB_GRAMS = 612.36; // Standard silver nisab

/**
 * Calculates Zakat based on inputs and selected authority rules
 * 
 * Applies different calculation methods based on the authority's rulings:
 * - Nisab calculation (gold vs silver based)
 * - Stock method (market value vs dividend only)
 * - Debt deduction rules (all vs short-term only)
 * 
 * @param inputs - Financial inputs for Zakat calculation
 * @param authority - Selected Islamic authority whose rules to apply
 * @returns Zakat calculation result with breakdown
 * 
 * @example
 * ```typescript
 * const result = calculateZakat(inputs, "AAOIFI");
 * ```
 */
export function calculateZakat(inputs: ZakatInputs, authority: Authority = "AAOIFI"): ZakatResult {
  // Resolve authority-specific rules
  const rules = resolveAuthorityRules(authority);
  
  // Calculate asset values
  const cash = inputs.cash + inputs.bankBalance;
  const gold = inputs.goldGrams * inputs.goldPricePerGram;
  const silver = inputs.silverGrams * inputs.silverPricePerGram;
  
  // Apply stock method rule
  let investments: number;
  if (rules.stockMethod === "market_value") {
    // Include stocks, crypto, and funds in investments
    investments = inputs.stocks + inputs.crypto + inputs.funds;
  } else {
    // dividend_only: exclude stocks from calculation (future-proof for dividend input)
    investments = inputs.crypto + inputs.funds;
  }
  
  const businessAssets = inputs.inventory + inputs.receivables + inputs.businessCash;
  
  // Apply debt deduction rule
  let deductibleLiabilities: number;
  if (rules.debtRule === "all") {
    // Deduct all liabilities
    deductibleLiabilities = inputs.liabilities;
  } else {
    // short_term: deduct only short-term liabilities (using same field for now)
    deductibleLiabilities = inputs.liabilities;
  }
  
  // Total zakatable assets
  const zakatable = cash + gold + silver + investments + businessAssets - deductibleLiabilities;
  
  // Calculate nisab based on authority rule
  let nisab: number;
  if (rules.nisabType === "gold") {
    nisab = GOLD_NISAB_GRAMS * inputs.goldPricePerGram;
  } else {
    nisab = SILVER_NISAB_GRAMS * inputs.silverPricePerGram;
  }
  
  const nisabMet = zakatable >= nisab;
  const zakat = nisabMet ? zakatable * 0.025 : 0;
  
  return {
    zakatable,
    nisab,
    nisabMet,
    zakat,
    breakdown: {
      cash,
      gold,
      silver,
      investments,
      businessAssets,
      liabilities: deductibleLiabilities,
    },
  };
}


