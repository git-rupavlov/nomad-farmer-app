import type { Yields } from "../domain/types";

export interface TerrainArchetype {
  id: string;
  name: string;
  civInspiredBy: string;
  description: string;
  baseYields: Yields;
  modifiers: {
    sun: number;
    soil: number;
    waterRetention: number;
    pestPressure: number;
  };
  tags: string[];
}

export const terrainArchetypes: TerrainArchetype[] = [
  {
    id: "terrain-balcony",
    name: "Balcony Plot",
    civInspiredBy: "Coast / city-adjacent utility plot",
    description: "A constrained urban growing tile with good access but limited root volume.",
    baseYields: { water: 1, labor: 1, budget: 1 },
    modifiers: { sun: 6, soil: 3, waterRetention: 3, pestPressure: 2 },
    tags: ["urban", "container-friendly", "limited-space"]
  },
  {
    id: "terrain-container",
    name: "Container Plot",
    civInspiredBy: "Plains with improvement dependency",
    description: "A pot or planter tile. Strong when managed, punishing when forgotten like every houseplant ever.",
    baseYields: { water: 1, labor: 0, budget: 1 },
    modifiers: { sun: 6, soil: 4, waterRetention: 3, pestPressure: 2 },
    tags: ["pot", "mobile", "high-maintenance"]
  },
  {
    id: "terrain-greenhouse",
    name: "Greenhouse Tray",
    civInspiredBy: "Flood plains with protective feature",
    description: "Protected seedling or propagation space with stable conditions and higher management value.",
    baseYields: { water: 2, labor: 1, budget: 0 },
    modifiers: { sun: 5, soil: 6, waterRetention: 5, pestPressure: 1 },
    tags: ["protected", "seedlings", "season-extension"]
  },
  {
    id: "terrain-field",
    name: "Open Field",
    civInspiredBy: "Grassland / plains",
    description: "Outdoor growing ground with more space, more exposure, and more ways nature can file a complaint.",
    baseYields: { water: 1, labor: 2, budget: 0 },
    modifiers: { sun: 8, soil: 5, waterRetention: 4, pestPressure: 4 },
    tags: ["outdoor", "scalable", "weather-exposed"]
  },
  {
    id: "terrain-wild-patch",
    name: "Wild Patch",
    civInspiredBy: "Forest / jungle feature tile",
    description: "Semi-managed land useful for observation, resilience, weeds, volunteers, and botanical freeloaders.",
    baseYields: { water: 0, labor: 1, budget: 1 },
    modifiers: { sun: 7, soil: 4, waterRetention: 4, pestPressure: 6 },
    tags: ["wild", "biodiversity", "observation"]
  },
  {
    id: "terrain-raised-bed",
    name: "Raised Bed",
    civInspiredBy: "Improved grassland",
    description: "Structured bed with better soil control and efficient access.",
    baseYields: { water: 2, labor: 2, budget: 0 },
    modifiers: { sun: 7, soil: 7, waterRetention: 6, pestPressure: 3 },
    tags: ["managed", "productive", "soil-control"]
  }
];

export function getTerrainArchetype(id: string) {
  return terrainArchetypes.find((terrain) => terrain.id === id);
}
