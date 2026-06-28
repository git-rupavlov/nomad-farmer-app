import type { Farm, PlantInventoryItem } from "./types";

export interface PlantInventorySummary {
  totalPlants: number;
  activePlants: number;
  stressedPlants: number;
  lostPlants: number;
  speciesCount: number;
  floweringPlants: number;
  fruitingPlants: number;
}

export function summarizePlantInventory(items: PlantInventoryItem[]): PlantInventorySummary {
  return items.reduce<PlantInventorySummary>((summary, item) => {
    const activeQuantity = item.status === "active" || item.status === "stressed" ? item.quantity : 0;
    return {
      totalPlants: summary.totalPlants + item.quantity,
      activePlants: summary.activePlants + activeQuantity,
      stressedPlants: summary.stressedPlants + (item.status === "stressed" ? item.quantity : 0),
      lostPlants: summary.lostPlants + (item.status === "lost" ? item.quantity : 0),
      speciesCount: summary.speciesCount,
      floweringPlants: summary.floweringPlants + (item.observed.flowering ? item.quantity : 0),
      fruitingPlants: summary.fruitingPlants + (item.observed.fruiting ? item.quantity : 0)
    };
  }, {
    totalPlants: 0,
    activePlants: 0,
    stressedPlants: 0,
    lostPlants: 0,
    speciesCount: new Set(items.map((item) => item.speciesId)).size,
    floweringPlants: 0,
    fruitingPlants: 0
  });
}

export function plantWaterDemand(farm: Farm) {
  return Math.ceil(summarizePlantInventory(farm.plantInventory).activePlants * 0.35);
}

export function plantFertilizerDemand(farm: Farm) {
  return Math.ceil(summarizePlantInventory(farm.plantInventory).activePlants * 0.18);
}
