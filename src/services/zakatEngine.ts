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

export function calculateZakat(inputs: ZakatInputs, nisabType: 'gold' | 'silver' = 'gold'): ZakatResult {
  // Calculate asset values
  const cash = inputs.cash + inputs.bankBalance;
  const gold = inputs.goldGrams * inputs.goldPricePerGram;
  const silver = inputs.silverGrams * inputs.silverPricePerGram;
  const investments = inputs.stocks + inputs.crypto + inputs.funds;
  const businessAssets = inputs.inventory + inputs.receivables + inputs.businessCash;
  
  // Total zakatable assets
  const zakatable = cash + gold + silver + investments + businessAssets - inputs.liabilities;
  
  // Calculate nisab
  let nisab: number;
  if (nisabType === 'gold') {
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
      liabilities: inputs.liabilities,
    },
  };
}


