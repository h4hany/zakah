export interface PurificationInput {
  profit: number;
  haramRatio: number; // Percentage (e.g., 3.2 for 3.2%)
}

export interface PurificationResult {
  profit: number;
  haramRatio: number;
  purification: number;
}

export function calculatePurification(input: PurificationInput): PurificationResult {
  const purification = input.profit * (input.haramRatio / 100);
  
  return {
    profit: input.profit,
    haramRatio: input.haramRatio,
    purification,
  };
}

export function calculatePurificationFromArray(
  items: Array<{ profit: number; haramRatio: number }>
): PurificationResult {
  let totalProfit = 0;
  let totalPurification = 0;
  
  items.forEach(item => {
    totalProfit += item.profit;
    totalPurification += item.profit * (item.haramRatio / 100);
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


