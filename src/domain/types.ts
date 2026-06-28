export type YieldKey = "water" | "labor" | "budget";

export interface Yields {
  water: number;
  labor: number;
  budget: number;
}

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

export interface FarmBuilding {
  id: string;
  name: string;
  type: "greenhouse" | "irrigation" | "storage" | "compost" | "support" | "sensor";
  effects: string[];
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
  buildings: FarmBuilding[];
  productionQueue: FarmTask[];
}
