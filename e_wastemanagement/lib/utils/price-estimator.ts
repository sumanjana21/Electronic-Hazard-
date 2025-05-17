// lib/utils/price-estimator.ts
export function estimateEWastePrice(deviceType: string, condition: string): number {
    const baseValues = {
      Smartphone: 120,
      Laptop: 250,
      Tablet: 150,
    };
    
    const conditionMultipliers = {
      "Like New": 1.0,
      "Good": 0.7,
      "Broken": 0.3,
    };
    
    const baseValue = baseValues[deviceType as keyof typeof baseValues] || 120;
    const multiplier = conditionMultipliers[condition as keyof typeof conditionMultipliers] || 0.7;
    const calculatedPrice = Math.floor(baseValue * multiplier);
    
    // Add some randomness (±10%)
    const variance = calculatedPrice * 0.1;
    const finalPrice = calculatedPrice + Math.floor(Math.random() * variance * 2 - variance);
    
    return finalPrice;
  }