import type { CityYields } from "../data/cityYields";

export type YieldKey = keyof CityYields;
export type Yields = CityYields;

export type TerrainKind = "balcony" | "container" | "greenhouse" | "field" | "wild_patch" | "raised_bed";
export type ImprovementKind = "trellis" | "mulch" | "drip_irrigation" | "compost_layer" | "shade_net" | "cold_frame";

export interface FarmTile {
  id: string;
  name: string;
  terrain: TerrainKind;
  terrainArchetypeId: string;
  improvement?: ImprovementKind;
  improvementArchetypeId?: string;
  workedByCitizen: boolean;
  yields: Yields;
  sun: number;
  soil: number;
  waterRetention: number;
  pestPressure: number;
}

export interface PlantInstance {
  id: string;
  speciesId: string;
  quantity: number;
  stage: "seed" | "seedling" | "vegetative" | "flowering" | "fruiting" | "harvest";
  health: number;
  daysOld: number;
  tileId: string;
  origin?: string;
  notes?: string;
}

export interface BuildingInventoryItem {
  id: string;
  buildingId: string;
  quantity: number;
  condition: number;
  status: "planned" | "active" | "maintenance" | "retired";
  tileId?: string;
  origin?: string;
  notes?: string;
}

export interface FarmTask {
  id: string;
  name: string;
  description: string;
  progress: number;
  requiredLabor: number;
  reward: string;
  completed: boolean;
}

export interface Farm {
  id: string;
  name: string;
  subtitle: string;
  mapX: number;
  mapY: number;
  health: number;
  happiness: number;
  maintenance: number;
  storedWater: number;
  fertilizer: number;
  budgetSpent: number;
  yields: Yields;
  tiles: FarmTile[];
  plants: PlantInstance[];
  buildings: BuildingInventoryItem[];
  productionQueue: FarmTask[];
}
